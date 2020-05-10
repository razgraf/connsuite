import React from "react";
import styled from "styled-components";
import { useStore } from "react-redux";
import { Button } from "../../../components/atoms";
import { Area } from "../../../components/shared";

function Statistics() {
  const store = useStore();

  return (
    <Area>
      <p>Statistics</p>
    </Area>
  );
}

export default Statistics;
