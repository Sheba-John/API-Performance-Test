import { sleep } from "k6";

// CRUD scenario imports
import { createBooking } from "../scenarios/create_booking.js";
import { readBooking } from "../scenarios/read_booking.js";
import { updateBooking } from "../scenarios/update_booking.js";
import { deleteBooking } from "../scenarios/delete_booking.js";

// Environment variables with defaults
const VUS = Number(__ENV.VUS) || 10;
const DURATION = __ENV.DURATION || "30s";

// Fail fast if duration is missing in CI
if (!__ENV.DURATION) {
    throw new Error("❌ DURATION environment variable is required");
}

// k6 options
export const options = {
    vus: VUS,
    duration: DURATION,

    thresholds: {
        http_req_duration: ["p(95)<800"],
        http_req_failed: ["rate<0.01"],
    },
};

/**
 * Full CRUD flow:
 * CREATE → READ → UPDATE → DELETE
 */
export default function crudBookingFlow() {
    const bookingId = createBooking();

    // Safety check
    if (!bookingId) {
        return;
    }

    readBooking(bookingId);
    sleep(1);

    updateBooking(bookingId);
    sleep(1);

    deleteBooking(bookingId);
    sleep(1);
}
