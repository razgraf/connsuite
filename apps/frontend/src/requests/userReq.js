import { API, status } from "../constants";

export async function authGoogle(payload) {
  try {
    const endpoint = new URL(API.authGoogle());

    console.log(payload);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === status.OK) {
      const body = await response.json();
      console.log("User", body);
    } else {
      throw new Error("Nah");
    }
  } catch (e) {
    console.error(e);
  }

  return null;
}

export async function authClassic(payload) {
  console.error("Not implemented yet");
  return null;
}
