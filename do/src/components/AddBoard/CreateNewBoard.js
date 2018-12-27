import React, { Component } from 'react';
import './CreateNewBoard.css';

import Icon from '../Icon';
import Modal from '../Modal';

export default class CreateNewBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      // team: props.team,
      team: '',
      visibility: '',
      background: '',
    };
  }

  static Select = ({title, options, icon}) => {
    return (
      <React.Fragment>
        <div className='create-new-board-select'>
          {/* {icon && <Icon />} */}
          <span className='title'>{title}</span>
          {/* <Icon /> */}
        </div>
        {/* <Modal>

        </Modal> */}
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className='create-new-board'>
        <div className='board-fields'>
          <input type='text' 
            placeholder='Add board title' 
            name='title' 
            value={this.state.title} />
          <CreateNewBoard.Select title={this.state.team} 
            options={[]} />
          <CreateNewBoard.Select icon={'team'} 
            title={this.state.visibility} 
            options={[]} />
        </div>
        <div className='board-background'>
        
        </div>
        <div className='create-board'>
        
        </div>
      </div>
    );
  }
};