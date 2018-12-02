import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { compose, graphql, Query, Mutation } from 'react-apollo';
import './Board.css';

// Components
import List from '../../components/List';
import AddList from '../../components/AddList';
import BoardHeader from '../../components/BoardHeader';
import BoardSubHeader from '../../components/BoardSubHeader';
import CardDetails from '../../components/CardDetails';
import MenuModal from '../../components/Modal/MenuModal';

// GraphQL Queries and Mutations
import { GET_BOARD } from '../../graphql/query.js';
import { MOVE_CARD, UPDATE_LISTS } from '../../graphql/mutation.js';

let updateListsMutation;

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: {},
      showCardDetails: false,
      showMenu: false,
      gotBoardData: false,
    };
  }

  onBoardFetched = (board) => {
    this.setState(() => ({...board, gotBoardData: true}));
  }

  cleanMutationObjects = (listOfObjects) => {
    let out = [];
    listOfObjects.forEach((o) => {
      let o2 = {};
      for (let prop in o) {
        if (prop !== '__typename') o2[prop] = o[prop];
      }
      out.push(o2);
    });
    return out;
  }

  updateState = (data) => {
    this.setState({ ...data });
  }

  onDragStart = () => {
  }

  onDragUpdate = () => {

  }

  onDragEnd = item => {
    const boardId = this.state.shortid;

    // Ensure drag is legal
    if (item && 
      item.hasOwnProperty('source') && item.source && item.source.hasOwnProperty('index') &&
      item.hasOwnProperty('destination') && item.destination && item.destination.hasOwnProperty('index')
    ) {
      if (item.type === 'card') {
        this.handleCardDrag(item, boardId);
      } else if (item.type === 'list') {
        this.handleListDrag(item, boardId);
      } 
    }
    console.groupEnd();
  }

  handleListDrag = (item, boardId) => {
    console.group('List Drag');
  
    if (item.source.index === item.destination.index) return;
    console.log(`Index ${item.source.index} -> ${item.destination.index}`);

    let newListOrder = this.state.listOrder.filter(l => l !== item.draggableId);
    newListOrder.splice(item.destination.index, 0, item.draggableId);

    this.setState({
      listOrder: newListOrder
    });
    console.log('Board Id:', boardId);
    
    let isSuccess = updateListsMutation({variables: {
      boardId,
      listOrder: newListOrder,
    }});

    console.groupEnd();
  }

  handleCardDrag = (item, boardId) => {
    console.group('Card Drag');
    console.log(item);
    console.log(`ListID: Position | ${item.source.droppableId}: ${item.source.index} -> ${item.destination.droppableId}: ${item.destination.index}`);

    let sourceList = this.state.lists.filter(l => l.shortid === item.source.droppableId)[0];
    let lists = [];

    // Determine if we are dropping item in same list, or new
    if (item.destination.droppableId === item.source.droppableId) {
      // If same list, and same position, no need to update
      if (item.destination.index === item.source.index) return;
      console.log('Card moved to different index in same list.');

      // Move the ID in cardOrder array to the correct position, 
      let newSourceCardOrder = sourceList.cardOrder.filter(c => c !== item.draggableId);
      newSourceCardOrder.splice(item.destination.index, 0, item.draggableId);
      sourceList.cardOrder = newSourceCardOrder;

      // Grab all Board Lists except for our edited list,
      // Then insert the edited list
      lists = this.state.lists.filter(l => l.shortid !== sourceList.shortid);
      lists.push(sourceList);
    } else {
      console.log('Card moved to new list');
      let destinationList = this.state.lists.filter(l => l.shortid === item.destination.droppableId)[0];

      const newSourceCardOrder = sourceList.cardOrder.filter(c => c !== item.draggableId);
      destinationList.cardOrder.splice(item.destination.index, 0, item.draggableId);

      sourceList.cardOrder = newSourceCardOrder;

      lists = this.state.lists.filter(l => 
        l.shortid !== sourceList.shortid && l.shortid !== destinationList.shortid
      );

      lists.push(sourceList, destinationList);
    }

    // Clean list objects from _typeface
    lists = this.cleanMutationObjects(lists);

    // Update state and update server
    this.setState({lists});
    let isSuccess = updateListsMutation({variables: {
      boardId,
      lists: lists,
    }});

    console.log(isSuccess);
    console.groupEnd();

    return isSuccess;
  }

  handleToggleMenu = (showMenu) => {
    this.setState({ showMenu });
  }

  handleCardClick = (card) => {
    this.setState({
      activeCard: card,
      showCardDetails: true
    });
  }

  handleCloseCardDetails = () => {
    this.setState({
      showCardDetails: false
    })
  }

  renderLists = () => {
    let { cards, lists, listOrder } = this.state;
    let orderedLists = [];

    listOrder.forEach(id => {
      orderedLists.push(
        lists.filter(l => l.shortid === id)[0]
      );
    });

    return orderedLists.map((list, index) => {
      return (
        <List
          list={list}
          position={index}
          cards={cards}
          key={"list-" + list.shortid}
          onCardClick={this.handleCardClick} />
      );
    });
  }

  render() {
    let { activeCard, showCardDetails, showMenu } = this.state;
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <div className="board">
          <BoardHeader />

          <Query query={GET_BOARD} variables={{id: this.props.location.pathname.split('/b/')[1]}}>
            {({loading, error, data, client}) => {
              if (error) throw error;
              if (!this.state.gotBoardData && !loading) this.onBoardFetched(data.getBoard);
              if (loading || !this.state.gotBoardData) return <div className='board-loading' />;

              console.log('State:', this.state);
              let { name, team, visibility } = this.state;

              return (
                <Mutation mutation={UPDATE_LISTS}>
                  {(updateLists) => {
                    updateListsMutation = updateLists;

                    return (
                      <React.Fragment>
                        <BoardSubHeader title={name}
                          team={team}
                          visibility={visibility}
                          openMenu={() => this.handleToggleMenu(true)} />
                        <div className="content-wrapper">
                          <Droppable droppableId="board-droppable" type="list" direction="horizontal">
                            {(provided, snapshot) => (
                              <div className="content"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                {this.renderLists()}
                                {provided.placeholder}
                                <AddList />
                              </div>
                            )}
                          </Droppable>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </Mutation>
              );
            }}
          </Query>

          <CardDetails closeCardDetails={this.handleCloseCardDetails} card={activeCard} open={showCardDetails} />
          <MenuModal open={showMenu} closeModal={() => this.handleToggleMenu(false)} />
        </div>
      </DragDropContext>
    );
  }
}

// export default compose(
//   graphql(getBoard, {
//     options: (props) => {
//       const path = props.location.pathname.split('/b/')[1];
//       return {
//         variables: {
//           id: path
//         },
//         onCompleted: data => {
//           console.log(data);
//         },
//         onError: data => console.err(data),
//       }
//     }
//   }),
//   graphql(moveCard, { name: 'moveCard' }),
// )(Board);

// export default graphql(getBoard, {
//     options: (props) => {
//         const path = props.location.pathname.split('/b/')[1];
//         return {
//             variables: {
//                 id: path
//             }
//         }
//     }
// })(Board);

export default Board;
