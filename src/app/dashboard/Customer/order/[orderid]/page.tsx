'use client';
import QueryApi from "@/shared/query-api";
import AuthenticationSvcContext from "@/shared/services/authentication/authentication.context";
import AuthService from "@/shared/services/authentication/authentication.service";
import QUERY_KEYS from "@/static/app.querykeys";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useQuery } from "react-query";

export default function OrderPage() {

  
  const authSvc = useContext<AuthService>(AuthenticationSvcContext);
  const token = authSvc.token;
 

  return (
    <div className="bg-gray-700 text-white p-4">
      <h1 className="text-xl font-bold">Order Details</h1>
      {/* Display the orderId from the query */}
    
    </div>
  );
}
