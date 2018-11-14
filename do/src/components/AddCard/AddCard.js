import React, {Component} from 'react';
import './AddCard.css';

import Button from '../Button';
import Icon from '../Icon';

export default class AddCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            active: false,
            createCardValue: ""
        };
    }

    handleInputChange = (e) => {
        let updatedState = {};
        updatedState[e.target.name] = e.target.value;

        this.setState({...updatedState});
    }

    handleFocusClick = (e) => {
        if (!this.node.contains(e.target)) {
            this.handleActive(false);
        }
    }

    handleActive = (isActive) => {
        if (isActive) {
            document.addEventListener('mousedown', this.handleFocusClick, false);
            this.setState({active: true, hover: false});
        } else {
            document.removeEventListener('mousedown', this.handleFocusClick, false);
            this.setState({active: false});
        }
    }

    handleHover = (hover) => {
        let { active } = this.state;

        if (!active) {
            this.setState({hover});
        }
    }

    determineInactiveStyle = () => {
        let { hover } = this.state;
        let style = {};

        if (hover) {
            style.backgroundColor = "rgba(9, 45, 66, .13)";
            style.color = "#17394d";
            style.textDecoration = "underline";
        } else {
            style.backgroundColor = "rgba(0,0,0,0)";
            style.color = "#6b808c";
            style.textDecoration = "none";
        }

        return style;
    }

    determineActiveStyle = () => {

    }

    renderInactive = () => {
        let { hasCards } = this.props;
        let style = this.determineInactiveStyle();

        return (
            <a  className="add-card" 
                href="#"
                style={style}
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
                onClick={() => this.handleActive(true)}
            >
                <Icon icon="plus" maskPosition="center" maskSize="18px" backgroundColor={style.color} />
                <span className="text">{hasCards && "Add another card"}{!hasCards && "Add a card"}</span>
            </a>
        );
    }

    renderActive = () => {
        let { createCardValue } = this.state;

        return (
            <div className="create-card" 
                ref={node => this.node = node}
            >
                <div className="create-card-wrapper">
                    <textarea placeholder="Enter a title for this card..." 
                        value={createCardValue}
                        name="createCardValue"
                        onChange={(e) => this.handleInputChange(e)}
                    />
                </div>
                <div className="controls">
                    <Button name="Add Card" width="auto" className="add" background="#5aac44" hoverColor="#519839" />
                    <Button icon="close" className="close" iconColor="#798d99" background="none" />
                    <Button icon="more" className="more" iconColor="#798d99" background="none" />
                </div>
            </div>
        );
    }

    render() {
        let { active } = this.state;

        if (active) {
            return this.renderActive();
        } else {
            return this.renderInactive();
        }
    }
}