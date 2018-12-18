import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import nanoid from 'nanoid';
import './CreateNewBoard.css';

import Icon from '../Icon';
import Button from '../Button';

import { CREATE_BOARD } from '../../graphql/mutation.js';

let createBoardMutation;

class CreateNewBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      team: '',
      color: 'rgb(0, 121, 191)',
      visibility: '',
      selectedBackground: 0,
      listener: false,
    };
  }

  Backgrounds = ({selected, handlerOnClick}) => {
    const colors = [
      'rgb(0, 121, 191)', 'rgb(210, 144, 52)', 'rgb(81, 152, 57)',
      'rgb(176, 70, 50)', 'rgb(137, 96, 158)', 'rgb(205, 90, 145)',
      'rgb(75, 191, 107)', 'rgb(0, 174, 204)', 'rgb(131, 140, 145)',
    ];

    return colors.map((c, i) => (
      <div key={i} 
        className='option'
        style={{ backgroundColor: c }}
        onClick={() => handlerOnClick(c, i)}
      >
        {i === selected && 
          <Icon icon='check'
            size='28px'
            maskSize='18px'
            backgroundColor='white'
            maskPosition='50% 50%' />
        }
        <div className='hover-overlay'></div>
      </div>
    ));
  };

  handleCreateBoard = async () => {
    let shortid = nanoid(8);
    let isSuccess = await createBoardMutation({variables: {
      name: this.state.title,
      color: this.state.color,
      owner: '1',
      teamid: '1',
      shortid,
    }});    

    console.log('Creating new board:', isSuccess);
    this.props.history.push(`/b/${shortid}`);
  }

  handleBackgroundSelected = (color, selectedBackground) => {
    this.setState({ color, selectedBackground });
  }

  handleInputChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleFocusClick = (e) => {
    if (!this.modal.contains(e.target)) {
      this.props.close();
    }
  }

  componentDidMount = () => {
    let { listener } = this.state;

    if (!listener) {
      document.addEventListener('mousedown', this.handleFocusClick, false);
      this.setState({ listener: true });
    }
  }

  componentWillUnmount = () => {
    let { listener } = this.state;

    if (listener) {
      document.removeEventListener('mousedown', this.handleFocusClick, false);
      this.setState({ listener: false });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Mutation mutation={CREATE_BOARD}>
          {(createBoard) => {
            createBoardMutation = createBoard;

            return (
              <div className='create-new-board' ref={modal => this.modal = modal}>
                <div className='board-fields'
                  style={{ backgroundColor: this.state.color }}
                >
                  <input type='text'
                    placeholder='Add board title'
                    name='title'
                    onChange={(e) => this.handleInputChange(e)}
                    value={this.state.title}
                  />
                </div>
                <div className='board-background'>
                  <this.Backgrounds
                    selected={this.state.selectedBackground}
                    handlerOnClick={this.handleBackgroundSelected}
                  />
                </div>
                <div className='create-board'>
                  <Button width='112px'
                    background='#5aac44'
                    hoverColor='#519839'
                    onClick={this.handleCreateBoard}
                    name='Create Board'
                    color='#fff' />
                </div>
              </div>
            );
          }}
        </Mutation>
        <div className='create-new-board-background-overlay'></div>
      </React.Fragment>
    );
  }
};

export default withRouter(CreateNewBoard);