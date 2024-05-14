import Employee from "@/app/dashboard/Employee/employee.component";
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
    shipments: (userId: string) => `${_baseUrl}/getShipments?userId=${userId}`,
    createShipment: () => `${_baseUrl}/createShipment`,
    deleteShipment: (shipmentId: any) =>
      `${_baseUrl}/deleteShipment/${shipmentId}`,
    updateShipment: (shipmentId: string) =>
      `${_baseUrl}/updateShipment/${shipmentId}`,
    getShipmentById: (shipmentId: any) =>
      `${_baseUrl}/getShipment?id=${shipmentId}`,
  },
  Receiver: {
    createReceiver: () => `${_baseUrl}/createReceiver`,
    getReceiver: () => `${_baseUrl}/getReceiver`,
    getReceivers: () => `${_baseUrl}/getReceivers`,
  },
  Employee: {
    updateShipmentStatus: (shipmentId: any) =>
      `${_baseUrl}/updateStatus/${shipmentId}`,
    updateExpectedDeliveryDate: (shipmentId: any) =>
      `${_baseUrl}/updateExpectedDeliveryDate/${shipmentId}`,
  },
  getWarehouses: () => `${_baseUrl}/getWarehouses`,
};

export default api;
