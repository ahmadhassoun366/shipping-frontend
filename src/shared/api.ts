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
    statistics: (userId: string) => `${_baseUrl}/statistics?userId=${userId}`,
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
    // http://localhost:5000/shipments/employee-warehouse?employeeId=6644a58993d860f00ea53cc0
    getShipmentsEmployee: (employeeId: string) =>
      `${_baseUrl}/shipments/employee-warehouse?employeeId=${employeeId}`,
  },
  getWarehouses: () => `${_baseUrl}/getWarehouses`,
};

export default api;
