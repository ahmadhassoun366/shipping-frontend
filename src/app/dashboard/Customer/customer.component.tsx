import QueryApi from "@/shared/query-api";
import QUERY_KEYS from "@/static/app.querykeys";
import { useQuery } from "react-query";
import ShipmentForm from "./shipmentForm.component";
import { useContext } from "react";
import AuthService from "@/shared/services/authentication/authentication.service";
import AuthenticationSvcContext from "@/shared/services/authentication/authentication.context";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Customer() {
  const authSvc = useContext<AuthService>(AuthenticationSvcContext);
  const userId = authSvc.userId;

  const token = authSvc.token;

  const { data, isLoading, error } = useQuery(QUERY_KEYS.GET_SHIPMENTS, () =>
    QueryApi.getShipments(userId as string, token as string)
  );
  console.log("Data", data);
  
  if (isLoading) {
    return <div>Loading shipments...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.toString()}</div>;
  }

  return (
    <div>
      <h1>Customer</h1>
      <div className="flex flex-col">
        {data &&
          data.data &&
          data.data.map((shipment: any) => (
            <div key={shipment._id} className="border p-2 my-2">
              <p>Shipment ID: {shipment._id}</p>
              <p>Origin: {shipment.origin}</p>
              <p>Destination: {shipment.destination}</p>
              <p>Shipment Date: {shipment.shipmentDate}</p>
              <p>Expected Delivery Date: {shipment.expectedDeliveryDate}</p>
              <p>Status: {shipment.status}</p>
              <div>
                <h4>Items:</h4>
                {shipment.Items && shipment.Items.length > 0 ? (
                  shipment.Items.map((item: any) => (
                    <div key={item._id} className="border p-1 my-1">
                      <p>Item Name: {item.name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Is Sensitive: {item.isSensitive ? "Yes" : "No"}</p>
                    </div>
                  ))
                ) : (
                  <p>No items in this shipment.</p>
                )}
              </div>
            </div>
          ))}
      </div>
      <ShipmentForm />
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Latest Shipments
            </h3>
            <span className="text-base font-normal text-gray-500">
              This is a list of latest transactions
            </span>
          </div>
          <div className="flex-shrink-0">
            <a
              href="#"
              className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
            >
              View all
            </a>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="overflow-x-auto rounded-lg">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Shipment
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date & Time
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {data &&
                      data.data &&
                      data.data.map((shipment: any, index: number) => (
                        <tr
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                          key={index}
                          onClick={() =>
                            (window.location.href = `/dashboard/Customer/order/${shipment._id}`)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                            {shipment.origin}
                            Destination: {shipment.destination}
                          </td>
                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                            {new Date(
                              shipment.expectedDeliveryDate
                            ).toLocaleDateString()}
                          </td>
                          <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {shipment.status}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
