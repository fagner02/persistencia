import csv
from http import HTTPStatus
from typing import List
from fastapi import FastAPI, Response
from starlette.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import os
import zipfile

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

path = "dados.csv"


class DeleteMultipleRequest(BaseModel):
    ids: List[int]


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
    indexes = data["id"].loc[lambda x: x == id].index
    if indexes.size == 0:
        return Response(status_code=HTTPStatus.NOT_FOUND)
    data.drop(index=indexes, inplace=True)
    data.to_csv(path, index=False)
    return Response(status_code=HTTPStatus.NO_CONTENT)


@app.delete("/livros")
def deleteMultiple(request: DeleteMultipleRequest):
    indexes = []
    i = 0
    for a in data["id"]:
        print(a)
        if a in request.ids:
            indexes.append(i)
        i += 1
    if len(indexes) == 0:
        return Response(status_code=HTTPStatus.NOT_FOUND)
    data.drop(index=indexes, inplace=True)
    data.to_csv(path, index=False)
    return Response(status_code=HTTPStatus.NO_CONTENT)

@app.get("/livros/quantidade")
def quantidade():
    try:
        df = pd.read_csv(path)  
        return {"quantidade": len(df)}
    except Exception as e:
        return Response(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, content=str(e))

@app.get("/livros/compactar")
def compactar():
    try:
        zip_file = 'dados.zip'
        with zipfile.ZipFile(zip_file, 'w') as zip:
            zip.write(path, arcname=os.path.basename(path))
            return FileResponse(zip_file, media_type='application/zip', filename=zip_file)
    except Exception as e:
        return Response(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, content=str(e))

@app.get("/livros/filtrar")
def filtrar(id: str = None, titulo: str = None, ano: str = None, editora: str = None, genero: str = None, autor: str = None):
    try: 
        with open(path, mode='r', newline='', encoding='utf-8') as file:
            reader = pd.read_csv(file)
            teste = reader [reader['id'] == int(id) & reader['titulo'] == titulo &
                    reader['autor'] == autor & reader['ano'] == int(ano) & 
                    reader['genero'] == genero & reader['editora'] == editora]
            print(teste)
            return Response(
                content=teste.to_json(orient="records"),
                media_type="json",
                status_code=HTTPStatus.OK,
             )

    except Exception as e:
        return Response(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, content=str(e))