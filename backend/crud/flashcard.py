from typing import Optional

from sqlalchemy.orm import Session

from ..models.flashcard import Flashcard
from ..schemas.flashcard import FlashcardCreate, FlashcardUpdate


def create_flashcard(db: Session, flashcard: FlashcardCreate):
    db_flashcard = Flashcard(**flashcard.model_dump())
    db.add(db_flashcard)
    db.commit()
    db.refresh(db_flashcard)
    return db_flashcard


def get_flashcards_by_folder(
    db: Session, folder_id: int, skip: int = 0, limit: int = 10
):
    return (
        db.query(Flashcard)
        .filter(Flashcard.folder_id == folder_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_flashcard(db: Session, flashcard_id: int):
    return db.query(Flashcard).filter(Flashcard.id == flashcard_id).first()


def delete_flashcard(db: Session, flashcard_id: int):
    db.query(Flashcard).filter(Flashcard.id == flashcard_id).delete()
    db.commit()


def update_flashcard(
    db: Session, flashcard_id: int, flashcard_update: FlashcardUpdate
) -> Optional[Flashcard]:
    db_flashcard = get_flashcard(db, flashcard_id)
    if not db_flashcard:
        return None

    update_data = flashcard_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(db_flashcard, field, value)

    db.commit()
    db.refresh(db_flashcard)
    return db_flashcard
