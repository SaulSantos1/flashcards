from sqlalchemy.orm import Session

from ..models.flashcard import Flashcard
from ..schemas.flashcard import FlashcardCreate


def create_flashcard(db: Session, flashcard: FlashcardCreate):
    db_flashcard = Flashcard(**flashcard.model_dump())
    db.add(db_flashcard)
    db.commit()
    db.refresh(db_flashcard)
    return db_flashcard
