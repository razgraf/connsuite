import _ from "lodash";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { useStore } from "react-redux";

import { useRegisterReducer, useConnectMachine } from "../../../../../hooks";

import gates, { policy } from "../../../../../gates";
import { Button, InputText, InputPassword, Warning } from "../../../../atoms";
import ButtonGoogle from "../../ButtonGoogle";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  max-width: 800px;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.white};
  padding: calc(${props => props.theme.sizes.edge} * 2) calc(${props => props.theme.sizes.edge} * 2)
    calc(${props => props.theme.sizes.edge} * 2);
`;

const Fields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: calc(${props => props.theme.sizes.edge} * 2);
  width: 100%;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: calc(${props => props.theme.sizes.edge} * 0.5) 0 calc(${props => props.theme.sizes.edge} * 2);
  & > *:not(p) {
    min-width: 200px;
  }
  & > p {
    margin: 0 ${props => props.theme.sizes.edge};
    color: ${props => props.theme.colors.grayBlueDark};
    font-weight: 600;
    font-size: 9pt;
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin: 0 auto;

  margin-bottom: calc(${props => props.theme.sizes.edge} * 2);
  background-color: ${props => props.theme.colors.grayBlueLight};
`;

const Terms = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  p {
    color: ${props => props.theme.colors.grayBlueDark};
    margin: 0;
    font-weight: 600;
    font-size: 9pt;
    &:hover,
    &:active {
      color: ${props => props.theme.colors.blue};
    }
  }
`;

const StyledWarning = styled(Warning)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0;
  grid-column: span 1;

  & > p {
    font-size: 10pt;
    margin: 0;
  }
`;

function Register({ className }) {
  const store = useStore();

  const reducer = useRegisterReducer();
  const machine = useConnectMachine(store, "REGISTER");

  const isFormValid = useMemo(() => {
    return reducer.helper.isValid(reducer.state);
  }, [reducer.state]);

  return (
    <Wrapper className={className}>
      <Fields>
        <InputText
          help={{ value: policy.name.root }}
          id="registerFirstName"
          label="First Name"
          onUpdate={e => {
            reducer.dispatch({
              type: reducer.actions.UPDATE_FIRST_NAME,
              payload: {
                value: e.target.value,
                error: gates.interpret(gates.isNameAcceptable, e.target.value),
              },
            });
          }}
          placeholder="John"
          value={reducer.state.firstName.value}
          warning={reducer.state.firstName.error}
        />
        <InputText
          help={{ value: policy.name.root }}
          id="registerLastName"
          label="Last Name"
          onUpdate={e => {
            reducer.dispatch({
              type: reducer.actions.UPDATE_LAST_NAME,
              payload: {
                value: e.target.value,
                error: gates.interpret(gates.isNameAcceptable, e.target.value),
              },
            });
          }}
          placeholder="Doe"
          value={reducer.state.lastName.value}
          warning={reducer.state.lastName.error}
        />
        <InputText
          help={{ value: policy.email.root }}
          id="registerEmail"
          label="Email"
          onUpdate={e => {
            reducer.dispatch({
              type: reducer.actions.UPDATE_EMAIL,
              payload: {
                value: e.target.value,
                error: gates.interpret(gates.isEmailAcceptable, e.target.value),
              },
            });
          }}
          placeholder="john.doe@gmail.com"
          value={reducer.state.email.value}
          warning={reducer.state.email.error}
        />
        <InputPassword
          help={{ value: policy.password.root }}
          id="registerPassword"
          label="Password"
          onUpdate={e => {
            reducer.dispatch({
              type: reducer.actions.UPDATE_PASSWORD,
              payload: {
                value: e.target.value,
                error: gates.interpret(gates.isPasswordAcceptable, e.target.value),
              },
            });
          }}
          placeholder="Your strongest password"
          value={reducer.state.password.value}
          warning={reducer.state.password.error}
        />

        <InputText
          help={{ value: policy.username.root }}
          id="registerUsername"
          label="Username"
          onUpdate={e => {
            reducer.dispatch({
              type: reducer.actions.UPDATE_USERNAME,
              payload: {
                value: e.target.value,
                error: gates.interpret(gates.isUsernameAcceptable, e.target.value),
              },
            });
          }}
          placeholder="johndoe007"
          value={reducer.state.username.value}
          warning={reducer.state.username.error}
        />
        <StyledWarning isCentered value={_.toString(machine.current.context.error)} />
      </Fields>
      <Actions>
        <Button
          type={t => t.button}
          title="Register a new Profile"
          appearance={t => t.outline}
          accent={t => t.secondary}
          isDisabledSoft={!isFormValid}
          isDisabled={![machine.states.idle, machine.states.failure].includes(machine.current.value)}
          onClick={() => {
            if (!isFormValid) return;
            machine.send(machine.events.initialize, {
              vendor: "CLASSIC",
              identity: {
                firstName: reducer.state.firstName.value,
                lastName: reducer.state.lastName.value,
                username: reducer.state.username.value,
                email: reducer.state.email.value,
                password: reducer.state.password.value,
              },
            });
          }}
        />
        <p>or</p>
        <ButtonGoogle
          isDisabled={![machine.states.idle, machine.states.failure].includes(machine.current.value)}
          onClick={() => {
            machine.send(machine.events.initialize, { vendor: "GOOGLE" });
          }}
          onSuccess={payload => machine.send(machine.events.success, { payload })}
          onFailure={error => machine.send(machine.events.failure, { error })}
        />
      </Actions>
      <Divider />
      <Terms>
        <Link href="/terms">
          <a href="/terms">
            <p>By connecting you accept our terms of use and privacy policy</p>
          </a>
        </Link>
      </Terms>
    </Wrapper>
  );
}

Register.propTypes = {
  className: PropTypes.string,
};

Register.defaultProps = {
  className: null,
};

export default Register;
