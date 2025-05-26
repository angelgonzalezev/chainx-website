import { useBooking } from "@calcom/atoms";
import { useSearchParams } from "react-router";

const Bookings = () => {
	const [searchParams] = useSearchParams();
	const bookingUid = searchParams.get("bookingUid");
	console.log("🚀 ~ Bookings ~ bookingUid:", bookingUid);

	const { isLoading, data: booking, refetch } = useBooking(bookingUid ?? "");
	console.log("🚀 ~ Bookings ~ isLoading:", isLoading);
	console.log("🚀 ~ Bookings ~ booking:", booking);
	console.log("🚀 ~ Bookings ~ refetch:", refetch);

	return (
		<>
			{!Array.isArray(booking) ? (
				<p>{booking.title}</p>
			) : (
				booking.map((recurrence) => <p key={recurrence.id}>{recurrence.title}</p>)
			)}
		</>
	);
};
export default Bookings;
