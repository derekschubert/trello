import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// Components
import List from '../../components/List';
import AddList from '../../components/AddList';
import BoardHeader from '../../components/BoardHeader';
import BoardSubHeader from '../../components/BoardSubHeader';
import CardDetails from '../../components/CardDetails';
import MenuModal from '../../components/Modal/MenuModal';

import './Board.css'
import tempApi from '../../api/tempBoard.json';

export default class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeCard: {},
            showCardDetails: false,
            showMenu: false,
            ...tempApi
        };

        // this.setState(tempApi);
    }

    componentWillMount() {
    
    }

    onDragStart = () => {
        console.log("Started dragging");
    }

    onDragUpdate = () => {

    }

    onDragEnd = () => {
        // Required
        console.log("Finished dragging");
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
        return this.state.lists.map(list => {
            return (
                <List 
                    list={list} 
                    cards={this.state.cards} 
                    key={"list-" + list.id}
                    onCardClick={this.handleCardClick} />
            );
        });
    }

    render() {
        let { title, team, visibility, activeCard, showCardDetails, showMenu } = this.state;

        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}
            >
                <div className="board">
                    <BoardHeader />
                    <BoardSubHeader title={title} team={team} visibility={visibility} openMenu={() => this.handleToggleMenu(true)} />
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
                    <CardDetails closeCardDetails={this.handleCloseCardDetails} card={activeCard} open={showCardDetails} />
                    <MenuModal open={showMenu} closeModal={() => this.handleToggleMenu(false)} />
                </div>
            </DragDropContext>
        );
    }
}