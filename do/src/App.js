import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Board from './pages/Board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path="/b/" component={Board} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
