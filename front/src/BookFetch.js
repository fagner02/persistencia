const PersonFetch = {
  getAll: /**@return {Promise<import("./types").Livro[]>}*/ async () => {
    return await fetch(process.env.REACT_APP_API + "livros")
      .then(async (response) => {
        let temp = [];
        temp = await response.json();
        return temp;
      })
      .catch(() => {
        return [];
      });
  },

  getById: /**@return {Promise<import("./types").Livro?>}*/ async (
    /**@type {number}*/ id
  ) => {
    var result = await fetch(process.env.REACT_APP_API + "livros/" + id)
      .then(async (response) => {
        let temp = {};
        temp = await response.json();
        return /**@type {import("./types").Livro}*/ (temp);
      })
      .catch(() => {
        return null;
      });
    return result;
  },
  post: (/**@type {import("./types.js").Livro}*/ data) => {
    return fetch(process.env.REACT_APP_API + "livros", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  delete: async (/**@type {number[]}*/ ids) => {
    await fetch(process.env.REACT_APP_API + "livros", {
      method: "DELETE",
      body: JSON.stringify({ ids: ids }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  deleteById: /**@param {number} id*/ async (id) => {
    await fetch(`${process.env.REACT_APP_API}livros/${id}`, {
      method: "DELETE",
    });
  },
  put:
    /**
     * @param {import("./types.js").Livro} data
     * @param {number} id
     */
    async (data, id) => {
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
    return parseFloat(await qtd.text());
  },
  compactar: async () => {
    const zip = await fetch(`${process.env.REACT_APP_API}livros/compactar`, {
      method: "GET",
    });
    const download = document.createElement("a");
    download.setAttribute("href", URL.createObjectURL(await zip.blob()));
    download.setAttribute("download", "dados.zip");
    return download.click();
  },
  filtrarLivros: async (
    /** @type {string} */ id,
    /** @type {string} */ titulo,
    /** @type {string} */ autor,
    /** @type {string} */ genero,
    /** @type {string} */ editora,
    /** @type {string} */ ano
  ) => {
    let query = id === "" ? "" : `id=${id}&`;
    query += titulo === "" ? "" : `titulo=${titulo}&`;
    query += autor === "" ? "" : `autor=${autor}&`;
    query += genero === "" ? "" : `genero=${genero}&`;
    query += editora === "" ? "" : `editora=${editora}&`;
    query += ano === "" ? "" : `ano=${ano}&`;
    const livros = await fetch(
      `${process.env.REACT_APP_API}livros/filtrar?${query}`,
      {
        method: "GET",
      }
    );
    return await livros.json();
  },
};
export default PersonFetch;
