import React from "react";
import "./Dropdown.scss";
import PropTypes from "prop-types";

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  componentWillMount() {
    document.addEventListener("click", this.toggleVisibility, false);
  }

  toggleVisibility(e) {
    const dropdown_content = document.querySelector(".dropdown__content");
    const dropdown = document.querySelector(".dropdown__user-icon");
    if (
      (!e.path.includes(dropdown_content) && this.state.isOpen) ||
      dropdown === e.target
    ) {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }

  render() {
    return (
      <div className="dropdown">
        <i
          className={`icon icon-user icon-32 dropdown__user-icon ${
            this.state.isOpen ? "dropdown__user-icon_flip" : null
          }`}
        />
        {this.state.isOpen ? (
          <div className="dropdown__content">{this.props.children}</div>
        ) : null}
      </div>
    );
  }
}
Dropdown.propTypes = {
  children: PropTypes.element
};
