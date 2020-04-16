import React from "react";
import stylesDefault from "../../Base/BaseField.module.scss";
import styles from "./EditorJSField.module.scss";
import BaseField from "../../Base/BaseField";
import { Helper } from "../../../../../config/Util";
import EditorJSWrapper from "./EditorJSWrapper/EditorJSWrapper";

class EditorJSField extends BaseField {
  render() {
    return super.render();
  }

  field = () => {
    return (
      <div className={Helper.dynamicClass(stylesDefault, styles, "field", "EditorJSField")}>
        <div className={Helper.dynamicClass(stylesDefault, styles, "content", "content")}>
          <EditorJSWrapper
            id={this.props.data.ID}
            type={"text"}
            value={Helper.sanitize(this.props.data.value, {})}
            placeholder={this.props.data.placeholder}
            ref={this.element.field}
            onChange={(data = null) => {
              this.props.action.onChange(this.props.data.ID, data);
            }}
            onReady={(data = null) => {
              if (typeof this.props.action.callback.onReady === "function")
                this.props.action.callback.onReady(this.props.data.ID, data);
            }}
          />
        </div>
      </div>
    );
  };
}

export default EditorJSField;
