from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.core.security import get_current_user
from backend.crud.flashcard import get_flashcards_by_folder
from backend.crud.folder import create_folder, get_folder, get_user_folders
from backend.crud.folder import delete_folder as crud_delete_folder
from backend.crud.folder import update_folder as crud_update_folder
from backend.db.session import get_db
from backend.schemas.flashcard import Flashcard
from backend.schemas.folder import Folder, FolderCreate, FolderUpdate
from backend.schemas.user import User

router = APIRouter(prefix='/folders', tags=['folders'])


@router.post('/', response_model=Folder)
def create_new_folder(
    folder: FolderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_folder(db=db, folder=folder, user_id=current_user.id)


@router.get('/', response_model=list[Folder])
def list_user_folders(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_user_folders(
        db, user_id=current_user.id, skip=skip, limit=limit
    )


@router.get('/{folder_id}/flashcards', response_model=list[Flashcard])
def list_flashcards_in_folder(
    folder_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Verifica permissão
    folder = get_folder(db, folder_id)
    if not folder or folder.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail='Folder not found')
    return get_flashcards_by_folder(
        db, folder_id=folder_id, skip=skip, limit=limit
    )


@router.get('/{folder_id}', response_model=Folder)
def get_folder_details(
    folder_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    folder = get_folder(db, folder_id=folder_id)
    if not folder or folder.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail='Folder not found')
    return folder


@router.put('/{folder_id}', response_model=Folder)
def update_folder(
    folder_id: int,
    folder_update: FolderUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # First check if folder exists and belongs to user
    folder = get_folder(db, folder_id=folder_id)
    if not folder or folder.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail='Folder not found')

    # Update the folder
    updated_folder = crud_update_folder(
        db=db, folder_id=folder_id, folder_update=folder_update
    )
    return updated_folder


@router.delete('/{folder_id}', response_model=Folder)
def delete_folder(
    folder_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # First check if folder exists and belongs to user
    folder = get_folder(db, folder_id=folder_id)
    if not folder or folder.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail='Folder not found')

    # Delete the folder
    deleted_folder = crud_delete_folder(db=db, folder_id=folder_id)
    return deleted_folder
