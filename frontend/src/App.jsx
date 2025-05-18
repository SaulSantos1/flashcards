import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Flashcard from './components/Flashcard';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Flashcard />} />
        <Route path="/:folderId" element={<Flashcard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;