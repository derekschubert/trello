import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import './List.css'

import Card from '../Card';
import Button from '../Button';
import AddCard from '../AddCard'

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
            list.orderOfCards.forEach(cardId => {
                orderedCards.push(
                    cards.filter(c => c.shortid === cardId)[0]
                );
            });
    
            return orderedCards.map((card, index) => (
                <Card {...card} key={"card-" + card.shortid} index={index} onClick={onCardClick} />
            ));
        } else {
            return null;
        }
    }

    render() {
        let { name, position, shortid } = this.props.list;
        let { cards } = this.props;
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
                            <Button icon="more" iconSize="18px" iconColor="#333" background="none" hoverColor="dark" />
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
                        <AddCard hasCards={hasCards} />
                    </div>
                )}
            </Draggable>

            // <Droppable droppableId={Math.random() + ""}>
            //     {(provided, snapshot) => (
            //         <div
            //             className="list"
            //             ref={provided.innerRef}
            //             // style={{ backgroundColor: snapshot.isDraggingOver ? 'gray' : color }}
            //             style={{ backgroundColor: color }}
            //             {...provided.droppableProps}
            //         >
            //             <div className="header">
            //                 <h3>{name}</h3>
            //                 <Button icon="more" iconSize="18px" iconColor="#333" background="none" hoverColor="dark" />
            //             </div>
            //             <div className="cards-wrapper">
            //                 {this.renderCards()}
            //                 {provided.placeholder}
            //             </div>
            //             <AddCard hasCards={hasCards} />
            //         </div>
            //     )}
            // </Droppable>
        );
    }
}

List.propTypes = {
    list: PropTypes.object.isRequired,
    cards: PropTypes.array.isRequired
}