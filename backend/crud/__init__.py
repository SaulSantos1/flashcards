# Arquivo vazio ou com imports para facilitar acesso
from .flashcard import create_flashcard, get_flashcards_by_folder
from .folder import create_folder, get_user_folders
from .user import authenticate_user, create_user, get_user

__all__ = [
    'get_user',
    'create_user',
    'authenticate_user',
    'create_folder',
    'get_user_folders',
    'create_flashcard',
    'get_flashcards_by_folder',
]
