import React from "react";
import styled from "styled-components";
import { useStore } from "react-redux";
import { Button } from "../../../components/atoms";
import { Area } from "../../../components/shared";

function Business() {
  const store = useStore();

  return (
    <Area>
      <p>Business</p>
    </Area>
  );
}

export default Business;
