from http import HTTPStatus
from typing import List
from fastapi import FastAPI
from fastapi.responses import Response, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import os
import zipfile
import hashlib
import logging

logging.basicConfig(
    filename="api_logs.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

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
    logging.info("Arquivo CSV criado com cabeçalhos iniciais.")
else:
    data = pd.read_csv(path)
    logging.info("Arquivo CSV carregado com sucesso.")



@app.get("/livros/hash")
def calcular_hash():
    if not os.path.exists(path): 
        logging.warning("Tentativa de calcular hash sem o arquivo CSV.")
        return Response(
            content='{"error": "Arquivo CSV não encontrado."}',
            media_type="application/json",
            status_code=HTTPStatus.NOT_FOUND,
        )

    sha256_hash = hashlib.sha256()
    with open(path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)

    logging.info("Hash SHA256 calculado com sucesso.")
    return {"hash_sha256": sha256_hash.hexdigest()}

@app.post("/livros")
def inserir(livro: Livro):
    print(livro)
    print([a[1] for a in livro])
    try:
        data.loc[len(data)] = [getattr(livro, field) for field in Livro.model_fields]
        data.to_csv(path, index=False)
        logging.info(f"Livro inserido com sucesso: {livro}")
        return Response(status_code=HTTPStatus.NO_CONTENT)
    except Exception as e:
        logging.error(f"Erro ao inserir livro: {e}")
        return Response(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, content=str(e))

@app.get("/livros")
def listar():
    return Response(
        content=data.to_json(orient="records"),
        media_type="json",
        status_code=HTTPStatus.OK,
    )
    logging.error(f"Erro ao listar livros: {e}")
    return Response(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, content=str(e))

@app.put("/livros/{id}")
def update(id: int, livro: Livro):
    try:
        indexes = data["id"].loc[lambda x: x == id]
        if indexes.size == 0:
            logging.warning(f"Livro com ID {id} não encontrado")
            return Response(status_code=HTTPStatus.NOT_FOUND)
        index = indexes.index[0]
        data.loc[index] = [a[1] for a in livro]
        data.to_csv(path, index=False)
        logging.info(f"Livro com ID {id} atualizado com sucesso.")
        return Response(status_code=HTTPStatus.NO_CONTENT)
    except Exception as e:
        logging.error(f"Erro ao atualizar livro com ID {id}: {e}")
        return Response(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, content=str(e))


@app.delete("/livros/{id}")
def delete(id: int):
    try:
        indexes = data["id"].loc[lambda x: x == id].index
        if indexes.size == 0:
            logging.warning(f"Livro com ID {id} não encontrado para exclusão.")
            return Response(status_code=HTTPStatus.NOT_FOUND)
        data.drop(index=indexes, inplace=True)
        data.to_csv(path, index=False)
        logging.info(f"Livro com ID {id} excluído com sucesso.")
        return Response(status_code=HTTPStatus.NO_CONTENT)
    except Exception as e:
        logging.error(f"Erro ao excluir livro com ID {id}: {e}")
        return Response(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, content=str(e))


@app.delete("/livros")
def deleteMultiple(request: DeleteMultipleRequest):
    try:
        indexes = data[data["id"].isin(request.ids)].index
        if len(indexes) == 0:
            logging.warning("Nenhum livro encontrado para exclusão múltipla.")
            return Response(status_code=HTTPStatus.NOT_FOUND)
        data.drop(index=indexes, inplace=True)
        data.to_csv(path, index=False)
        logging.info(f"Livros com IDs {request.ids} excluídos com sucesso.")
        return Response(status_code=HTTPStatus.NO_CONTENT)
    except Exception as e:
        logging.error(f"Erro ao excluir múltiplos livros: {e}")
        return Response(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, content=str(e))

@app.get("/livros/quantidade")
def quantidade():
    try:
        df = pd.read_csv(path)
        count = len(df)
        logging.info(f"Quantidade de livros consultada: {count}")
        return Response(content=f"{len(df)}")
    except Exception as e:
        logging.error(f"Erro ao consultar quantidade de livros: {e}")
        return Response(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, content=str(e))

@app.get("/livros/compactar")
def compactar():
    try:
        zip_file = "dados.zip"
        with zipfile.ZipFile(zip_file, "w") as zip:
            zip.write(path, arcname=os.path.basename(path))
            logging.info("Arquivo CSV compactado com sucesso.")
            return FileResponse(
                zip_file, media_type="application/zip", filename=zip_file
            )
    except Exception as e:
        logging.error(f"Erro ao compactar arquivo CSV: {e}")
        return Response(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, content=str(e))


@app.get("/livros/filtrar")
def filtrar(
    id: str = None,
    titulo: str = None,
    editora: str = None,
    genero: str = None,
    #ano: str = None,
    autor: str = None,
    min_ano: str = None,
    max_ano: str = None,
):
    try:
            print(min_ano, max_ano)
            reader = pd.read_csv(path)
            filter = reader[
                (id == None or reader["id"] == int(id)) 
                & (min_ano == None or reader["ano"] >= int(min_ano))
                & (max_ano == None or reader["ano"] <= int(max_ano))
                & (
                    titulo == None
                    or reader["titulo"].str.lower().str.contains(titulo.lower())
                )
                & (
                    autor == None
                    or reader["autor"].str.lower().str.contains(autor.lower())
                )
                & (
                    genero == None
                    or reader["genero"].str.lower().str.contains(genero.lower())
                )
                & (
                    editora == None
                    or reader["editora"].str.lower().str.contains(editora.lower())
                )
            ]
            logging.info("Filtragem realizada com sucesso.")
            return Response(
                content=filter.to_json(orient="records"),
                media_type="application/json",
                status_code=HTTPStatus.OK,
            )
       
    except Exception as e:
        print(f"Erro: {e}")
        logging.error(f"Erro ao filtrar livros: {e}")
        return Response(status_code=HTTPStatus.INTERNAL_SERVER_ERROR, content=str(e))
