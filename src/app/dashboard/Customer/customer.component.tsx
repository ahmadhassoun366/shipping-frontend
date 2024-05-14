import QueryApi from "@/shared/query-api";
import QUERY_KEYS from "@/static/app.querykeys";
import { useQuery } from "react-query";
import ShipmentForm from "./shipmentForm.component";
import { useContext } from "react";
import AuthService from "@/shared/services/authentication/authentication.service";
import AuthenticationSvcContext from "@/shared/services/authentication/authentication.context";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Customer() {
  const router = useRouter();
  const authSvc = useContext<AuthService>(AuthenticationSvcContext);
  const userId = authSvc.userId;

  const token = authSvc?.token;
  const id = authSvc?.userId;
  const type = authSvc?.userType;

  // Use useQuery to fetch shipments
  const { data, isLoading, error } = useQuery(QUERY_KEYS.GET_SHIPMENTS, () =>
    QueryApi.getShipments(userId as string, token as string)
  );
  const {
    data: statistics,
    isLoading: isStatisticsLoading,
    error: statisticsError,
  } = useQuery(QUERY_KEYS.GET_STATISTICS, () =>
    QueryApi.getStatistics(userId as string)
  );
  console.log("statitics", statistics);

  if (isLoading) {
    return (
      <div>
        <ShipmentForm />
        <div>Loading shipments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ShipmentForm />
        <div>An error occurred: {error.toString()}</div>
      </div>
    );
  }

  const shipments = data?.data || [];

  return (
    <div>
      <ShipmentForm />

      {/* Statistics Section */}
      <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Total Shipments */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                {statistics?.data.totalShipments}
              </span>
              <h3 className="text-base font-normal text-gray-500">
                Total Shipments
              </h3>
            </div>
          </div>
        </div>

        {/* Average Delivery Time */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                {statistics?.data.averageDeliveryTime.toFixed(2)}
              </span>
              <h3 className="text-base font-normal text-gray-500">
                Average Delivery Time (days)
              </h3>
            </div>
          </div>
        </div>

        {/* Shipments by Status */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          {Object.entries(statistics?.data.statusCounts || {}).map(
            ([status, count]) => (
              <div key={status} className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                    {count as string}
                  </span>
                  <h3 className="text-base font-normal text-gray-500">
                    {status}
                  </h3>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Latest Shipments
          </h3>
          <a
            href="#"
            className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
          >
            View all
          </a>
        </div>
        {shipments.length > 0 ? (
          <div className="flex flex-col mt-8">
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Origin
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Destination
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Date
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expected Delivery Date
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {shipments.map((shipment: any, index: any) => (
                    <tr
                      key={index}
                      onClick={() =>
                        router.push(`/dashboard/Customer/order/${shipment._id}`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        {shipment.origin}
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        {shipment.destination}
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        {new Date(shipment.shipmentDate).toLocaleDateString()}
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
        ) : (
          <div>No shipments found.</div>
        )}
      </div>
    </div>
  );
}
