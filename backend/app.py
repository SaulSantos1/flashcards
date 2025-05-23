from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.v1.endpoints import auth, flashcards, folders
from backend.core.config import settings
from backend.db.session import init_db

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.VERSION,
    openapi_url=f'{settings.API_V1_STR}/openapi.json',
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],  # Permite apenas este origin
    allow_credentials=True,
    allow_methods=['*'],  # Permite todos os métodos (GET, POST, etc)
    allow_headers=['*'],  # Permite todos os headers
)

# Registra todos os routers
app.include_router(auth.router)
app.include_router(folders.router)
app.include_router(flashcards.router)

init_db()
