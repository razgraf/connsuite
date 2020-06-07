import React from "react";
import styled from "styled-components";
import Spinner from "../../../components/atoms/Spinner";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function Visit() {
  return (
    <Wrapper>
      <Spinner color={c => c.secondary} />
    </Wrapper>
  );
}

export default Visit;
