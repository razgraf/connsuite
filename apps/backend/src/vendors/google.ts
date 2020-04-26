import * as GoogleAuth from "google-auth-library";


const client = new GoogleAuth.OAuth2Client(
  process.env.CONN_BACK_GOOGLE_CLIENT_ID,
  process.env.CONN_BACK_GOOGLE_CLIENT_SECRET,
);

async function getTicket(token: string): Promise<GoogleAuth.LoginTicket> {
  return await client.verifyIdToken({
    idToken: token,
    audience: [process.env.CONN_FRONT_GOOGLE_CLIENT_ID || ""],
  });
}

const google = {
  client,
  library: GoogleAuth,
  getTicket,
};

export default google;
