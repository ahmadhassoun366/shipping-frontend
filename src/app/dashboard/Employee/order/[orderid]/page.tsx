"use client";
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
    <div className="bg-gray-700 text-white p-4">
      <h1 className="text-xl font-bold">Order Details</h1>
      <div className="border p-2 my-2">
        <p>Destination: {shipment.destination}</p>
        <p>
          Shipment Date:{" "}
          {new Date(shipment.shipmentDate).toLocaleDateString()}
        </p>
        <label htmlFor="expectedDeliveryDate">Expected Delivery Date:</label>
        <input
          type="date"
          id="expectedDeliveryDate"
          name="expectedDeliveryDate"
          value={expectedDeliveryDate}
          onChange={(e) => setExpectedDeliveryDate(e.target.value)}
          className="form-input block w-full mt-1"
        />
        <p>Status:</p>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-select block w-full mt-1"
        >
          <option value="Pending">Pending</option>
          <option value="Packaging">Packaging</option>
          <option value="Onway">Onway</option>
          <option value="Failed">Failed</option>
          <option value="Received">Received</option>
        </select>
        <button
          onClick={handleSaveChanges}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
