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
import Navbar from "@/components/internal/navbar/navbar.component";
import SideBar from "@/components/internal/sideBar/sideBar.component";
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
    <div>
      <Navbar />
      <div className="flex overflow-hidden bg-white pt-16">
        <SideBar />
        <div
          className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
          id="sidebarBackdrop"
        ></div>
        <div id="main-content" className="flex-1 p-8">
          <main className="max-w-3xl mx-auto bg-white rounded-lg shadow overflow-hidden">
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
                <strong>Expected Delivery Date:</strong>{" "}
                {new Date(shipment.expectedDeliveryDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {shipment.status}
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
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
              >
                Delete Shipment
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
