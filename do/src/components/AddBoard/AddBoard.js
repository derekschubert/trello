import React, { Component } from 'react';
import './AddBoard.css';

import CreateNewBoard from './CreateNewBoard';

export default class AddBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  handleActive = (active) => {
    this.setState({ active });
  }

  render() {
    return (
      <React.Fragment>
        <div className="board-card create-board-card" onClick={() => this.handleActive(true)}>
          <span>Create new board...</span>
        </div>
        {this.state.active && <CreateNewBoard team={this.props.team} />}
      </React.Fragment>
    );
  }
};