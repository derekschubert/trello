import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import './SignUp.css';

import Form from '../../components/Form/Form';

// API Calls
const query = gql`
  {
    getAllUsers {
      username
    }
  }
`;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleFormSubmit = (data) => {
    data.preventDefault();
    console.group("Form Submitted");
    console.log(data);
    console.log(this.props.query);
    console.groupEnd();
  }
  
  render() {
    return (
      <div className="signup">
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Title title="Create a new Trello account" linkSubtext="or " linkTitle="log in to an existing account" href="/login" />
          <Form.Input label="First Name" name="first_name" placeholder="Derek" type="text" />
          <Form.Input label="Last Name" name="last_name" placeholder="Schubert" type="text" />
          <Form.Input label="Email" name="email" placeholder="e.g., derek@starbound.digital" type="email" />
          <Form.Input label="Password" name="password" placeholder="e.g., ••••••••••••" type="password" />
          <Form.Input label="Confirm Password" name="c_password" placeholder="e.g., ••••••••••••" type="password" />
          <Form.SubmitButton title="Sign Up" />
        </Form>
      </div>
    );
  }
};

export default graphql(query, {
  name: 'query'
})(SignUp);