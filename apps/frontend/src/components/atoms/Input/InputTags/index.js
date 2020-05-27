import _ from "lodash";
import React, { useMemo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import { descriptor, Frame, Datalist } from "../atoms";
import { colors } from "../../../../themes";
import Tag from "./Tag";

const Wrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: flex-start;
  margin-left: 2px;
  &:nth-child(1) {
    margin-left: 0;
  }
`;

const StyledTag = styled(Tag)`
  margin: 3px;
`;

const StyledPlaceholder = styled(Tag)`
  position: absolute;
  left: 0;
  top: 3px;
`;

const Input = styled.input`
  min-width: 30px;
  flex: 1;
  z-index: 1;
  margin: 7px 4px 3px 4px;
`;

const StyledDatalist = styled(Datalist)`
  top: 30px;
  left: 0;
`;

const StyledFrame = styled(Frame)`
  div[data-component="box"] {
    flex-wrap: wrap;
    padding: 5px;
    min-height: 80px;
    align-items: flex-start;
  }

  ${StyledTag} {
    background-color: ${props => props.accent || colors.secondary};
    box-shadow: 0 0 5px 0 ${props => rgba(props.accent || colors.secondary, 0.2)};
  }
`;

function transfer(value) {
  return {
    target: {
      value,
    },
  };
}

function InputTags({ className, id, help, label, onUpdate, placeholder, inputRef, value, source, warning, accent: rawAccent }) {
  const accent = useMemo(() => (_.isFunction(rawAccent) ? rawAccent(colors) : _.toString(rawAccent)), [rawAccent]);
  const [isDatasetVisible, setIsDatasetVisible] = useState(false);
  const [current, setCurrent] = useState("");

  const onBackspace = useCallback(() => {
    if (!current || !current.length) onUpdate(transfer(value.slice(0, -1)));
  }, [onUpdate, value, current]);

  const onPush = useCallback(
    selected => {
      if (_.isEmpty(selected.title)) return;
      if (_.isArray(value) && !value.map(v => v.title).includes(selected.title)) {
        const final = source.find(s => s.title === selected.title) || selected;
        onUpdate(transfer([...value, final]));
      }
      setCurrent("");
      setIsDatasetVisible(false);
    },
    [value, source, onUpdate, setCurrent],
  );
  const onTagClick = useCallback(
    tag => {
      if (_.get(tag, "title")) onUpdate(transfer(value.filter(item => item.title !== _.get(tag, "title"))));
    },
    [onUpdate, value],
  );
  const onDataItemClick = useCallback(item => onPush(item), [onPush]);
  const onEnter = useCallback(() => onPush({ title: current }), [current, onPush]);

  const dataListSource = useMemo(() => {
    const filter = _.toArray(source).filter(
      sourceItem =>
        !value.find(selectedItem => selectedItem.title === sourceItem.title) &&
        (_.isEmpty(current) || sourceItem.title.toLowerCase().indexOf(_.toString(current).toLowerCase()) > -1),
    );

    return filter;
  }, [source, value, current]);

  return (
    <StyledFrame className={className} id={id} label={label} warning={warning} help={help} accent={accent}>
      {_.isArray(value) && value.map(tag => <StyledTag key={_.get(tag, "title")} element={tag} onClick={onTagClick} />)}
      <Wrapper>
        <Input
          id={id}
          placeholder={placeholder}
          ref={inputRef}
          type="text"
          autocomplete="off"
          value={current}
          onChange={e => {
            setCurrent(e.target.value);
            setIsDatasetVisible(true);
          }}
          onDoubleClick={() => (dataListSource.length ? setIsDatasetVisible(true) : null)}
          onKeyDown={e => {
            const key = typeof e.which === "number" ? e.which : e.keyCode;
            if (key === 13) onEnter(e);
            else if (key === 8) onBackspace(e);
          }}
        />
        {current && <StyledPlaceholder isPlaceholder element={{ title: current }} />}
        <StyledDatalist source={dataListSource} onClick={onDataItemClick} isVisible={isDatasetVisible} setIsVisible={setIsDatasetVisible} />
      </Wrapper>
    </StyledFrame>
  );
}

InputTags.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  help: descriptor.Label.propTypes.help,
  label: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
  placeholder: PropTypes.string,
  warning: PropTypes.string,
  source: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
      }),
      PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    ]),
  ),
  accent: PropTypes.oneOf(Object.values(colors)),
};

InputTags.defaultProps = {
  className: null,
  inputRef: null,
  label: null,
  help: null,
  placeholder: null,
  value: [],
  warning: null,
  source: [],
  accent: colors.secondary,
};

export default InputTags;
