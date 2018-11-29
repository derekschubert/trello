import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { compose, graphql } from 'react-apollo';
import './Board.css';

// Components
import List from '../../components/List';
import AddList from '../../components/AddList';
import BoardHeader from '../../components/BoardHeader';
import BoardSubHeader from '../../components/BoardSubHeader';
import CardDetails from '../../components/CardDetails';
import MenuModal from '../../components/Modal/MenuModal';

// GraphQL Queries and Mutations
import { getBoard } from '../../graphql/query.js';
import { moveCard } from '../../graphql/mutation.js';

class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeCard: {},
            showCardDetails: false,
            showMenu: false,
        };
    }

    onDragStart = () => {
        console.log("Started dragging");
    }

    onDragUpdate = () => {

    }

    onDragEnd = item => {
        console.group("Drag End");
        const boardId = this.props.data.getBoard.shortid;

        if (item.type === 'card') {
            let ogList = this.props.data.getBoard.lists.filter(l => l.shortid === item.source.droppableId)[0];
            
            console.log('Dragged Item:', item);
            console.log('OG List:', ogList);
            
            if (item.destination.droppableId === item.source.droppableId) {
                if (item.destination.index === item.source.index) return;
                console.log('Card moved to different index in same list.');
                
                let newOrderOfCards = ogList.orderOfCards.filter(c => c !== item.draggableId);
                newOrderOfCards.splice(item.destination.index, 0, item.draggableId);
                
                this.props.data.getBoard.lists.forEach(l => { if (l.shortid == ogList.shortid) { l.orderOfCards = newOrderOfCards} });

                this.props.moveCard({variables: {
                    boardId,
                    listId: ogList.shortid,
                    orderOfCards: ogList.orderOfCards,
                    cardId: item.draggableId,
                    newPosition: item.destination.index,
                }});

                console.log('New Order of Cards:', newOrderOfCards);
            } else {
                console.log('Card moved to new list');
            }
            
        }
        console.groupEnd();
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
        let { cards, lists } = this.props.data.getBoard;
        return lists.map(list => {
            return (
                <List 
                    list={list} 
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
                        {!this.props.data.loading && 
                            <React.Fragment>
                                <BoardSubHeader title={this.props.data.getBoard.name}
                                    team={this.props.data.getBoard.team}
                                    visibility={this.props.data.getBoard.visibility}
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
                        }
                    <CardDetails closeCardDetails={this.handleCloseCardDetails} card={activeCard} open={showCardDetails} />
                    <MenuModal open={showMenu} closeModal={() => this.handleToggleMenu(false)} />
                </div>
            </DragDropContext>
        );
    }
}

export default compose(
    graphql(getBoard, {
        options: (props) => {
            const path = props.location.pathname.split('/b/')[1];
            return {
                variables: {
                    id: path
                }
            }
        }
    }),
    graphql(moveCard, { name: 'moveCard' }),
)(Board);

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
