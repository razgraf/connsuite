import _ from "lodash";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import guards, { policy } from "@connsuite/guards";
import { useDispatch } from "react-redux";
import { blur } from "../../../../../utils";
import { useRegisterReducer, useConnectMachine } from "../../../../../hooks";
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
  const dispatch = useDispatch();

  const reducer = useRegisterReducer();
  const machine = useConnectMachine({ dispatch, type: "REGISTER" });

  const isFormValid = useMemo(() => {
    return reducer.helper.isValid(reducer.state);
  }, [reducer]);

  return (
    <Wrapper className={className}>
      <Fields>
        <InputText
          help={{ value: policy.user.name.root }}
          id="registerFirstName"
          label="First Name"
          onUpdate={e => {
            reducer.dispatch({
              type: reducer.actions.UPDATE_FIRST_NAME,
              payload: {
                value: e.target.value,
                error: guards.interpret(guards.isNameAcceptable, e.target.value),
              },
            });
          }}
          placeholder="John"
          value={reducer.state.firstName.value}
          warning={reducer.state.firstName.error}
        />
        <InputText
          help={{ value: policy.user.name.root }}
          id="registerLastName"
          label="Last Name"
          onUpdate={e => {
            reducer.dispatch({
              type: reducer.actions.UPDATE_LAST_NAME,
              payload: {
                value: e.target.value,
                error: guards.interpret(guards.isNameAcceptable, e.target.value),
              },
            });
          }}
          placeholder="Doe"
          value={reducer.state.lastName.value}
          warning={reducer.state.lastName.error}
        />
        <InputText
          help={{ value: policy.user.email.root }}
          id="registerEmail"
          label="Email"
          onUpdate={e => {
            reducer.dispatch({
              type: reducer.actions.UPDATE_EMAIL,
              payload: {
                value: e.target.value,
                error: guards.interpret(guards.isEmailAcceptable, e.target.value),
              },
            });
          }}
          placeholder="john.doe@gmail.com"
          value={reducer.state.email.value}
          warning={reducer.state.email.error}
        />
        <InputPassword
          help={{ value: policy.user.password.root }}
          id="registerPassword"
          label="Password"
          onUpdate={e => {
            reducer.dispatch({
              type: reducer.actions.UPDATE_PASSWORD,
              payload: {
                value: e.target.value,
                error: guards.interpret(guards.isPasswordAcceptable, e.target.value),
              },
            });
          }}
          placeholder="Your strongest password"
          value={reducer.state.password.value}
          warning={reducer.state.password.error}
        />

        <InputText
          help={{ value: policy.user.username.root }}
          id="registerUsername"
          label="Username"
          onUpdate={e => {
            reducer.dispatch({
              type: reducer.actions.UPDATE_USERNAME,
              payload: {
                value: e.target.value,
                error: guards.interpret(guards.isUsernameAcceptable, e.target.value),
              },
            });
          }}
          placeholder="johndoe007"
          value={reducer.state.username.value}
          warning={reducer.state.username.error}
        />
        <StyledWarning isCentered value={_.toString(machine.current.context.error)} />
      </Fields>
      <Actions onMouseEnter={blur}>
        <Button
          type={t => t.button}
          title="Register a new Profile"
          appearance={t => t.outline}
          accent={t => t.secondary}
          isDisabledSoft={!isFormValid}
          isLoading={[machine.states.connect].includes(machine.current.value)}
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
