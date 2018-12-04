import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import './List.css'

import Card from '../Card';
import Button from '../Button';
import AddCard from '../AddCard';
import Modals from '../Modal/Modals';

export default class List extends Component {
  determineStyle = (provided) => {
    let { color } = this.props.list;

    return {
      backgroundColor: color,
      ...provided.draggableProps.style
    }
  }

  renderCards = () => {
    let { cards, list, onCardClick } = this.props;
    let orderedCards = [];

    if (cards.length) {
      list.cardOrder.forEach(cardId => {
        orderedCards.push(
          cards.filter(c => c.shortid === cardId)[0]
        );
      });

      return orderedCards.map((card, index) => (
        <Card {...card} key={"card-" + card.shortid} listId={list.shortid} index={index} onClick={onCardClick} />
      ));
    } else {
      return null;
    }
  }

  render() {
    let { name, shortid } = this.props.list;
    let { cards, position, actions } = this.props;
    let hasCards = cards.length ? true : false;

    return (
      <Draggable draggableId={shortid} index={position} type="list">
        {(provided) => (
          <div
            className="list"
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={this.determineStyle(provided)}
          >
            <div className="header"
              {...provided.dragHandleProps}
            >
              <h3>{name}</h3>
              <Button refId={'btn-list-actions-' + shortid} 
                icon="more" 
                iconSize="18px" 
                iconColor="#333" 
                background="none" 
                hoverColor="dark"
              >
                <Modals.ListActions list={this.props.list} actions={actions} />
              </Button>
            </div>

            <div className="cards-wrapper">
              <Droppable droppableId={shortid} type="card">
                {(provided, snapshot) => (
                  <div className="cards"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {this.renderCards()}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <AddCard listId={shortid} handleAddCard={this.props.handleAddCard} hasCards={hasCards} />
          </div>
        )}
      </Draggable>
    );
  }
}

List.propTypes = {
  list: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired
}