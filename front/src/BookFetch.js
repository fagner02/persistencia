// @ts-nocheck
import { createElement } from "react";

const PersonFetch = {
  // @ts-ignore
  getAll: /**@return {Promise<import("./types").Livro[]>}*/ async () => {
    // @ts-ignore
    return await fetch(process.env.REACT_APP_API + "livros")
      .then(async (response) => {
        let temp = [];
        temp = await response.json();
        return temp;
      })
      .catch((error) => {
        return [];
      });
  },
  // @ts-ignore
  getById: /**@return {Promise<import("./types").Livro?>}*/ async (
    /**@type {number}*/ id
  ) => {
    // @ts-ignore
    var result = await fetch(process.env.REACT_APP_API + "livros/" + id)
      .then(async (response) => {
        let temp = {};
        temp = await response.json();
        return /**@type {import("./types").Livro}*/ (temp);
      })
      .catch((error) => {
        return null;
      });
    return result;
  },
  post: (/**@type {import("./types.js").Livro}*/ data) => {
    // @ts-ignore
    return fetch(process.env.REACT_APP_API + "livros", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  // @ts-ignore
  delete: async (/**@type {number[]}*/ ids) => {
    // @ts-ignore
    await fetch(process.env.REACT_APP_API + "livros", {
      method: "DELETE",
      body: JSON.stringify({ ids: ids }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // @ts-ignore
  deleteById: /**@param {number} id*/ async (id) => {
    // @ts-ignore
    await fetch(`${process.env.REACT_APP_API}livros/${id}`, {
      method: "DELETE",
    });
  },
  put:
    /**
     * @param {import("./types.js").Livro} data
     * @param {number} id
     */
    // @ts-ignore
    async (data, id) => {
      // @ts-ignore
      await fetch(`${process.env.REACT_APP_API}livros/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    getQtd: async () => {
      const qtd = await fetch(`${process.env.REACT_APP_API}livros/quantidade`, {
        method: "GET",
      });
      return ((await qtd.json()).quantidade);
    },
    compactar: async () => {
      const zip = await fetch(`${process.env.REACT_APP_API}livros/compactar`, {
        method: "GET",
      });
      const download = document.createElement("a");
      download.setAttribute("href", URL.createObjectURL(await zip.blob()));
      download.setAttribute("download", "dados.zip");
      return (download.click());
    },
    filtrarLivros: async (id, titulo, autor, genero, editora, ano) => {
      let query = id == "" ? "" : `id=${id}&`;
      query += titulo == "" ? "" : `titulo=${titulo}&`;
      query += autor == "" ? "" : `autor=${autor}&`;
      query += genero == "" ? "" : `genero=${genero}&`;
      query += editora == "" ? "" : `editora=${editora}&`;
      query += ano == "" ? "" : `ano=${ano}&`;
      const livros = await fetch(`${process.env.REACT_APP_API}livros/filtrar?${query}`, { 
        method: "GET",
      });
      return await livros.json();
    },
};
export default PersonFetch;