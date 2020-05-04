import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
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

function Login({ className, machine }) {
  const [text, setText] = useState(null);

  useEffect(() => {
    console.log(machine.current.value);
  }, [machine.current.value]);

  return (
    <Wrapper className={className}>
      <Fields>
        <InputText
          help={{ value: "Some Help here" }}
          id="login"
          label="Email"
          onUpdate={e => setText(e.target.value)}
          placeholder="Placeholder"
          value={text}
          //   warning={!_.isNil(text) && !text.includes("1") ? "Must contain a digit with value=1" : null}
        />
        <InputPassword
          help={{ value: "Some Help here" }}
          id="password"
          label="Password"
          onUpdate={e => setText(e.target.value)}
          placeholder="Placeholder"
          value={text}
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
            machine.send("RESET");
            machine.send("INITIALIZE", { vendor: "GOOGLE" });
          }}
          onSuccess={payload => machine.send("SUCCESS", { payload })}
          onFailure={payload => machine.send("FAILURE", { payload })}
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
  machine: PropTypes.shape({
    current: PropTypes.shape.isRequired,
    send: PropTypes.func.isRequired,
    states: PropTypes.shape.isRequired,
  }).isRequired,
};

Login.defaultProps = {
  className: null,
};

export default Login;
