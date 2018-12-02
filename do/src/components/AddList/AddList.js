import React, { Component } from 'react';
import './AddList.css';

import Button from '../Button';
import Icon from '../Icon';

/* eslint jsx-a11y/anchor-is-valid: 0  */

export default class AddList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      listener: false,
      hover: false,
      listNameValue: '',
    };
  }

  componentDidUpdate = () => {
    let { active, listener } = this.state;

    if (active && !listener) {
      document.addEventListener('mousedown', this.handleFocusClick, false);
      this.setState({ listener: true });
    } else if (!active && listener) {
      document.removeEventListener('mousedown', this.handleFocusClick, false);
      this.setState({ listener: false });
    }
  }

  componentWillUnmount = () => {
    if (this.state.listener) {
      document.removeEventListener('mousedown', this.handleFocusClick, false);
    }
  }


  handleInputChange = (e) => {
    let { name, value } = e.target;
    let updatedState = {};

    updatedState[name] = value;
    this.setState({ ...updatedState });
  }

  handleHover = (isHovering) => {
    let { active } = this.state;

    if (!active) {
      this.setState({ hover: isHovering });
    }
  }

  handleFocusClick = (e) => {
    if (!this.node.contains(e.target)) {
      this.handleActive(false);
    }
  }

  handleActive = (isActive) => {
    if (isActive) {
      this.setState({ active: true, hover: false }, () => {
        this.focusInput.focus();
      });
    } else {
      this.setState({ active: false, hover: false });
    }
  }

  determineInactiveStlye = () => {
    let { hover } = this.state;

    let hoverStyle = {
      backgroundColor: "rgba(0, 0, 0, .24)"
    };

    let defaultStyle = {
      backgroundColor: "rgba(0, 0, 0, .12)"
    };

    return hover ? hoverStyle : defaultStyle;
  }

  renderInactive = () => {
    return (
      <a href="#"
        style={this.determineInactiveStlye()}
        className="add-list"
        onMouseEnter={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}
        onClick={() => this.handleActive(true)}
      >
        <Icon icon="plus" maskPosition="center" maskSize="16px" backgroundColor="rgba(255, 255, 255, 0.8)" />
        <span>Add another list</span>
      </a>
    );
  }

  renderActive = () => {
    return (
      <form className="adding-list"
        ref={node => this.node = node}
      >
        <input type="text"
          name="listNameValue"
          placeholder="Enter list title..."
          ref={focusInput => this.focusInput = focusInput}
          value={this.state.listNameValue}
          onChange={(e) => this.handleInputChange(e)}
        />
        <div className="controls">
          <Button name="Add List" 
            onClick={() => this.props.handleAddList(this.state.listNameValue)} 
            width="auto" 
            type='submit'
            className="add" 
            background="#5aac44" 
            hoverColor="#519839" />
          <Button 
            icon="close" 
            className="close" 
            iconColor="#798d99" 
            background="none" />
        </div>
      </form>
    );
  }

  render() {
    let { active } = this.state;

    if (active) {
      return this.renderActive();
    } else {
      return this.renderInactive();
    }
  }
}