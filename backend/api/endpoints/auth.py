from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import (
    OAuth2PasswordRequestForm,
)
from sqlalchemy.orm import Session

from backend.core.security import create_access_token
from backend.crud.user import authenticate_user, create_user
from backend.db.session import get_db
from backend.schemas.user import Token, UserCreate

router = APIRouter(tags=["auth"])


@router.post("/signup", response_model=UserCreate)
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = authenticate_user(db, email=user.email, password=user.password)
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email alread registered")
    return create_user(db=db, user=user)


@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect credentials",
                headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
