import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './Form.css';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  static Title = ({title, linkSubtext, linkTitle, href}) => (
    <div className="form-title">
      <span className="title">{title}</span>
      {linkTitle && <span className="subtitle">{linkSubtext}<a href={href}>{linkTitle}</a></span>}
    </div>
  );

  static Input = ({state, type, label, placeholder, onChange, name}) => (
    <div className="form-input-wrapper">
      <label>{label}</label>
      <input type={type} placeholder={placeholder} name={name} value={state[name]} onChange={(e) => onChange(e)} />
    </div>
  );

  static SubmitButton = ({title}) => (
    <div className="form-submit-button-wrapper">
      <button className="form-submit-button" type="submit">{title}</button>
    </div>
  );

  handleInputOnChange = (e) => {
    let updatedState = {};
    updatedState[e.target.name] = e.target.value;

    this.setState({...updatedState});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { onSubmit } = this.props;

    onSubmit({...this.state});
  }

  render() {

    return (
      <form className="form" onSubmit={(e) => this.handleSubmit(e)}>
        {React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
                state: this.state,
                onChange: this.handleInputOnChange
            }),
        )}
      </form>
    );
  }
};

Form.propTypes = {

};

Form.defaultProps = {

};