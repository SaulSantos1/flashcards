from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from backend.db.session import Base


class Flashcard(Base):
    __tablename__ = 'flashcards'

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String, index=True)
    answer = Column(Text)
    folder_id = Column(Integer, ForeignKey('folders.id'))

    folder = relationship('Folder', back_populates='flashcards')
