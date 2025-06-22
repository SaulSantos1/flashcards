from pydantic import BaseModel


class FlashcardBase(BaseModel):
    question: str
    answer: str


class FlashcardCreate(FlashcardBase):
    folder_id: int


class FlashcardUpdate(FlashcardBase):
    folder_id: int


class Flashcard(FlashcardBase):
    id: int
    folder_id: int

    class Config:
        from_attributes = True
