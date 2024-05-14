"use client";
import QueryApi from "@/shared/query-api";
import AuthenticationSvcContext from "@/shared/services/authentication/authentication.context";
import AuthService from "@/shared/services/authentication/authentication.service";
import QUERY_KEYS from "@/static/app.querykeys";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/static/router.data";
export default function OrderPage({ params }: { params: any }) {
  const { orderid } = params;

  const authSvc = useContext<AuthService>(AuthenticationSvcContext);
  const token = authSvc.token;
  const router = useRouter();
  console.log("orderId :", orderid);
  const { data, isLoading, error } = useQuery(
    QUERY_KEYS.GET_SHIPMENT_BY_ID,
    () => QueryApi.getShipmentById(orderid as string, token as string)
  );
  console.log("data ", data);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this shipment?")) {
      try {
        await QueryApi.deleteShipment(orderid as string, token as string);
        toast.success("Shipment deleted successfully!", {
          position: "top-right",
          theme: "dark",
        });
        
        // Step 3: Redirect to dashboard or another route
        router.push(ROUTES.dashboard);
      } catch (error) {
        console.error("Error deleting shipment:", error);
        // Handle error if deletion fails
        alert("Error deleting shipment");
      }
    }
  };

  console.log("data ", data);
  if (isLoading) {
    return <div>Loading shipments...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.toString()}</div>;
  }
  const shipment = data?.data || [];
  return (
    <div className="bg-gray-700 text-white p-4">
      <h1 className="text-xl font-bold">Order Details</h1>
      {/* Display the orderId from the query */}

      <div className="border p-2 my-2">
        <p>Destination: {shipment.destination}</p>
        <p>Shipment Date: {shipment.shipmentDate}</p>
        <p>Expected Delivery Date: {shipment.expectedDeliveryDate}</p>
        <p>Status: {shipment.status}</p>
        {/* Render other shipment details as needed */}
      </div>
      <div>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white rounded-md py-1.5 px-4 "
        >
          Delete
        </button>
      </div>
    </div>
  );
}
