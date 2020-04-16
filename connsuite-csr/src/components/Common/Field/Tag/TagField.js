import React from "react";
import stylesDefault from "../Base/BaseField.module.scss";
import styles from "./TagField.module.scss";
import BaseField from "../Base/BaseField";
import { Helper } from "../../../../config/Util";
import validator from "validator";
import Icon from "../../Icon/Icon";
import FieldDataset from "../FieldDataset/FieldDataset";

class TagField extends BaseField {
  constructor(props) {
    super(props);

    this.state.tagField_isDatasetVisible = false;
    this.state.tagField_input = "";

    this.refToDataset = React.createRef();
  }

  render() {
    return super.render();
  }

  field = () => {
    return (
      <div className={Helper.dynamicClass(stylesDefault, styles, "field", "TagField")}>
        <div className={Helper.dynamicClass(stylesDefault, styles, "content")}>
          <div
            className={Helper.dynamicClass(styles, this.props.style, "box")}
            onClick={e => {
              this.element.field.current.focus();
            }}
          >
            {!Helper.isEmpty(this.props.data.value) && this.props.data.value.length > 0
              ? this.props.data.value.map((element, index) => {
                  return (
                    <li
                      data-accent={this.props.accentColor}
                      key={index}
                      className={Helper.dynamicClass(styles, this.props.style, "tag")}
                    >
                      <span>{element.title}</span>
                      <Icon
                        icon
                        round
                        source={"close"}
                        className={styles.icon}
                        onClick={() => {
                          let value = [...this.props.data.value];
                          for (let i = 0; i < value.length; i++)
                            if (value[i].title.toLowerCase() === element.title.toLowerCase()) {
                              value.splice(i, 1);
                              break;
                            }
                          this.props.action.onChange(this.props.data.ID, value);
                        }}
                      />
                    </li>
                  );
                })
              : null}
            <li className={styles.input}>
              <input
                id={this.props.data.ID}
                type={"text"}
                value={this.state.tagField_input}
                placeholder={this.props.data.placeholder}
                ref={this.element.field}
                onFocus={e => {
                  if (!Helper.isEmpty(e.target.value) && !this.state.tagField_isDatasetVisible)
                    this.setState({ tagField_isDatasetVisible: true });
                }}
                onChange={e => {
                  this.setState({ tagField_input: e.target.value });
                  if (!Helper.isEmpty(e.target.value) && !this.state.tagField_isDatasetVisible)
                    this.setState({ tagField_isDatasetVisible: true });
                }}
                onDoubleClick={() => {
                  if (!this.state.tagField_isDatasetVisible)
                    this.setState({
                      tagField_isDatasetVisible: true,
                    });
                }}
                onBlur={() => {
                  if (this.props.data.warn.onBlur) this.isValid(true);
                }}
                onKeyDown={e => {
                  if ((typeof e.which == "number" ? e.which : e.keyCode) === 32) {
                    /**
                     * Space
                     */
                    let title = e.target.value;
                    if (title.replace(/ /g, "").length === 0) {
                      this.setState({ tagField_input: "" });
                      return;
                    }
                  } else if ((typeof e.which == "number" ? e.which : e.keyCode) === 13) {
                    /**
                     * Enter
                     */
                    let title = e.target.value;
                    if (title.length === 0) return;

                    this.addTag({
                      AID: null,
                      title: title,
                    });
                  } else if ((typeof e.which == "number" ? e.which : e.keyCode) === 8) {
                    /**
                     * Backspace
                     */
                    if (
                      Helper.isEmpty(this.state.tagField_input) &&
                      !Helper.isEmpty(this.props.data.value) &&
                      this.props.data.value.length > 0
                    ) {
                      let v = [...this.props.data.value];
                      v.pop();
                      this.props.action.onChange(this.props.data.ID, [...v]);
                    }
                  } else if ((typeof e.which == "number" ? e.which : e.keyCode) === 40) {
                    /**
                     * Arrow Down
                     */
                    if (!this.state.tagField_isDatasetVisible)
                      this.setState({
                        tagField_isDatasetVisible: true,
                      });

                    this.refToDataset.current.focusNextElement();
                  }
                }}
              />

              <FieldDataset
                ref={this.refToDataset}
                visible={this.state.tagField_isDatasetVisible}
                source={this.props.data.source.filter(element => {
                  for (let i = 0; i < this.props.data.value.length; i++)
                    if (this.props.data.value[i].title.toLowerCase() === element.title.toLowerCase()) return false;
                  return true;
                })}
                match={this.state.tagField_input}
                link={this.element.field}
                onClick={element => {
                  this.addTag({
                    AID: null,
                    title: element.title,
                  });
                  this.setState({
                    tagField_isDatasetVisible: false,
                  });
                }}
              />
            </li>
          </div>
        </div>
      </div>
    );
  };

  isValid = (handleWarn = false) => {
    let flag = false;

    if (!Helper.isEmpty(this.props.data.length) && this.props.data.length.length === 2)
      if (this.props.data.value < this.props.data.length[0] || this.props.data.value > this.props.data.length[1])
        flag = true;

    if (handleWarn) {
      if (flag) this.doWarn();
      else this.doRestore();
    }

    return flag;
  };

  addTag = element => {
    let value = [...this.props.data.value];
    /**
     * Is tag new or does it come from our source
     */
    for (let i = 0; i < this.props.data.source.length; i++)
      if (this.props.data.source[i].title.toLowerCase() === element.title.toLowerCase()) {
        element = { ...this.props.data.source[i] };
        break;
      }
    /**
     * Is tag new or is it a duplicate ?
     */
    for (let i = 0; i < value.length; i++)
      if (value[i].title.toLowerCase() === element.title.toLowerCase()) {
        value.splice(i, 1);
        break;
      }

    this.props.action.onChange(this.props.data.ID, [...value, element]);
    this.setState({ tagField_input: "" });

    if (this.props.data.warn.value) this.isValid(true);
  };
}

export default TagField;
