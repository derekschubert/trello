import React, { Component } from 'react';
// import { gql } from 'apollo-boost';
// import { Query } from 'react-apollo';
import './Login.css';

import Form from '../../components/Form';

// API Calls
// const LOGIN_USER = gql`
//   {
//     query getUser {
//       username
//     }
//   }
// `;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleFormSubmit = (data) => {
    console.group("Form Submitted");
    console.log(data);
    console.log(this.props.query);
    console.groupEnd();

  }
  
  render() {
    return (
      <div className="login">
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Title title="Log in to Trello" linkSubtext="or " linkTitle="create an account" href="/signup" />
          <Form.Input label="Email" name="email" placeholder="e.g., derek@starbound.digital" type="email" />
          <Form.Input label="Password" name="password" placeholder="e.g., ••••••••••••" type="password" />
          <Form.SubmitButton title="Log In" />
        </Form>
      </div>
    );
  }
};

export default Login;

// export default graphql(query, {
//   name: 'query'
// })(Login);

