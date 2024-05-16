"use client";
import Navbar from "@/components/internal/navbar/navbar.component";
import SideBar from "@/components/internal/sideBar/sideBar.component";
import QueryApi from "@/shared/query-api";
import AuthenticationSvcContext from "@/shared/services/authentication/authentication.context";
import AuthService from "@/shared/services/authentication/authentication.service";
import QUERY_KEYS from "@/static/app.querykeys";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useMutation, useQuery } from "react-query";

export default function OrderPage({ params }: { params: any }) {
  const { orderid } = params;

  const authSvc = useContext<AuthService>(AuthenticationSvcContext);
  const token = authSvc.token;

  // Fetch shipment details
  const { data, isLoading, error, refetch } = useQuery(
    QUERY_KEYS.GET_SHIPMENT_BY_ID,
    () => QueryApi.getShipmentById(orderid as string, token as string),
    { enabled: !!orderid }
  );

  // Update shipment status
  const updateStatusMutation = useMutation(
    (newStatus: string) =>
      QueryApi.updateShipmentStatus(orderid, { newStatus }, token),
    {
      onSuccess: () => {
        refetch(); // Refresh data after update
        alert("Shipment status updated successfully!");
      },
      onError: (error: any) => {
        console.error("Error updating shipment status:", error);
        alert("Failed to update shipment status.");
      },
    }
  );

  const handleChangeStatus = (newStatus: string) => {
    updateStatusMutation.mutate(newStatus);
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
        <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
        <div id="main-content" className="flex-1 p-8">
          <main className="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">
            <h1 className="text-2xl font-bold text-gray-900 p-6 border-b border-gray-200">Order Details</h1>
            <div className="p-6 space-y-4 bg-gray-100 rounded-lg">
              <p><strong>Order ID:</strong> {orderid}</p>
              <p><strong>Destination:</strong> {shipment.destination}</p>
              <p><strong>Shipment Date:</strong> {new Date(shipment.shipmentDate).toLocaleDateString()}</p>
              <p><strong>Expected Delivery Date:</strong> {new Date(shipment.expectedDeliveryDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {shipment.status}</p>
              <p><strong>Origin:</strong> {shipment.origin}</p>
              <p><strong>Receiver ID:</strong> {shipment.receiver_id}</p>
              <p><strong>Warehouse ID:</strong> {shipment.warehouseID}</p>
              <div className="space-x-2 mt-4">
                {["Received"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleChangeStatus(s)}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${s === shipment.status ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={s === shipment.status}
                  >
                    Set {s}
                  </button>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
