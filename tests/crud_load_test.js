// Imports all CRUD scenario functions.
import { createBooking } from "../scenarios/create_booking.js";
import { readBooking } from "../scenarios/read_booking.js";
import { updateBooking } from "../scenarios/update_booking.js";
import { deleteBooking } from "../scenarios/delete_booking.js";

// Defines k6 load configuration:
export const options = {
  // Gradual ramp-up and ramp-down of virtual users
  stages: [
    { duration: __ENV.RAMP_UP || "1m", target: Number(__ENV.VUS) || 10 },
    { duration: __ENV.STEADY || "2m", target: Number(__ENV.VUS) || 10 },
    { duration: __ENV.RAMP_DOWN || "1m", target: 0 }
  ],
  // Performance thresholds for response time and failure rate.
  thresholds: {
    http_req_duration: ["p(95)<800"],
    http_req_failed: ["rate<0.01"]
  }
};

/**
 * Full CRUD flow per virtual user:
 * CREATE → READ → UPDATE → DELETE
 */

// Represents one full iteration per virtual user
export default function () {
  const bookingId = createBooking();
  readBooking(bookingId);
  // updateBooking(bookingId);
  // deleteBooking(bookingId);
}
