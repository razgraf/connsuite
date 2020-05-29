import _ from "lodash";
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Base from "../../../../shared/Modal";
import { modals } from "../../../../../constants";
import { useModal, useArticleRemoveMachine } from "../../../../../hooks";
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

const Error = styled.p`
  color: ${props => props.theme.colors.red};
  margin: 15px 0 0 0;
  font-size: ${props => props.theme.sizes.text};
  text-align: left;
  font-weight: 600;
`;

function ModalArticleRemove({ className, article, onSuccess: onSuccessCallback }) {
  const id = modals.articleRemove;
  const auth = useSelector(state => state.auth);
  const { setOpen } = useModal(id);

  const onSuccess = useCallback(() => {
    setOpen(false);
    onSuccessCallback(false);
  }, [setOpen, onSuccessCallback]);

  const machine = useArticleRemoveMachine({
    onSuccess,
  });

  const onCancel = useCallback(() => {
    machine.send(machine.events.reset);
    setOpen(false);
  }, [machine, setOpen]);

  const onRemove = useCallback(() => {
    machine.send(machine.events.forward, { payload: { auth, articleId: _.get(article, "_id") } });
  }, [auth, article, machine]);

  return (
    <Modal
      className={className}
      id={id}
      title="Remove article"
      actions={
        <>
          <Button
            isDisabled={machine.current.value === machine.states.apply}
            type={t => t.button}
            appearance={t => t.outline}
            accent={t => t.cancel}
            title="Cancel"
            onClick={onCancel}
          />
          <Button
            isLoading={machine.current.value === machine.states.apply}
            type={t => t.button}
            appearance={t => t.outline}
            accent={t => t.remove}
            title="Confirm and Remove"
            onClick={onRemove}
          />
        </>
      }
    >
      <Explainer>
        Are you sure you want to delete <span>{_.get(article, "title")}</span> from your profile? This action is permanent and will remove
        the item immediately after confirmation.
      </Explainer>
      {machine.current.context.error && <Error>Oops: {_.toString(machine.current.context.error)}</Error>}
    </Modal>
  );
}

ModalArticleRemove.propTypes = {
  className: PropTypes.string,
  article: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
  onSuccess: PropTypes.func,
};

ModalArticleRemove.defaultProps = {
  className: null,
  article: {},
  onSuccess: () => {},
};

export default ModalArticleRemove;
