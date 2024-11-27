from http import HTTPStatus
from fastapi import FastAPI, Response
from pydantic import BaseModel
import pandas as pd
import os

app = FastAPI()
path = "dados.csv"
data = pd.DataFrame(
    data={
        "id": [],
        "titulo": [],
        "autor": [],
        "ano": [],
        "genero": [],
        "editora": [],
    }
)
if not os.path.exists(path):
    data.to_csv(path)
data = pd.read_csv(path)


class Livro(BaseModel):
    id: int
    titulo: str
    autor: str
    ano: int
    genero: str
    editora: str
