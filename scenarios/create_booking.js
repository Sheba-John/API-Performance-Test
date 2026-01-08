// Imports k6’s HTTP module to send API requests.
import http from "k6/http";

// Imports the assertion utility to validate responses.
import { check } from "k6";

/**
 * CREATE (POST /booking)
 * Creates a new booking and returns bookingId
 */

// Exposes a reusable function so this scenario can be called from the main test.
export function createBooking() {
  // Defines the endpoint for creating a booking.
  const url = "https://restful-booker.herokuapp.com/booking";

  // Builds the booking request body and converts it into JSON format.
  const payload = JSON.stringify({
    firstname: "John",
    lastname: "Doe",
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: "2025-01-01",
      checkout: "2025-01-05"
    },
    additionalneeds: "Breakfast"
  });

  // Sets request headers indicating JSON request and response.
  const params = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };

  // Sends a POST request to create the booking.
  const res = http.post(url, payload, params);

  // Validates that the response status is 200 and a bookingid is returned.
  check(res, {
    "CREATE | status is 200": (r) => r.status === 200,
    "CREATE | bookingId exists": (r) =>
      r.json("bookingid") !== undefined
  });

  // Extracts and returns the booking ID for reuse in other scenarios.
  return res.json("bookingid");
}
