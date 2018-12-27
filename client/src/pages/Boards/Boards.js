import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql, Query } from 'react-apollo';
import './Boards.css';

import BoardCard from '../../components/BoardCard';
import CreateNewBoard from '../../components/CreateNewBoard';
import AddBoard from '../../components/AddBoard';
import BoardHeader from '../../components/BoardHeader';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

import { GET_BOARDS } from '../../graphql/query';

class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createNewBoardIsActive: false,
    };
  }

  static Section = ({boards, createNewBoard}) => (
    <div className="section">
      <Boards.SectionHeader icon='trellian' name='Personal Boards' />
      <Boards.BoardsList boards={boards} createNewBoard={createNewBoard} />
    </div>
  );

  static SectionHeader = ({ icon, name }) => (
    <div className="section-header">
      <Icon icon={icon} maskPosition='center' backgroundColor='#798d99' maskSize='20px' size='20px' />
      <span className="title">{name}</span>
    </div>
  );

  static SectionHeaderButtons = ({teamid}) => (
    <div className='section-header-buttons'>
      <Button background="light" href="/boards" name="Boards" icon="trelloicon" width="90px" />
      <Button background="light" href="/boards" name="Members" icon="trelloicon" width="90px" />
      <Button background="light" href="/boards" name="Settings" icon="trelloicon" width="90px" />
    </div>
  );

  static BoardsList = ({boards, createNewBoard}) => (
    <div className='boards-list'>
      {boards.map(b => (
        <BoardCard key={'b-' + b.name} {...b} />
      ))}
      <AddBoard createNewBoard={createNewBoard} />
    </div>
  );

  static Render = ({boards, createNewBoard}) => (
    <div className='boards-sections'>
      <Boards.Section boards={boards} createNewBoard={createNewBoard}/>
    </div>
  );

  static RenderLoading = () => (
    <div className='boards-loading'>
      <div className='loader'>
          <div className='outer'></div>
          <div className='middle'></div>
      </div>
    </div>
  );

  handleCreateNewBoard = (active) => {
    this.setState({createNewBoardIsActive: active});
  }

  render () {
    return (
      <Query query={GET_BOARDS}>
        {({error, loading, data}) => {
          console.log('Query data:', data);

          if (error) throw error;
          else return (
            <div className='boards-page'>
              <BoardHeader backgroundColor='#026aa7' />
              <div className='content'>
                {loading && <Boards.RenderLoading />}
                {!loading && <Boards.Render boards={data.getAllBoards} createNewBoard={this.handleCreateNewBoard} />}
                {this.state.createNewBoardIsActive && <CreateNewBoard close={() => this.handleCreateNewBoard(false)} />}
              </div>
            </div>
          );
        }}
      </Query>
    );
  };
};

export default Boards;
