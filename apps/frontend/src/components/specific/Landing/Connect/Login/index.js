import _ from "lodash";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import guards, { policy } from "@connsuite/guards";
import { useDispatch } from "react-redux";
import { blur } from "../../../../../utils";
import { useLoginReducer, useConnectMachine } from "../../../../../hooks";
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
  grid-template-columns: 1fr;
  grid-column-gap: calc(${props => props.theme.sizes.edge} * 2);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: calc(${props => props.theme.sizes.edge} * 0.5) 0 calc(${props => props.theme.sizes.edge} * 2);
  & > * {
    min-width: 200px;
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin: 0 auto;

  margin-bottom: calc(${props => props.theme.sizes.edge} * 1.5);
  background-color: ${props => props.theme.colors.grayBlueLight};
`;

const Alternative = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-top: calc(${props => props.theme.sizes.edge} * 1);
  padding-bottom: calc(${props => props.theme.sizes.edge} * 1);
  & > p {
    color: ${props => props.theme.colors.grayBlueDark};
    margin: 0 0 ${props => props.theme.sizes.edge} 0;
    font-weight: 600;
    font-size: 10pt;
  }
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

  & > p {
    font-size: 10pt;
    margin: 0;
  }
`;

function Login({ className }) {
  const dispatch = useDispatch();

  const reducer = useLoginReducer();
  const machine = useConnectMachine({ dispatch, type: "LOGIN" });

  const isFormValid = useMemo(() => {
    return reducer.helper.isValid(reducer.state);
  }, [reducer]);

  return (
    <Wrapper className={className}>
      <Fields>
        <InputText
          help={{ value: policy.user.email.root }}
          id="loginEmail"
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
          id="loginPassword"
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
      </Fields>
      <Actions onMouseEnter={blur}>
        <Button
          type={t => t.button}
          title="Connect"
          appearance={t => t.outline}
          accent={t => t.secondary}
          isDisabledSoft={!isFormValid}
          isDisabled={![machine.states.idle, machine.states.failure].includes(machine.current.value)}
          onClick={() => {
            if (!isFormValid) return;
            machine.send(machine.events.initialize, {
              vendor: "CLASSIC",
              identity: {
                email: reducer.state.email.value,
                password: reducer.state.password.value,
              },
            });
          }}
        />
      </Actions>
      <Divider />
      <StyledWarning isCentered value={_.toString(machine.current.context.error)} />
      <Alternative>
        <ButtonGoogle
          isDisabled={![machine.states.idle, machine.states.failure].includes(machine.current.value)}
          onClick={() => {
            machine.send(machine.events.initialize, { vendor: "GOOGLE" });
          }}
          onSuccess={payload => machine.send(machine.events.success, { payload })}
          onFailure={error => machine.send(machine.events.failure, { error })}
        />
      </Alternative>
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

Login.propTypes = {
  className: PropTypes.string,
};

Login.defaultProps = {
  className: null,
};

export default Login;
