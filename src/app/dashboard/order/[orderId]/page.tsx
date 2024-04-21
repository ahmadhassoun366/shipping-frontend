import { useRouter } from "next/navigation";

type OrderPageProps = {
  params: {
    orderId: string;
  };
};

export default function OrderPage({ params }: OrderPageProps) {
  const { orderId } = params;

  return (
    <div className="bg-gray-700 text-white p-4">
      <h1 className="text-xl font-bold">Order Details</h1>
      {/* Display the orderId from the query */}
      <p>Order ID: {orderId}</p>
    </div>
  );
}
