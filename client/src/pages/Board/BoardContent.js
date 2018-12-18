import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Mutation } from 'react-apollo';
import nanoid from 'nanoid';
import './Board.css';

// Components
import List from '../../components/List';
import AddList from '../../components/AddList';
import BoardHeader from '../../components/BoardHeader';
import BoardSubHeader from '../../components/BoardSubHeader';
import CardDetails from '../../components/CardDetails';
import MenuModal from '../../components/Modal/MenuModal';

// GraphQL Queries and Mutations
import { UPDATE_LISTS, DELETE_BOARD, UPDATE_BOARD_NAME } from '../../graphql/mutation.js';

let updateListsMutation, deleteBoardMutation, updateBoardNameMutation;

class Board extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activeCard: {},
      showCardDetails: false,
      showMenu: false,
      boardName: props.board.name,
      ...props.board,
    };
  }

  onBoardFetched = (board) => {
    this.setState(() => ({ ...board, gotBoardData: true }));
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

  onDragStart = () => {
  }

  onDragUpdate = () => {

  }

  onDragEnd = async (item) => {
    const boardId = this.state.shortid;

    // Ensure drag is legal
    if (item &&
      item.hasOwnProperty('source') && item.source && item.source.hasOwnProperty('index') &&
      item.hasOwnProperty('destination') && item.destination && item.destination.hasOwnProperty('index')
    ) {
      let status = '';

      if (item.type === 'card') {
        status = await this.handleCardDrag(item, boardId);
      } else if (item.type === 'list') {
        status = await this.handleListDrag(item, boardId);
      }

      console.log(`${item.type} Drag: ${status}`);
    }
  }

  generateUID = () => {
    return nanoid(8);
  }

  createList = ({ name, cardOrder, color }) => {
    let list = {};

    if (name) list.name = name;
    if (cardOrder) list.cardOrder = cardOrder;
    if (color) list.color = color;
    list.shortid = this.generateUID();

    return list;
  }

  createCard = ({ name }) => {
    return {
      name,
      shortid: this.generateUID(),
      description: '',
    };
  }

  handleAddCard = async (listId, cardTitle) => {
    if (cardTitle !== '') {
      const boardId = this.state.shortid;

      let newCard = this.createCard({ name: cardTitle });
      const cards = this.cleanMutationObjects([...this.state.cards, newCard]);
      let lists = this.cleanMutationObjects([...this.state.lists]);

      let updatedList = lists.filter(l => l.shortid === listId)[0];
      lists = lists.filter(l => l.shortid !== listId);

      updatedList.cardOrder.push(newCard.shortid);
      lists.push(updatedList);


      this.setState({
        lists,
        cards,
      });

      let isSuccess = await updateListsMutation({
        variables: {
          boardId,
          lists,
          cards,
        }
      });

      console.log('Create card:', isSuccess.data);
    }
  }

  handleAddList = async (listTitle) => {
    if (listTitle !== '') {
      const boardId = this.state.shortid;
      let newList = this.createList({
        name: listTitle,
        cardOrder: [],
        color: 'rgb(223, 227, 230)',
      });

      const lists = this.cleanMutationObjects([...this.state.lists, newList]);
      const listOrder = [...this.state.listOrder, newList.shortid];

      this.setState({
        lists,
        listOrder,
      });

      let isSuccess = await updateListsMutation({
        variables: {
          boardId,
          lists,
          listOrder,
        }
      });

      console.log('Create list:', isSuccess.data);
    }
  }

  helperNameMutations = ({ id, name, array }) => {
    let newObject = array.find(o => o.shortid === id);
    let others = array.filter(o => o.shortid !== id);

    if (newObject.name === name || name.length < 1) return false;

    newObject.name = name;
    return this.cleanMutationObjects([ ...others, newObject ]);
  }
  
  handleListNameMutation = async (listid, name) => {
    let lists = this.helperNameMutations({
      id: listid,
      name,
      array: this.state.lists,
    });

    if (lists === false) return;

    let isSuccess = await updateListsMutation({
      variables: {
        boardId: this.state.shortid,
        lists,
      },
    });

    console.log('List Name Updated: ', isSuccess.data);
  }

  handleCardNameMutation = async ({ cardId, name }) => {
    let cards = this.helperNameMutations({
      id: cardId,
      name,
      array: this.state.cards,
    });

    if (cards === false) return;

    let isSuccess = await updateListsMutation({
      variables: {
        boardId: this.state.shortid,
        cards,
      },
    });

    console.log('Card name updated:', isSuccess.data);
  };

  handleListDrag = async (item, boardId) => {
    if (item.source.index === item.destination.index) return;

    let newListOrder = this.state.listOrder.filter(l => l !== item.draggableId);
    newListOrder.splice(item.destination.index, 0, item.draggableId);

    this.setState({
      listOrder: newListOrder
    });

    let isSuccess = await updateListsMutation({
      variables: {
        boardId,
        listOrder: newListOrder,
      }
    });

    return isSuccess.data.updateLists;
  }

  handleCardDrag = async (item, boardId) => {
    let sourceList = this.state.lists.filter(l => l.shortid === item.source.droppableId)[0];
    let lists = [];

    // Determine if we are dropping item in same list, or new
    if (item.destination.droppableId === item.source.droppableId) {
      // Card dropped in same list
      // If same list && same position, no need to update
      if (item.destination.index === item.source.index) return;

      // Move the ID in cardOrder array to the correct position, 
      let newSourceCardOrder = sourceList.cardOrder.filter(c => c !== item.draggableId);
      newSourceCardOrder.splice(item.destination.index, 0, item.draggableId);
      sourceList.cardOrder = newSourceCardOrder;

      // Grab all Board Lists except for our edited list,
      // Then insert the edited list
      lists = this.state.lists.filter(l => l.shortid !== sourceList.shortid);
      lists.push(sourceList);
    } else {
      // Card dropped to new list
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
    this.setState({ lists });
    let isSuccess = await updateListsMutation({
      variables: {
        boardId,
        lists: lists,
      }
    });

    console.log('Is Success?:', isSuccess);
    return isSuccess.data.updateLists;
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
    const actions = {
      deleteList: async (listId) => {
        console.log('Delete!');
        let lists = this.state.lists.filter(l => l.shortid !== listId);;
        let listOrder = this.state.listOrder.filter(id => id !== listId);

        this.setState({ lists, listOrder });
        let isSuccess = await updateListsMutation({
          variables: {
            boardId: this.state.shortid,
            lists: this.cleanMutationObjects(lists),
            listOrder,
          }
        });

        console.log('Delete list:', isSuccess.data);
      },
    };

    listOrder.forEach(id => {
      orderedLists.push(
        lists.filter(l => l.shortid === id)[0]
      );
    });

    return orderedLists.map((list, index) => {
      return (
        <List
          actions={actions}
          list={list}
          position={index}
          cards={cards}
          key={"list-" + list.shortid}
          handleListNameMutation={this.handleListNameMutation}
          handleAddCard={this.handleAddCard}
          onCardClick={this.handleCardClick} />
      );
    });
  }

  cardDetailsActions = {
    buttons: {
      deleteCard: async ({ cardId, listId, }) => {
        let listToUpdate = this.state.lists.filter(l => l.shortid === listId)[0];
        let lists = this.state.lists.filter(l => l.shortid !== listId);
        let cards = this.state.cards.filter(c => c.shortid !== cardId);
        listToUpdate.cardOrder = listToUpdate.cardOrder.filter(id => id !== cardId);

        lists = this.cleanMutationObjects([...lists, listToUpdate]);
        cards = this.cleanMutationObjects(cards);

        this.setState({
          lists,
          cards,
          showCardDetails: false,
        });

        let isSuccess = await updateListsMutation({
          variables: {
            boardId: this.state.shortid,
            lists,
            cards,
          }
        });

        console.log('Delete card: ', isSuccess.data);
      },
    },
    handleCardNameMutation: this.handleCardNameMutation,
  };

  menuActions = () => ({
    deleteBoard: async () => {
      let boardId = this.state.shortid;

      let isSuccess = await deleteBoardMutation({
        variables: {
          boardId,
        },
      });
      
      console.log('Delete board: ', isSuccess.data);
      if (isSuccess.data.deleteBoard === 'success') this.props.history.push('/boards');
    }
  });

  modalActions = () => ({
    subHeader: {
      boardTitle: {
        handleBoardNameChange: (e) => {
          this.setState({ boardName: e.target.value });
        },
        handleBoardNameMutation: async () => {
          if (this.state.name === this.state.boardName || this.state.boardName.length < 1) return;
          
          let isSuccess = await updateBoardNameMutation({
            variables: {
              boardId: this.state.shortid,
              name: this.state.boardName,
            }
          });

          this.setState({ name: this.state.boardName });

          console.log('Board name updated:', isSuccess.data);
        },
      },
    },
  });

  render() {
    let { activeCard, showCardDetails, showMenu } = this.state;
    let { team, visibility } = this.state;

    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}>
        <div className="board">
          <BoardHeader />
          <Mutation mutation={UPDATE_LISTS}>
            {(updateLists) => {
              updateListsMutation = updateLists;

              return (
                <Mutation mutation={UPDATE_BOARD_NAME}>
                  {(updateBoardName) => {
                    updateBoardNameMutation = updateBoardName;

                    return (
                      <Mutation mutation={DELETE_BOARD}>
                        {(deleteBoard) => {
                          deleteBoardMutation = deleteBoard;

                          return (
                            <React.Fragment>
                              <BoardSubHeader title={this.state.name}
                                tempTitle={this.state.boardName}
                                team={team}
                                actions={this.modalActions().subHeader}
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
                                      <AddList handleAddList={this.handleAddList} />
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
                </Mutation>
              );
            }}
          </Mutation>
          <CardDetails closeCardDetails={this.handleCloseCardDetails}
            card={activeCard}
            open={showCardDetails}
            actions={this.cardDetailsActions} />
          <MenuModal actions={this.menuActions()} open={showMenu} closeModal={() => this.handleToggleMenu(false)} />
        </div>
      </DragDropContext>
    );
  }
}

export default withRouter(Board);
