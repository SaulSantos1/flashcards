from typing import List

from pydantic import BaseModel

from .flashcard import Flashcard


class FolderBase(BaseModel):
    name: str


class FolderCreate(FolderBase):
    pass


class FolderUpdate(FolderBase):
    pass


class Folder(FolderBase):
    id: int
    owner_id: int
    flashcards: List[Flashcard] = []

    class Config:
        from_attributes = True
