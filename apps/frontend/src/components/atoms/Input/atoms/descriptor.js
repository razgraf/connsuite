/* eslint-disable react/forbid-foreign-prop-types */
import PropTypes from "prop-types";

/**
 *
 *
 * Keep the propTypes here so we can use and *extend* them even if they get removed in the production build
 *
 *
 */

const Box = {
  propTypes: {
    className: PropTypes.string,
  },
  defaultProps: {
    className: null,
  },
};
const { className: _boxCN, ...BoxClean } = Box;

const Label = {
  propTypes: {
    className: PropTypes.string,
    htmlFor: PropTypes.string,
    isWarned: PropTypes.bool,
    value: PropTypes.string,
    help: PropTypes.shape({
      force: PropTypes.string,
      value: PropTypes.string,
    }),
  },
  defaultProps: {
    className: null,
    htmlFor: null,
    value: null,
    help: null,
    isWarned: false,
  },
};
const { className: _labelCN, help: _labelH, isWarned: _labelW, ...LabelClean } = Label;

const Warning = {
  propTypes: {
    className: PropTypes.string,
    value: PropTypes.string,
  },
  defaultProps: {
    className: null,
    value: null,
  },
};

const { className: _warningCN, ...WarningClean } = Warning;

const Frame = {
  propTypes: {
    box: PropTypes.shape({}),
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    help: Label.propTypes.help,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        ...LabelClean.propTypes,
      }),
    ]).isRequired,
    warning: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        ...WarningClean.propTypes,
      }),
    ]),
  },
  defaultProps: {
    className: null,
  },
};

const { className: _frameCN, ...FrameClean } = Frame;

const descriptor = {
  Box,
  BoxClean,
  Label,
  LabelClean,
  Frame,
  FrameClean,
  Warning,
  WarningClean,
};

export default descriptor;
