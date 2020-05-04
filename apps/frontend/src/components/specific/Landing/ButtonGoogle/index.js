import React from "react";
import PropTypes from "prop-types";
import { GoogleLogin } from "react-google-login";
import { google } from "../../../../vendors";
import { Button } from "../../../atoms";

function ButtonGoogle({ isDisabled, onClick, onFailure, onSuccess }) {
  return (
    <GoogleLogin
      clientId={google.configuration.clientId}
      render={({ onClick: onGoogleClick, disabled: isGoogleDisabled }) => (
        <Button
          type={t => t.button}
          title="Connect with Google"
          appearance={t => t.solid}
          accent={t => t.google}
          onClick={e => {
            onClick(e);
            onGoogleClick(e);
          }}
          isDisabled={isGoogleDisabled || isDisabled}
        />
      )}
      onSuccess={payload => {
        onSuccess(payload);
      }}
      onFailure={(error, details) => {
        onFailure({
          error,
          details,
        });
      }}
      cookiePolicy="single_host_origin"
    />
  );
}

ButtonGoogle.propTypes = {
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
};
ButtonGoogle.defaultProps = {
  isDisabled: false,
};

export default ButtonGoogle;
