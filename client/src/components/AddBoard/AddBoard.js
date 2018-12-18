import React from 'react';
import './AddBoard.css';

const AddBoard = (props) => {
  // pass in Team value props into onClick (for presetting Create New Board)
  return (
    <React.Fragment>
      <div className="board-card create-board-card" onClick={() => props.createNewBoard(true)}>
        <span>Create new board...</span>
      </div>
    </React.Fragment>
  );
};

export default AddBoard;