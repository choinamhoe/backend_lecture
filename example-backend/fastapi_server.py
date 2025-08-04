from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import Dict

app = FastAPI()

@app.get("/")
def home():
    return "Hello, FastAPI!"

@app.get("/api/data")
def get_data():
    return {"message": "Hello, FastAPI!", "status": "success"}

@app.get("/hello/{name}")
def hello(name: str):
    return {"message": f"Hello, {name}!"}

class PostData(BaseModel):
    data: Dict

@app.post("/api/post")
async def handle_post(request: Request):
    data = await request.json()
    return {"received": data}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
