from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.core.security import get_current_user
from backend.crud.folder import create_folder, get_folder, get_user_folders
from backend.db.session import get_db
from backend.schemas.folder import Folder, FolderCreate
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
