import http from "k6/http";
import { check } from "k6";

/**
 * Generates authentication token
 */

// Sends a POST request to /auth with admin credentials, Extracts and returns the authentication token from the response, 
// This token is reused for update and delete operations
export function getAuthToken() {
  const url = "https://restful-booker.herokuapp.com/auth";

  const payload = JSON.stringify({
    username: "admin",
    password: "password123"
  });

  const res = http.post(url, payload, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });

  return res.json("token");
}

/**
 * UPDATE (PUT /booking/{id})
 * Updates booking data
 */
 
export function updateBooking(bookingId) {
  // Calls getAuthToken() to obtain a valid token, Builds the update endpoint using bookingId,
  const token = getAuthToken();
  const url = `https://restful-booker.herokuapp.com/booking/${bookingId}`;

  // Creates an updated booking payload, Sends a PUT request with: JSON payload, 
  const payload = JSON.stringify({
    firstname: "Updated",
    lastname: "User",
    totalprice: 300,
    depositpaid: false,
    bookingdates: {
      checkin: "2025-02-01",
      checkout: "2025-02-10"
    },
    additionalneeds: "Dinner"
  });

  // Authentication token passed via the Cookie header.
  const res = http.put(url, payload, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Cookie": `token=${token}`
    }
  });

  // Uses check() to verify: Status code is 200, Booking data is actually updated.
  check(res, {
    "UPDATE | status is 200": (r) => r.status === 200,
    "UPDATE | firstname updated": (r) =>
      r.json("firstname") === "Updated"
  });
}
