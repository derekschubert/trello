import React, {Component} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import './Card.css'

import Button from '../Button';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        };
    }

    handleToggleHover = (isHovered) => {
        this.setState({hover: isHovered});
    }

    determineStyle = (provided) => {
        return {
            backgroundColor: this.state.hover ? "#f5f6f7" : "#fff",
            ...provided.draggableProps.style
        };
    }

    renderEditIcon = () => {
        let { hover } = this.state;
        if (hover) {
            return <Button icon="edit" background="none" hoverColor="dark" iconColor="#888" iconSize="14px" />;
        } else {
            return <span></span>;
        }
    }

    render() {
        let { name, id, index, onClick } = this.props;

        return (
            <Draggable key={id} draggableId={"card" + id} index={index} type="card" >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="card"
                        onMouseEnter={() => this.handleToggleHover(true)}
                        onMouseLeave={() => this.handleToggleHover(false)}
                        style={this.determineStyle(provided)}
                        onClick={() => onClick(this.props)}
                    >
                        <span>{name}</span>
                        {this.renderEditIcon()}
                    </div>
                )}
            </Draggable>
        );
    }
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
}