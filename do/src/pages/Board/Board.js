import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// Components
import List from '../../components/List';
import Button from '../../components/Button';
import UserIcon from '../../components/UserIcon';
import Search from '../../components/Search';
import AddList from '../../components/AddList';
import Modal from '../../components/Modal';
import Modals from '../../components/Modal/Modals';

import './Board.css'
import tempApi from '../../api/tempBoard.json';

export default class Board extends Component {
    componentWillMount() {
        this.setState(tempApi);
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

    renderHeader = () => {
        return (
            <header>
                <div className="left-header">
                    <Button background="light" href="/" icon="back" />
                    <Button background="light" href="/boards" name="Boards" icon="trelloicon" width="90px" />
                    <Search />
                </div>
                <a href="/b/" className="logo" aria-label="Trello Home">
                    <span>Trello Home Button</span>
                </a>
                <div className="right-header">
                    <Button background="light" href="#" icon="plus" />
                    <Button background="light" href="#" icon="alert" />
                    <Button background="blue" href="#" icon="notification" />
                    <UserIcon href="#" user={{name: "Derek", initials: "DS"}} />
                </div>
            </header>
        );
    }

    renderSubHeader = () => {
        let { title, team, visibility } = this.state;

        return (
            <div className="sub-header">
                <div className="left-sub-header">
                    <Button fontSize="18px" className="title" width="38px" href="/b/" name={title} background="none" />
                    <Button href="#" icon="star" background="dark" />
                    <span className="divider"></span>
                    <Button fontSize="14px" 
                        className="team" 
                        width="auto" 
                        background="none" 
                        weight="300" 
                        name={team.name} 
                        refId="btn-team-name" >
                        <Modals.BoardManageTeam />    
                    </Button>
                    <span className="divider"></span>
                    <Button fontSize="14px" icon="trellian" className="visibility" width="auto" background="none" weight="normal" name={visibility} />
                    <span className="divider"></span>
                    <UserIcon href="#" diameter="28px" user={{name: "Derek", initials: "DS"}} />
                    <Button icon="invite" width="28px" height="28px" iconMaskPosition="28% 28%" className="invite" background="light" hoverColor="dark" />
                </div>
                <div className="right-sub-header">
                    <Button icon="more" iconSize="16px" weight="200" width="124px" name="Show Menu" background="none" hoverColor="dark" extraStyles={{ textDecoration: "underline" }} />
                </div>
            </div>
        )
    }

    renderLists = () => {
        return this.state.lists.map(list => {
            return (<List list={list} cards={this.state.cards} key={"list-" + list.id} />);
        });
    }

    render() {
        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}
            >
                <div className="board">
                    {this.renderHeader()}
                    {this.renderSubHeader()}
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
                </div>
            </DragDropContext>
        );
    }
}