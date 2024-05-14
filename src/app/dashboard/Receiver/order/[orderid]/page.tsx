"use client";
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
    <div className="bg-gray-700 text-white p-4">
      <h1 className="text-xl font-bold">Order Details</h1>
      <div className="border p-2 my-2">
        <p>Destination: {shipment.destination}</p>
        <p>
          Shipment Date: {new Date(shipment.shipmentDate).toLocaleDateString()}
        </p>
        <p>
          Expected Delivery Date:{" "}
          {new Date(shipment.expectedDeliveryDate).toLocaleDateString()}
        </p>
        <p>Status: {shipment.status}</p>
        <select
          value={shipment.status}
          onChange={(e) => handleChangeStatus(e.target.value)}
          className="form-select block w-full mt-1"
        >
          <option value="Pending">Pending</option>
          <option value="Packaging">Packaging</option>
          <option value="Onway">Onway</option>
          <option value="Failed">Failed</option>
          <option value="Received">Received</option>
        </select>
      </div>
    </div>
  );
}
