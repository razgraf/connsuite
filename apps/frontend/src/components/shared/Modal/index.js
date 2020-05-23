import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useModal } from "../../../hooks";

import Backdrop from "../Backdrop";

const WrapperPartial = styled.div`
  position: fixed;
  z-index: ${props => props.elevation || props.theme.sizes.modalElevation};
  width: 100vw;
  height: 100vh;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  pointer-events: none;
  overflow: hidden;
`;
const ModalBackdrop = styled(Backdrop)`
  z-index: 100;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  z-index: 200;
  padding: calc(${props => props.theme.sizes.edge} * 2);
  overflow-x: hidden;
  overflow-y: auto;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
  min-height: 300px;
  background-color: ${props => props.theme.colors.white};
  border-radius: 20px;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 3);
`;

const Title = styled.div`
  flex: 1;
  padding-right: ${props => props.theme.sizes.edge};

  & > p {
    font-size: 16pt;
    font-family: ${props => props.theme.fonts.primary};
    color: ${props => props.theme.colors.dark};
    font-weight: 700;
    margin: 0;
  }
`;

const Main = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 200px;
  padding: calc(${props => props.theme.sizes.edge} * 3);
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 3);
`;

const Wrapper = styled(WrapperPartial)`
  &[data-visible="false"] {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
  }
`;

function Modal({ className, id, title, children, actions, elevation }) {
  const { isOpen, setOpen } = useModal(id);

  return (
    <Wrapper className={className} data-visible={isOpen} elevation={elevation}>
      <ModalBackdrop isOpen={isOpen} onClick={() => setOpen(false)} />
      <Container>
        <Card>
          <Header>
            <Title>{_.isString(title) ? <p>{title}</p> : title}</Title>
            <span>x</span>
          </Header>
          <Main>{children}</Main>
          <Footer>{actions}</Footer>
        </Card>
      </Container>
    </Wrapper>
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
