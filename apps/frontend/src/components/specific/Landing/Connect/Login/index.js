import _ from "lodash";
import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { useStore } from "react-redux";

import { useLoginReducer, useLoginMachine } from "../../../../../hooks";

import gates, { policy } from "../../../../../gates";
import { Button, InputText, InputPassword } from "../../../../atoms";
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

  margin-bottom: calc(${props => props.theme.sizes.edge} * 2);
  background-color: ${props => props.theme.colors.grayBlueLight};
`;

const Alternative = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  padding-bottom: calc(${props => props.theme.sizes.edge} * 2);
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

function Login({ className }) {
  const store = useStore();

  const reducer = useLoginReducer();
  const machine = useLoginMachine(store);

  useEffect(() => {
    console.log(machine.current.value);
  }, [machine.current.value]);

  return (
    <Wrapper className={className}>
      <Fields>
        <InputText
          help={{ value: policy.email.root }}
          id="loginEmail"
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
          id="loginPassword"
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
          value={reducer.state.email.password}
          warning={reducer.state.email.password}
        />
      </Fields>
      <Actions>
        <Button type={t => t.button} title="Connect" appearance={t => t.outline} accent={t => t.secondary} />
      </Actions>
      <Divider />
      <Alternative>
        <ButtonGoogle
          isDisabled={![machine.states.idle, machine.states.failure].includes(machine.current.value)}
          onClick={() => {
            machine.send(machine.events.initialize, { vendor: "GOOGLE" });
          }}
          onSuccess={payload => machine.send(machine.events.success, { payload })}
          onFailure={payload => machine.send(machine.events.failure, { payload })}
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
