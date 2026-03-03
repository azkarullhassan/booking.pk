import { allHotels } from '@/lib/hotels-data';

export async function generateStaticParams() {
  return allHotels.map((hotel) => ({
    id: hotel.id.toString(),
  }));
}

export default function HotelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}