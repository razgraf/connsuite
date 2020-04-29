import React from "react";
import PropTypes from "prop-types";
import { GoogleLogin } from "react-google-login";
import { google } from "../../../../vendors";
import { Button } from "../../../atoms";

function ButtonGoogle({ isDisabled }) {
  return (
    <GoogleLogin
      clientId={google.configuration.clientId}
      render={({ onClick, disabled }) => (
        <Button
          type={t => t.button}
          title="Connect with Google"
          appearance={t => t.solid}
          accent={t => t.google}
          onClick={onClick}
          isDisabled={disabled || isDisabled}
        />
      )}
      buttonText="Login"
      onSuccess={({ tokenId }) => {
        console.log("success", tokenId);
      }}
      onFailure={(error, details) => {
        console.log("fail", error, details);
      }}
      cookiePolicy="single_host_origin"
    />
  );
}

ButtonGoogle.propTypes = {
  isDisabled: PropTypes.bool,
};
ButtonGoogle.defaultProps = {
  isDisabled: false,
};

export default ButtonGoogle;
