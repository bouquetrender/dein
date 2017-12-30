import React, { Component } from "react";
import pureRender from "../utils/immutable-pure-render-decorator";

@pureRender
export default class ShowName extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { content } = this.props;
    return (
      <div>
        {content}
      </div>
    );
  }
}
