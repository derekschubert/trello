import React, { Component } from 'react';
import './Modal.css';

import UserIcon from '../UserIcon';
import Button from '../Button';
import Icon from '../Icon';

/* eslint jsx-a11y/anchor-is-valid: 0  */

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { listener: false }
  }

  static Header = ({ title, closeModal, titleStyle }) => {
    return (
      <React.Fragment>
        <div className="modal-header">
          <span style={titleStyle && { ...titleStyle }}>{title}</span>
          <Button icon="close"
            iconColor="#6b808c"
            background="none"
            iconMaskPosition="center"
            iconSize="16px"
            onClick={closeModal}
            width="32px"
            height="32px" />
        </div>
        <Modal.Divider />
      </React.Fragment>
    );
  };

  static Divider = (props) => (
    <div className="modal-divider">
      <div className="border"></div>
    </div>
  );

  static Section = (props) => (
    <React.Fragment>
      <div className="modal-section">
        {props.children}
      </div>
      <Modal.Divider />
    </React.Fragment>
  );

  static MenuSection = (props) => (
    <React.Fragment>
      <div className="modal-menu-section">
        {props.children}
      </div>
    </React.Fragment>
  );

  static Column = (props) => (
    <div className="modal-column" style={props.extraStyles}>
      {props.children}
    </div>
  );

  static Row = (props) => (
    <div className="modal-row" style={props.extraStyles}>
      {props.children}
    </div>
  );

  static Button = ({ title, subtitle, onClick }) => (
    <button onClick={onClick} className="modal-button">
      {title} {subtitle && <span className="subtitle">{subtitle}</span>}
    </button>
  );

  static Footer = (props) => (
    <div className="modal-footer">
      {props.children}
    </div>
  );

  static Input = ({ label, value, placeholder }) => (
    <div className="modal-input">
      {label && <label>{label}</label>}
      <input type="text"
        placeholder={placeholder}
        value={value}
        onChange={() => {
          // Need to do stuff here later...
        }}
      />
    </div>
  );

  static TextArea = ({ value }) => (
    <textarea value={value} onChange={() => { }}></textarea>
  );

  static DetailedButton = (props) => (
    <button className="modal-detailed-button">
      <div className="button-title">
        {props.icon && <Icon icon={props.icon} maskPosition="center" size="16px" maskSize="16px" backgroundColor={props.color} />}
        <span className="title">{props.title}</span>
      </div>
      <span>{props.description}</span>
    </button>
  );

  static ImageButton = ({ title, children }) => (
    <div className="modal-image-button">
      {children}
      <span className="image-button-title">{title}</span>
    </div>
  );

  static Image = ({ src }) => (
    <img className="modal-image" src={src} alt='' />
  );

  static MiniProfile = ({ initials, name, username, canEdit, closeModal }) => (
    <div className="modal-mini-profile">
      <UserIcon user={{ initials, name, username }} diameter="50px" extraStyles={{ fontSize: "16px" }} />
      <div className="info">
        <a href={`/u/${username}`} className="name">{name}</a>
        <span className="username">@{username}</span>
        {canEdit && <a className="edit-profile" href="#">Edit profile info</a>}
      </div>
      <Button icon="close"
        iconColor="#6b808c"
        background="none"
        iconMaskPosition="center"
        iconSize="16px"
        onClick={closeModal}
        width="32px"
        height="32px" />
    </div>
  );

  componentDidUpdate = () => {
    let { open } = this.props;
    let { listener } = this.state;

    if (open && !listener) {
      document.addEventListener('mousedown', this.handleFocusClick, false);
      this.setState({ listener: true });
    } else if (!open && listener) {
      document.removeEventListener('mousedown', this.handleFocusClick, false);
      this.setState({ listener: false });
    }
  }

  componentWillUnmount = () => {
    let { listener } = this.state;

    if (listener) {
      document.removeEventListener('mousedown', this.handleFocusClick, false);
      this.setState({ listener: false });
    }
  }

  handleFocusClick = (e) => {
    if (!this.modal.contains(e.target)) {
      this.props.closeModal();
    }
  }

  determineStyle = () => {
    let { width, height, position, setLocation } = this.props;

    if (setLocation) {
      return {
        width,
        top: position.top,
        right: position.right,
        bottom: position.bottom
      }
    } else {

      let top = position.y + position.height + 6;
      let left = position.x;

      let widthNum = width.includes("px") ? width.slice(0, width.length - 2) : console.error("WIDTH CONVERSION NOT HANDLED IN MODAL.");
      widthNum = parseInt(widthNum);

      // don't allow modal to go off screen on horizontal axis
      // give at least 6px of margin to edge
      let modalEndX = widthNum + left + 6;
      if (modalEndX > window.innerWidth) {
        let difference = modalEndX - window.innerWidth;
        left -= difference;
      }

      return {
        width,
        height,
        top,
        left
      };
    }
  }

  determineClassNames = () => {
    let { className } = this.props;

    if (className) {
      return "modal " + className;
    } else {
      return "modal";
    }
  }

  render() {
    let { open, position, setLocation } = this.props;

    if ((open && position.y) || (open && setLocation)) {
      return (
        <div className={this.determineClassNames()}
          style={this.determineStyle()}
          ref={modal => this.modal = modal}
        >
          {React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
              closeModal: this.props.closeModal
            }),
          )}
        </div>
      );
    } else {
      return null;
    }
  }
}