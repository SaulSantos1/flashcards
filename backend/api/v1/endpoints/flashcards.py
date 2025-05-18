from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.core.security import get_current_user
from backend.crud import flashcard as crud_flashcard
from backend.crud import folder as crud_folder
from backend.db.session import get_db
from backend.schemas.flashcard import Flashcard, FlashcardCreate
from backend.schemas.user import User

router = APIRouter(prefix='/flashcards', tags=['flashcards'])


@router.post('/', response_model=Flashcard)
def create_new_flashcard(
    flashcard: FlashcardCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Verifica se a pasta pertence ao usuário
    folder = crud_folder.get_folder(db, flashcard.folder_id)
    if not folder or folder.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail='Folder not found')
    return crud_flashcard.create_flashcard(db=db, flashcard=flashcard)


@router.get('/folder/{folder_id}', response_model=list[Flashcard])
def list_flashcards_in_folder(
    folder_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Verifica permissão
    folder = crud_folder.get_folder(db, folder_id)
    if not folder or folder.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail='Folder not found')
    return crud_flashcard.get_flashcards_by_folder(
        db, folder_id=folder_id, skip=skip, limit=limit
    )


@router.delete('/{flashcard_id}')
def delete_flashcard(
    flashcard_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    flashcard = crud_flashcard.get_flashcard(db, flashcard_id)
    if not flashcard:
        raise HTTPException(status_code=404, detail='Flashcard not found')

    folder = crud_folder.get_folder(db, flashcard.folder_id)
    if not folder or folder.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail='Not authorized')

    crud_flashcard.delete_flashcard(db, flashcard_id)
    return {'message': 'Flashcard deleted successfully'}
