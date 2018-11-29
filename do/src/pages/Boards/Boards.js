import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import './Boards.css';

import BoardCard from '../../components/BoardCard';
import BoardHeader from '../../components/BoardHeader';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

const GET_BOARDS = gql`
  {
    getAllBoards {
      name
      shortid
      color
    }
  }
`;

class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static Section = ({boards}) => (
    <div className="section">
      <Boards.SectionHeader icon='trellian' name='Personal Boards' />
      <Boards.BoardsList boards={boards} />
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

  static BoardsList = ({boards}) => (
    <div className='boards-list'>
      {boards.map(b => (
        <BoardCard key={'b-' + b.name} {...b} />
      ))}
    </div>
  );

  static Render = ({boards}) => (
    <div className='boards-sections'>
      <Boards.Section boards={boards} />
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

  render () {
    let { boards } = this.props;

    return (
      <div className='boards-page'>
        <BoardHeader backgroundColor='#026aa7' />
        <div className='content'>
          {boards.loading && <Boards.RenderLoading />}
          {!boards.loading && <Boards.Render boards={boards.getAllBoards} />}
          {/* {!boards.loading && this.renderBoards({boards: boards.getAllBoards})} */}
        </div>
      </div>
    );
  };
};

export default graphql(GET_BOARDS, {
  name: 'boards'
})(Boards);
