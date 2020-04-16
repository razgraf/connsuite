/**
 * Created by @VanSoftware on 2019-07-05.
 */
import React, { Component } from "react";
import { Helper } from "../../../config/Util";
import PropTypes from "prop-types";
import ImageModel from "../../../model/ImageModel";

class Image extends Component {
  //TODO Implement safe-load

  render() {
    const image =
      !Helper.isEmpty(this.props.source) &&
      this.props.source instanceof ImageModel
        ? this.props.source
        : new ImageModel({ source: this.props.placeholder });
    return (
      <React.Fragment>
        <div title={this.props.title} className={this.props.className}>
          <img nopin="nopin" alt={this.props.alt} src={image.source} />
        </div>
      </React.Fragment>
    );
  }

  static propTypes = {
    source: PropTypes.shape({}),
    className: PropTypes.string,
    alt: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string
  };

  static defaultProps = {
    alt: "",
    placeholder: require("../../../assets/images/networks/normal/icon_default.png")
  };
}

export default Image;
