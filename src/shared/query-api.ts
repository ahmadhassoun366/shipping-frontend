import axios, { type AxiosResponse } from "axios";

import api from "./api";

const QueryApi = {
  balance: async function fetchBalance(address: string) {
    const res = await axios({
      method: "get",
      url: api.user.balance(address),
    });

    return {
      balance: res.data.balance,
      balanceUsdValue: res.data.balanceUsdValue,
    };
  },
  signup: async function signupUser(
    name: string,
    email: string,
    password: string,
    type: string
  ) {
    const res = await axios({
      method: "post",
      url: api.user.signup(),
      data: {
        name,
        email,
        password,
        type,
      },
    });

    return res;
  },
  signin: async function signinUser(email: string, password: string) {
    const res = await axios({
      method: "post",
      url: api.user.signin(),
      data: {
        email,
        password,
      },
    });

    return res;
  },
};

export default QueryApi;
