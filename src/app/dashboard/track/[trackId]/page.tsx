import { useRouter } from "next/navigation";

type TrackOrderPageProps = {
  params: {
    trackId: string;
  };
};

export default function TrackOrderPage({ params }: TrackOrderPageProps) {
    const { trackId } = params;
  return (
    <div className="bg-gray-700 text-white p-4">
      <h1 className="text-xl font-bold">Track Order</h1>
      {/* Display the trackId from the query */}
      <p>Track ID: {trackId}</p>
    </div>
  );
}
