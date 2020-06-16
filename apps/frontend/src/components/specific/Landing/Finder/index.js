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

function Finder() {
  return (
    <Wrapper id="finder">
      <Canvas>
        <Title value="Find skilled people and business partners" />
      </Canvas>
    </Wrapper>
  );
}

export default Finder;
