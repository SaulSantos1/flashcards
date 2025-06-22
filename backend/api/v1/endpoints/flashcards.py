from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.core.security import get_current_user
from backend.crud.flashcard import create_flashcard, get_flashcard
from backend.crud.flashcard import delete_flashcard as crud_delete_flashcard
from backend.crud.flashcard import update_flashcard as crud_update_flashcard
from backend.crud.folder import get_folder
from backend.db.session import get_db
from backend.schemas.flashcard import (
    Flashcard,
    FlashcardCreate,
    FlashcardUpdate,
)
from backend.schemas.user import User

router = APIRouter(prefix='/flashcards', tags=['flashcards'])


@router.post('/', response_model=Flashcard)
def create_new_flashcard(
    flashcard: FlashcardCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Verifica se a pasta pertence ao usuário
    folder = get_folder(db, flashcard.folder_id)
    if not folder or folder.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail='Folder not found')
    return create_flashcard(db=db, flashcard=flashcard)


@router.put('/{flashcard_id}', response_model=Flashcard)
def update_flashcard(
    flashcard_id: int,
    flashcard_update: FlashcardUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # First get the flashcard
    flashcard = get_flashcard(db, flashcard_id)
    if not flashcard:
        raise HTTPException(status_code=404, detail='Flashcard not found')

    # Check if the folder belongs to the user
    folder = get_folder(db, flashcard.folder_id)
    if not folder or folder.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail='Not authorized')

    # Update the flashcard
    updated_flashcard = crud_update_flashcard(
        db, flashcard_id, flashcard_update
    )
    return updated_flashcard


@router.delete('/{flashcard_id}')
def delete_flashcard(
    flashcard_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    flashcard = get_flashcard(db, flashcard_id)
    if not flashcard:
        raise HTTPException(status_code=404, detail='Flashcard not found')

    folder = get_folder(db, flashcard.folder_id)
    if not folder or folder.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail='Not authorized')

    crud_delete_flashcard(db, flashcard_id)
    return {'message': 'Flashcard deleted successfully'}
