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

  createShipment: async function createShipment(
    shipmentDetails: any,
    token: string
  ) {
    const res = await axios({
      method: "post",
      url: api.Customer.createShipment(),
      data: shipmentDetails,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  },
  getShipmentById: async function getShipmentById(
    shipmentId: string,
    token: string
  ) {
    const res = await axios({
      method: "get",
      url: api.Customer.getShipmentById(shipmentId),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  },

  updateShipment: async function updateShipment(
    shipmentId: string,
    shipmentData: any,
    token: string
  ) {
    const res = await axios({ 
      method: "put",
      url: api.Customer.updateShipment(shipmentId),
      data: shipmentData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  },

  deleteShipment: async function deleteShipment(
    shipmentId: string,
    token: string
  ) {
    const res = await axios({
      method: "delete",
      url: api.Customer.deleteShipment(shipmentId),
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
  updateShipmentStatus: async function (
    shipmentId: any,
    shipmentData: any,
    token: any
  ) {
    return axios({
      method: "put",
      url: api.Employee.updateShipmentStatus(shipmentId),
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: shipmentData,
    });
  },
  updateExpectedDeliveryDate: async function (shipmentId: any, newDate: any) {
    return axios({
      method: "put",
      url: api.Employee.updateExpectedDeliveryDate(shipmentId), // Ensure apiBaseUrl is defined or correctly imported
      data: {
        newExpirationDate: newDate, // Key corrected as per your backend expectation
      },
    });
  },
  //http://localhost:5000/statistics?userId=66409485f47229dc25c1e892
  getStatistics: async function getStatistics(userId: string) {
    const res = await axios({
      method: "get",
      url: api.Customer.statistics(userId),
    });
    return res;
  },
  

};

export default QueryApi;
