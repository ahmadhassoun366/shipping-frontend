import Receiver from "@/app/dashboard/Receiver/receiver.component";

const _baseUrl = "http://localhost:5000";
const api = {
  baseUrl: _baseUrl,

  user: {
    balance: (address: string) =>
      `${_baseUrl}/balanceOf/?userAddress=${address}`,
    //http://localhost:5000/signup
    //  Body {
    // "name": "ahmad",
    // "email": "ahmad@gmail.com",
    // "password": "test",
    // "type": "Importer"}
    signup: () => `${_baseUrl}/signup`,
    signin: () => `${_baseUrl}/signin`,
    // 
  },

  Customer: {
    shipments: (userId:string) => `${_baseUrl}/getShipments?userId=${userId}`,
    createShipment: () => `${_baseUrl}/createShipment`,
    getShipment: () => `${_baseUrl}/getShipment`,
  },
  Receiver:{
    createReceiver: () => `${_baseUrl}/createReceiver`,
    getReceiver: () => `${_baseUrl}/getReceiver`,
    getReceivers: () => `${_baseUrl}/getReceivers`,
  }
};

export default api;
