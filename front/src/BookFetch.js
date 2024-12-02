// @ts-nocheck
import JSZip from "jszip"

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
};
export default PersonFetch;