import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Base from "../../../../shared/Modal";
import { modals } from "../../../../../constants";
import { useModal } from "../../../../../hooks";
import { Button } from "../../../../atoms";

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

function ModalProfileLeave({ className, onSuccess: onSuccessCallback }) {
  const id = modals.profileLeave;
  const { setOpen } = useModal(id);

  const onCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onLeave = useCallback(() => {
    setOpen(false);
    onSuccessCallback(false);
  }, [setOpen, onSuccessCallback]);

  return (
    <Modal
      className={className}
      id={id}
      title="Discard changes and leave"
      actions={
        <>
          <Button type={t => t.button} appearance={t => t.outline} accent={t => t.cancel} title="Cancel" onClick={onCancel} />
          <Button
            type={t => t.button}
            appearance={t => t.outline}
            accent={t => t.grayBlueBlack}
            title="Discard and Leave"
            onClick={onLeave}
          />
        </>
      }
    >
      <Explainer>Leaving now will discard all the changes you&amp;ve made to your profile. Are you sure you want to continue?</Explainer>
    </Modal>
  );
}

ModalProfileLeave.propTypes = {
  className: PropTypes.string,
  onSuccess: PropTypes.func,
};

ModalProfileLeave.defaultProps = {
  className: null,
  onSuccess: () => {},
};

export default ModalProfileLeave;
