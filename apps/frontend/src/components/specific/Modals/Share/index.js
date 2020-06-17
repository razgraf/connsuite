import _ from "lodash";
import React, { useMemo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import copy from "copy-to-clipboard";
import AssetClipboard from "@material-ui/icons/AssignmentRounded";
import Base from "../../../shared/Modal";
import { modals } from "../../../../constants";
import { useModal } from "../../../../hooks";
import { Button } from "../../../atoms";

const Modal = styled(Base)``;

const Explainer = styled.p`
  margin: 0;
  font-size: ${props => props.theme.sizes.text};
  font-weight: 500;
  color: ${props => props.theme.colors.dark};
  & > span {
    font-weight: 600;
    color: ${props => props.theme.colors.red};
  }
`;

const ClipboardWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 46px;
  width: 100%;
  margin-top: 30px;
  cursor: pointer;
`;

const CliboardUrl = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;
  border-radius: 4px 0 0 4px;
  padding: 0 12px;
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  background-color: ${props => props.theme.colors.white};
  transition: background-color 200ms;

  &[data-active="true"] {
    background-color: ${props => props.theme.colors.grayBlueGhost};
    transition: background-color 200ms;
  }

  & > svg {
    margin-right: 8px;
    font-size: 16pt;
    color: ${props => props.theme.colors.dark};
  }
  & > p {
    margin: 0;
    font-size: 10pt;
    font-weight: 500;
    color: ${props => props.theme.colors.dark};
  }
`;

const ClipboardButton = styled.div`
  height: 100%;
  min-width: 150px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 4px 4px 0;
  margin-left: 0;
  background-color: ${props => props.theme.colors.dark};
  transition: background-color 200ms;

  & > p {
    user-select: none;
    margin: 0;
    font-size: 10pt;
    font-weight: 500;
    color: ${props => props.theme.colors.white};
  }
  &[data-active="true"] {
    background-color: ${props => props.theme.colors.secondary};
    pointer-events: none;
    transition: background-color 200ms;
  }
`;

function ModalShare({ className }) {
  const id = modals.share;

  const [isCopying, setIsCopying] = useState(false);
  const { setOpen, data } = useModal(id);

  const url = useMemo(() => _.get(data, "url"), [data]);
  const explainer = useMemo(() => _.get(data, "explainer"), [data]);

  const onCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onCopyClick = useCallback(() => {
    setIsCopying(true);
    copy(url);
  }, [setIsCopying, url]);

  useEffect(() => {
    const timeout = isCopying ? setTimeout(() => setIsCopying(false), 2500) : null;
    return () => clearTimeout(timeout);
  }, [isCopying, setIsCopying]);

  return (
    <Modal
      className={className}
      id={id}
      title="Share with your audience"
      actions={
        <>
          <Button type={t => t.button} appearance={t => t.outline} accent={t => t.grayBlueDark} title="Close" onClick={onCancel} />
        </>
      }
    >
      <Explainer>{explainer}</Explainer>
      <ClipboardWrapper onClick={onCopyClick}>
        <CliboardUrl data-active={isCopying}>
          <AssetClipboard />
          <p>{url}</p>
        </CliboardUrl>
        <ClipboardButton data-active={isCopying}>
          <p>{isCopying ? "Copied to clipboard" : "Click to copy"}</p>
        </ClipboardButton>
      </ClipboardWrapper>
    </Modal>
  );
}

ModalShare.propTypes = {
  className: PropTypes.string,
};

ModalShare.defaultProps = {
  className: null,
};

export default ModalShare;
