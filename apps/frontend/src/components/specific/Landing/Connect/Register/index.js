import _ from "lodash";
import React, { useState } from "react";
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

function Register({ className }) {
  const [text, setText] = useState(null);

  return (
    <Wrapper className={className}>
      <Fields>
        <InputText
          id="registerFirstName"
          label="First Name"
          onUpdate={e => setText(e.target.value)}
          placeholder="John"
          value={text}
          warning={!_.isNil(text) && !text.includes("1") ? "Must contain a digit with value=1" : null}
        />
        <InputText id="registerLastName" label="Last Name" onUpdate={e => setText(e.target.value)} placeholder="Doe" value={text} />
        <InputText
          help={{ value: "Some Help here" }}
          id="registerEmail"
          label="Email"
          onUpdate={e => setText(e.target.value)}
          placeholder="Placeholder"
          value={text}
        />
        <InputPassword
          help={{ value: "Some Help here" }}
          id="password"
          label="Password"
          onUpdate={e => setText(e.target.value)}
          placeholder="Placeholder"
          value={text}
        />
        <InputText id="registerUsername" label="Username" onUpdate={e => setText(e.target.value)} placeholder="Username" value={text} />
      </Fields>
      <Actions>
        <Button type={t => t.button} title="Register a new profile" appearance={t => t.outline} accent={t => t.secondary} />
        <p>or</p>
        <ButtonGoogle />
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
