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
    QueryApi.getShipments(id as string, token as string)
  );
  const {
    data: statistics,
    isLoading: isStatisticsLoading,
    error: statisticsError,
  } = useQuery(QUERY_KEYS.GET_STATISTICS, () =>
    QueryApi.getStatistics(userId as string)
  );
  console.log("statitics", statistics);

  const SkeletonRow = () => (
    <tr>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
        <div className="animate-pulse bg-gray-200 h-4 w-3/4 rounded"></div>
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
        <div className="animate-pulse bg-gray-200 h-4 w-2/4 rounded"></div>
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
        <div className="animate-pulse bg-gray-200 h-4 w-1/2 rounded"></div>
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
        <div className="animate-pulse bg-gray-200 h-4 w-1/2 rounded"></div>
      </td>
      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
        <div className="animate-pulse bg-gray-200 h-4 w-2/2 rounded"></div>
      </td>
    </tr>
  );

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <ShipmentForm />
        <div className="flex flex-col mt-8">
          <div className="overflow-x-auto rounded-lg">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
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
                  </thead>
                  <tbody className="bg-white">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <SkeletonRow key={index} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    // Ensure this check correctly reflects your data structure
    return (
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <ShipmentForm />

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Latest Shipments
        </h3>
        <p className="text-base font-normal text-gray-500">
          There are no shipments to display.
        </p>
      </div>
    );
  }

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

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Latest Shipments
          </h3>
          <span className="text-base font-normal text-gray-500">
            This is a list of the All transactions
          </span>
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="overflow-x-auto rounded-lg">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden sm:rounded-lg">
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
                  {data &&
                    data.data &&
                    data.data.map((shipment: any, index: number) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        onClick={() =>
                          (window.location.href = `/dashboard/Employee/order/${shipment._id}`)
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
        </div>
      </div>
    </div>
  );
}
