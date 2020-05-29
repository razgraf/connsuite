import React from "react";
import { ThemeProvider as Provider, createGlobalStyle } from "styled-components";

import animations from "./animations";
import colors, { gradients } from "./colors";
import components from "./components";
import fonts from "./fonts";
import medias from "./medias";
import sizes from "./sizes";
import extensions from "./extensions";

const GlobalStyle = createGlobalStyle`
  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  html,
  body {
      height: 100%;
      width: 100%;
      padding: 0rem;
      margin: 0rem;
      overflow-x: hidden;
      overflow-y: auto;
      font-family: ${props => props.theme.fonts.secondary};
    }

  html {
    color: ${colors.dark};
    cursor: auto;
    font-family: ${fonts.secondary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select,
  textarea {
    appearance: none;
    border: none;
    font-family: inherit;
    outline: none;
  }

  @keyframes autofill {
    to {
      background-color: ${colors.white};
    }
  }

  input[type="number"]:-webkit-inner-spin-button,
  input[type="number"]:-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }
  input:-webkit-autofill {
    animation-fill-mode: both;
    animation-name: autofill;
  }


  div.ce-block__content,  div.ce-toolbar__content{
    max-width: calc(100% - 2 * 30px);
  }

`;

function ThemeProvider({ children }) {
  return (
    <Provider
      theme={{
        animations,
        colors,
        gradients,
        components,
        fonts,
        medias,
        sizes,
        extensions,
      }}
    >
      {children}
    </Provider>
  );
}

export { animations, colors, components, fonts, gradients, medias, sizes, extensions, GlobalStyle, ThemeProvider };
