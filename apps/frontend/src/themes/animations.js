import { css, keyframes } from "styled-components";

export const fadeIn = keyframes`
    0%{
        opacity: 0
    }
    100%{
        opacity: 1
    }
`;

export const fadeInComeUp = keyframes`
    0%{
        opacity: 0;
        transform: translateY(50px);
    }
    100%{
        opacity: 1;
        transform: translateY(0);
    }
`;

export const comeUp = keyframes`
0%{
    transform: translateY(50px);
}
100%{
    transform: translateY(0);
}
`;

export const gradientMovement = keyframes`
  from{
    background-size: 300%;
  } 
  to{
    background-size: 100%;
  }
`;

export const fadeInCss = css`
  opacity: 0;
  animation-name: ${fadeIn};
  animation-duration: 300ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in;
`;

export const comeUpCss = css`
  opacity: 1;
  transform: translateY(50px);
  animation-name: ${comeUp};
  animation-duration: 300ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in;
`;

export const fadeInComeUpCss = css`
  opacity: 0;
  animation-name: ${fadeInComeUp};
  animation-duration: 300ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
`;

export const gradientMovementCss = css`
  background-size: 200%;
  animation-name: ${gradientMovement};
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in;
`;

const animations = {
  comeUp,
  comeUpCss,
  gradientMovement,
  gradientMovementCss,
  fadeIn,
  fadeInCss,
  fadeInComeUp,
  fadeInComeUpCss,
};

export default animations;
