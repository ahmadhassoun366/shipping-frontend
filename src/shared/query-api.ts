import axios, { type AxiosResponse } from "axios";

import api from "./api";
import { get } from "http";

const QueryApi = {
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
  getShipments: async function getShipments(userId: string, token: string) {
    const res = await axios({
      method: "get",
      url: api.Customer.shipments(userId),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  },

  createShipment: async function createShipment(shipment: any, token: string) {
    const res = await axios({
      method: "post",
      url: api.Customer.createShipment(),
      data: shipment,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  },
  getShipment: async function getShipment(shipmentId: string, token: string) {
    const res = await axios({
      method: "get",
      url: api.Customer.getShipment(),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  },

  // Receivers
  getReceivers: async function getReceivers() {
    const res = await axios({
      method: "get",
      url: api.Receiver.getReceivers(),
    });
    return res;
  },
  getWarehouses: async function getWarehouses() {
    const res = await axios({
      method: "get",
      url: api.getWarehouses(),
    });
    return res;
  },
};

export default QueryApi;
