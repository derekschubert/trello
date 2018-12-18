import React from 'react';
import { Query } from 'react-apollo';
import { GET_BOARD } from '../../graphql/query.js';

import BoardContent from './BoardContent';

const Board = (props) => (
  <Query query={GET_BOARD} variables={{id: props.location.pathname.split('/b/')[1]}}>
    {({loading, error, data, client}) => {
      if (error) throw error;
      if (loading) return <div className='board-loading' />;
      if (!loading) return <BoardContent board={data.getBoard}  />
    }}
  </Query>
);

export default Board;
