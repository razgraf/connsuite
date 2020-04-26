import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { GoogleLogin } from "react-google-login";
import { google } from "../../../../vendors";

function ButtonGoogle() {
  return (
    <GoogleLogin
      clientId={google.configuration.clientId}
      render={renderProps => (
        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
          This is my custom Google button
        </button>
      )}
      buttonText="Login"
      onSuccess={({ tokenId }) => {
        console.log("success");
        //send this to server
      }}
      onFailure={(error, details) => {
        console.log("fail", error, details);
      }}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default ButtonGoogle;
