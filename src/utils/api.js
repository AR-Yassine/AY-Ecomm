// utils/api.js
const BASE_URL = "https://api.sari3.com/v2/index.php?route=assignment_test";

// A small helper function for GET requests
export async function apiGet(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("API GET Error:", error);
    return null;
  }
}
