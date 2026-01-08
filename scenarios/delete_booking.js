import http from "k6/http";
import { check } from "k6";
// Imports getAuthToken from update_booking.js to reuse authentication logic.
import { getAuthToken } from "./update_booking.js";

/**
 * DELETE (DELETE /booking/{id})
 * Deletes the booking
 */

// Accepts the booking ID to be deleted.
export function deleteBooking(bookingId) {
  // Generates a token using getAuthToken().
  const token = getAuthToken();

  // Sends a DELETE request to /booking/{id}.
  const url = `https://restful-booker.herokuapp.com/booking/${bookingId}`;

  // Passes the token in the Cookie header.
  const res = http.del(url, null, {
    headers: {
      "Accept": "application/json",
      "Cookie": `token=${token}`
    }
  });

  // Uses check() to confirm the expected 201 success status.
  check(res, {
    "DELETE | status is 201": (r) => r.status === 201
  });
}
