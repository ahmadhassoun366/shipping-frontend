import QueryApi from "@/shared/query-api";
import QUERY_KEYS from "@/static/app.querykeys";
import { useQuery } from "react-query";
import { useContext } from "react";
import AuthService from "@/shared/services/authentication/authentication.service";
import AuthenticationSvcContext from "@/shared/services/authentication/authentication.context";
import Link from "next/link";
import { useRouter } from "next/router";
import ShipmentForm from "../Customer/shipmentForm.component";

export default function Employee() {
  const authSvc = useContext<AuthService>(AuthenticationSvcContext);
  const userId = authSvc.userId;
  console.log("authSvc", authSvc.userId);
  const id = authSvc.userId;
  const type = authSvc.userType;
  const token = authSvc.token;
  console.log("Token", token);

  const { data, isLoading, error } = useQuery(QUERY_KEYS.GET_SHIPMENTS, () =>
    QueryApi.getShipments(userId as string, token as string)
  );
  console.log("Data", data);

  // if (isLoading) {
  //   return <div>Loading shipments...</div>;
  // }

  // if (error) {
  //   return <div>An error occurred: {error.toString()}</div>;
  // }


  return (
    <div>
      <h1>{type}</h1>
      <h2>{id}</h2>

      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Latest Shipments
            </h3>
            <span className="text-base font-normal   text-gray-500">
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
                            (window.location.href = `/dashboard/Employee/order/${shipment._id}`)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                            {shipment.origin}
                            Destination: {shipment.destination}
                          </td>
                          <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                            {shipment.expectedDeliveryDate
                              ? new Date(
                                  shipment.expectedDeliveryDate
                                ).toLocaleDateString()
                              : "Not Set"}
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
