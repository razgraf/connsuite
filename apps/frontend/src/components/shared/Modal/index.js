import _ from "lodash";
import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import IconClose from "@material-ui/icons/CloseRounded";
import { useModal } from "../../../hooks";
import { MODAL_PORTAL } from "../../../constants";

import Backdrop from "../Backdrop";

const WrapperPartial = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: ${props => props.elevation || props.theme.sizes.modalElevation};
  width: 100vw;
  height: 100vh;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow-x: hidden;
  overflow-y: auto;
`;
const ModalBackdrop = styled(Backdrop)`
  z-index: 100;
  background-color: ${props => rgba(props.theme.colors.black, 0.5)};
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 200;
  width: 100%;
  max-width: 800px;
  background-color: ${props => props.theme.colors.white};
  border-radius: 10px;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 1.5) calc(${props => props.theme.sizes.edge} * 2);
`;

const Title = styled.div`
  flex: 1;
  padding-right: ${props => props.theme.sizes.edge};

  & > p {
    font-size: 15pt;
    font-family: ${props => props.theme.fonts.primary};
    color: ${props => props.theme.colors.dark};
    font-weight: 400;
    margin: 0;
  }
`;

const Close = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  width: 46px;
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  border-radius: 50%;
  cursor: pointer;
  background-color: ${props => props.theme.colors.white};
  transition: background-color 100ms;
  & > * {
    color: ${props => props.theme.colors.dark};
  }
  &:hover,
  &:active {
    background-color: ${props => props.theme.colors.grayBlueLight};
    transition: background-color 100ms;
  }
`;

const Main = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 1) calc(${props => props.theme.sizes.edge} * 2)
    calc(${props => props.theme.sizes.edge} * 1.5);
  line-height: 1.6;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 1.5) calc(${props => props.theme.sizes.edge} * 2);
  & > * {
    margin-left: ${props => props.theme.sizes.edge};
    &:first-child {
      margin-left: 0;
    }
  }
`;

const Wrapper = styled(WrapperPartial)`
  opacity: 1;
  transition: opacity 300ms;

  &[data-visible="false"] {
    pointer-events: none;
    opacity: 0;
    transition: opacity 300ms;
    ${Card} {
      transform: translateY(20px);
      transition: transform 300ms;
    }
  }
  &[data-visible="true"] {
    ${Card} {
      transform: translateY(0);
      transition: transform 300mx;
    }
  }
`;

function Modal({ className, id, title, children, actions, elevation }) {
  const { isOpen, setOpen } = useModal(id);

  const portal = useMemo(() => (typeof window === "undefined" ? null : document.getElementById(MODAL_PORTAL)), []);
  if (!portal) return null;

  return ReactDOM.createPortal(
    <Wrapper className={className} data-visible={isOpen} elevation={elevation} id={id}>
      <Card>
        <Header>
          <Title>{_.isString(title) ? <p>{title}</p> : title}</Title>
          <Close onClick={() => setOpen(false)}>
            <IconClose style={{ fontSize: "14pt" }} />
          </Close>
        </Header>
        <Main>{children}</Main>
        <Footer>{actions}</Footer>
      </Card>
      <ModalBackdrop isAnimated={false} isOpen={isOpen} onClick={() => setOpen(false)} />
    </Wrapper>,
    portal,
  );
}

Modal.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node]).isRequired,
  actions: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};

Modal.defaultProps = {
  className: null,
  actions: null,
  children: null,
  elevation: null,
};

export default Modal;
