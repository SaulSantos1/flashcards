from fastapi import FastAPI
from users.routers import router_users_v1

app = FastAPI(title="FlashCard")

app.include_router(router_users_v1)