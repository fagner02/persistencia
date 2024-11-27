from http import HTTPStatus
from fastapi import FastAPI, Response
from pydantic import BaseModel
import pandas as pd
import os

app = FastAPI()
path = "dados.csv"


class Livro(BaseModel):
    id: int
    titulo: str
    autor: str
    ano: int
    genero: str
    editora: str


data = None
if not os.path.exists(path):
    data = pd.DataFrame(data={a: [] for a in Livro.model_fields})
    data.to_csv(path, index=False)
else:
    data = pd.read_csv(path)


@app.post("/livros")
def inserir(livro: Livro):
    print(livro)
    print([a[1] for a in livro])
    print(data)
    data.loc[len(data)] = [a[1] for a in livro]
    data.to_csv(path, index=False)
    return Response(status_code=HTTPStatus.NO_CONTENT)


@app.get("/livros")
def listar():
    return Response(
        content=data.to_json(orient="records"),
        media_type="json",
        status_code=HTTPStatus.OK,
    )


@app.put("/livros/{id}")
def update(id: int, livro: Livro):
    indexes = data["id"].loc[lambda x: x == id]
    if indexes.size == 0:
        return Response(status_code=HTTPStatus.NOT_FOUND)
    index = indexes.index[0]
    data.loc[index] = [a[1] for a in livro]
    data.to_csv(path, index=False)
    return Response(status_code=HTTPStatus.NO_CONTENT)


@app.delete("/livros/{id}")
def delete(id: int):
    indexes = data["id"].loc[lambda x: x == id]
    if indexes.size == 0:
        return Response(status_code=HTTPStatus.NOT_FOUND)
    data.drop(index=indexes, inplace=True)
    data.to_csv(path, index=False)
    return Response(status_code=HTTPStatus.NO_CONTENT)
