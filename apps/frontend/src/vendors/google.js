export const configuration = {
  clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  onSuccess: () => {
    console.log("success");
  },
  onFailure: () => {
    console.log("failure");
  },
};
