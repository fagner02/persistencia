from http import HTTPStatus
from fastapi import FastAPI, Response
from pydantic import BaseModel

app = FastAPI()


class Livro(BaseModel):
    id: int
    titulo: str
    autor: str
    ano: int
    genero: str
    editora: str
