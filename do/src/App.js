import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
// import { Client } from './apollo';
import { ApolloProvider } from 'react-apollo';

import Routes from './Routes';
import Boards from './pages/Boards';
import Board from './pages/Board';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const client = new ApolloClient({
  uri: `http://localhost:3009/graphql`,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

const routes = [
  {
    path: '/boards',
    component: Boards,
    exact: true,
  }, {
    path: '/b/:boardId',
    component: Board,
    exact: false,
  }, {
    path: '/login',
    component: Login,
    exact: true,
  }, {
    path: '/signup',
    component: SignUp,
    exact: true,
  }
];

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Routes routes={routes} />
      </ApolloProvider>
    );
  }
}

export default App;
