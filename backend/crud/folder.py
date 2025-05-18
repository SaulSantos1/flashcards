from sqlalchemy.orm import Session

from ..models.folder import Folder
from ..schemas.folder import FolderCreate


def create_folder(db: Session, folder: FolderCreate, user_id: int):
    db_folder = Folder(**folder.model_dump(), owner_id=user_id)
    db.add(db_folder)
    db.commit()
    db.refresh(db_folder)
    return db_folder


def get_user_folders(
    db: Session, user_id: int, skip: int = 0, limit: int = 10
):
    return (
        db.query(Folder)
        .filter(Folder.owner_id == user_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_folder(db: Session, folder_id: int):
    return db.query(Folder).filter(Folder.id == folder_id).first()
