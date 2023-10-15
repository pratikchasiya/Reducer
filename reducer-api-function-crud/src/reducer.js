import axios from "axios";

let authToken = {
  headers: {
    Authorization:
      "Bearer c770f151d75f0717539d114e2b2c3f3d73b77ab3f816e56a35ae4853cbd0300d",
  },
};

export const tokenReducer = async (state, action) => {
  const getApi = async () => {
    return await axios
      .get("https://gorest.co.in/public/v2/users", authToken)
      .then((res) => {
        return [...res.data];
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(state, action);

  switch (action.type) {
    case "GET": {
      return await getApi();
    }

    case "ADD": {
      return axios
        .post("https://gorest.co.in/public/v2/users", action.obj, authToken)
        .then((res) => {
          console.log(res);
          return getApi();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    case "EDIT": {
      return axios
        .patch(
          "https://gorest.co.in/public/v2/users/" + action.obj.id,
          action.obj,
          authToken
        )
        .then((res) => {
          console.log(res);
          return getApi();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    case "DELETE": {
      return axios
        .delete("https://gorest.co.in/public/v2/users/" + action.id, authToken)
        .then((res) => {
          console.log(res);
         return getApi();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    default: {
      return state;
    }
  }
  return action;
};
