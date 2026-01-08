// Imports http and check for API calls and validations.
import http from "k6/http";
import { check } from "k6";

/**
 * READ (GET /booking/{id})
 * Fetches booking details using bookingId
 */

// Exposes a reusable functio and also accepts bookingId as an input parameter.
export function readBooking(bookingId) {
  // Dynamically builds the endpoint using the booking ID.
  const url = `https://restful-booker.herokuapp.com/booking/${bookingId}`;

  // Sends a GET request to retrieve booking details.
  const res = http.get(url, {
    headers: {
      "Accept": "application/json"
    }
  });

  // Confirms: HTTP status is 200, The response contains a firstname field.
  check(res, {
    "READ | status is 200": (r) => r.status === 200,
    "READ | firstname present": (r) =>
      r.json("firstname") !== undefined
  });
}
