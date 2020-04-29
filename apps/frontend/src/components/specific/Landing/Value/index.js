import React from "react";
import styled from "styled-components";
import { components } from "../../../../themes";
import Title from "../Title";

const Wrapper = styled.section`
  width: 100%;
`;

const Canvas = styled(components.Canvas)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 500px;
`;

function Value() {
  return (
    <Wrapper>
      <Canvas>
        <Title value="Find skilled people and business partners" />
      </Canvas>
    </Wrapper>
  );
}

export default Value;
