"use client";
import Navbar from "@/components/internal/navbar/navbar.component";
import SideBar from "@/components/internal/sideBar/sideBar.component";
import QueryApi from "@/shared/query-api";
import AuthenticationSvcContext from "@/shared/services/authentication/authentication.context";
import AuthService from "@/shared/services/authentication/authentication.service";
import QUERY_KEYS from "@/static/app.querykeys";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";

export default function OrderPage({ params }: { params: any }) {
  const { orderid } = params;

  const authSvc = useContext<AuthService>(AuthenticationSvcContext);
  const token = authSvc.token;
  const [status, setStatus] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");

  // Fetch shipment details
  const { data, isLoading, error, refetch } = useQuery(
    QUERY_KEYS.GET_SHIPMENT_BY_ID,
    () => QueryApi.getShipmentById(orderid, token as string),
    { enabled: !!orderid }
  );

  const formatedDate = (date: any) => {
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (data?.data) {
      setStatus(data.data.status);
      setExpectedDeliveryDate(
        data.data.expectedDeliveryDate
          ? new Date(data.data.expectedDeliveryDate)
              .toISOString()
              .substring(0, 10)
          : ""
      );
    }
  }, [data]);

  const updateDetailsMutation = useMutation(
    () => {
      return Promise.all([
        QueryApi.updateShipmentStatus(orderid, { newStatus: status }, token),
        QueryApi.updateExpectedDeliveryDate(orderid, expectedDeliveryDate),
      ]);
    },
    {
      onSuccess: () => {
        refetch();
        alert("Shipment details updated successfully!");
      },
      onError: (error) => {
        console.error("Error updating shipment details:", error);
        alert("Failed to update shipment details.");
      },
    }
  );

  const isValidDate = (date: any) => {
    return date instanceof Date && !isNaN(date.getTime());
  };

  const handleSaveChanges = () => {
    console.log("Expected Delivery Date", expectedDeliveryDate);

    if (!isValidDate(new Date(expectedDeliveryDate))) {
      alert("Please enter a valid date.");
      return;
    }
    updateDetailsMutation.mutate();
  };

  if (isLoading) {
    return <div>Loading shipment details...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.toString()}</div>;
  }
  const shipment = data?.data || [];

  return (
    <div>
      <Navbar />
      <div className="flex overflow-hidden bg-white pt-16">
        <SideBar />
        <div
          className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
          id="sidebarBackdrop"
        ></div>
        <div id="main-content" className="flex-1 p-8">
          <main className="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">
                Order Details
              </h1>
            </div>
            <div className="p-6 space-y-4">
              <p>
                <strong>Order ID:</strong> {orderid}
              </p>
              <p>
                <strong>Destination:</strong> {shipment.destination}
              </p>
              <p>
                <strong>Shipment Date:</strong>{" "}
                {new Date(shipment.shipmentDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Expected Delivery Date:</strong>
                <input
                  type="date"
                  value={expectedDeliveryDate}
                  onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                  className="form-input block w-full mt-1"
                />
              </p>
              <p>
                <strong>Status:</strong>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-select block w-full mt-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Onway">Onway</option>
                  <option value="Failed">Failed</option>
                </select>
              </p>
              <p>
                <strong>Origin:</strong> {shipment.origin}
              </p>
              <p>
                <strong>Receiver ID:</strong> {shipment.receiver_id}
              </p>
              <p>
                <strong>Warehouse ID:</strong> {shipment.warehouseID}
              </p>
              {shipment.Items?.map((item: any, index: any) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                  <p>
                    <strong>Item Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Type:</strong> {item.type}
                  </p>
                  <p>
                    <strong>Is Sensitive:</strong>{" "}
                    {item.isSensitive ? "Yes" : "No"}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-gray-200 text-right">
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
