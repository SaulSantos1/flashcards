import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Flashcard = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { folderId } = useParams();
  const navigate = useNavigate();

      // Configurar o Axios para incluir o token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // Redirecionar para login se não houver token
      navigate('/login');
    }
  }, [navigate]);

  // Buscar todas as pastas do usuário
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/folders/');
        setFolders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load folders');
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  // Buscar flashcards quando uma pasta é selecionada
  useEffect(() => {
    if (folderId) {
      const fetchFlashcards = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/flashcards/folder/${folderId}`);
          setFlashcards(response.data);
          const selected = folders.find(f => f.id === parseInt(folderId));
          setSelectedFolder(selected);
        } catch (err) {
          setError('Failed to load flashcards');
        }
      };

      fetchFlashcards();
    }
  }, [folderId, folders]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Flashcard System</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Seção de Pastas - Sidebar */}
        <div className="w-full md:w-1/3">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">FOLDERS</h2>
          <ul className="space-y-2">
            {folders.map(folder => (
              <li key={folder.id}>
                <Link
                  to={`/${folder.id}`}
                  className={`block p-3 hover:bg-gray-100 rounded ${
                    selectedFolder?.id === folder.id ? 'font-semibold bg-gray-100' : ''
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{folder.name}</span>
                    <span className="text-sm text-gray-500">({folder.card_count})</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Seção de Conteúdo */}
        <div className="w-full md:w-2/3">
          {selectedFolder ? (
            <div>
              <h2 className="text-xl font-bold mb-4 border-b pb-2">{selectedFolder.name}</h2>
              <p className="text-gray-600 mb-6">{selectedFolder.card_count} cards</p>
              
              {flashcards.length > 0 ? (
                <div className="space-y-4">
                  {flashcards.map(card => (
                    <div key={card.id} className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-lg font-medium mb-4">{card.question}</h3>
                      <div className="bg-gray-50 p-4 rounded cursor-pointer text-center text-gray-500">
                        Click to flip
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No flashcards in this folder yet.</p>
              )}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-500">Select a folder to view flashcards</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;