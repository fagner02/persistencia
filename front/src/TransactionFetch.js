const TransactionFetch = {
  getAll: async () => {
    return await fetch(process.env.REACT_APP_API + "Transaction")
      .then(async (response) => {
        let temp = [];
        temp = await response.json();
        if (temp.length === 0) {
          return [
            {
              id: "  -  ",
              type: " - ",
              value: " - ",
              personId: " - ",
              description: " - ",
            },
          ];
        }
        return temp;
      })
      .catch((error) => {
        return [
          {
            id: "  -  ",
            type: " - ",
            value: " - ",
            personId: " - ",
            description: " - ",
          },
        ];
      });
  },
  getDetail: async (id) => {
    return await fetch(process.env.REACT_APP_API + "Person/" + id + "/products")
      .then(async (response) => {
        let temp = [];
        temp = await response.json();
        return temp;
      })
      .catch((error) => {
        return [];
      });
  },
  getCount: async () => {
    return await fetch(process.env.REACT_APP_API + "Transaction/Count")
      .then(async (response) => {
        let temp = { count: 0 };
        temp = await response.json();
        return temp;
      })
      .catch((error) => {
        return { count: 0 };
      });
  },
  post: (data) => {
    return fetch(process.env.REACT_APP_API + "Transaction", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
export default TransactionFetch;
