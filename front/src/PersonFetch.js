const PersonFetch = {
  getAll: /**@return {Promise<import("./types").Livro[]>}*/ async () => {
    return await fetch(process.env.REACT_APP_API + "livros")
      .then(async (response) => {
        let temp = [];
        temp = await response.json();
        console.log(temp);
        return temp;
      })
      .catch((error) => {
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
      .catch((error) => {
        return null;
      });
    return result;
  },
  post: (/**@type {import("./types.js").Livro}*/ data) => {
    console.log(data);
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
};
export default PersonFetch;
