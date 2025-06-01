from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = 'FlashCards'
    PROJECT_DESCRIPTION: str = 'Projeto para auxilia-lo nos estudos'
    VERSION: str = '1.0.0'
    API_V1_STR: str = '/api/v1'
    SECRET_KEY: str
    ALGORITHM: str = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    class Config:
        env_file = '.env'


settings = Settings()
