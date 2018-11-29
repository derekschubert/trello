import React, {Component} from 'react';
import './AddList.css';

import Button from '../Button';
import Icon from '../Icon';

/* eslint jsx-a11y/anchor-is-valid: 0  */

export default class AddList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            hover: false
        };
    }

    handleInputChange = (e) => {
        let { name, value } = e.target;
        let updatedState = {};
    
        updatedState[name] = value;
        this.setState({...updatedState});
    }

    handleHover = (isHovering) => {
        let { active } = this.state;

        if (!active) {
            this.setState({hover: isHovering});
        }
    }

    handleFocusClick = (e) => {
        if (!this.node.contains(e.target)) {

        }
    }

    handleActive = (isActive) => {
        if (isActive) {
            this.setState({active: true, hover: false}, () => {
                this.focusInput.focus();
            });
            // document.addEventListener('mousedown', this.handleFocusClick, false);
        } else {
            this.setState({active: false, hover: false});
            // document.removeEventListener('mousedown', this.handleFocusClick, false);
        }
        
    }

    determineInactiveStlye = () => {
        let { hover } = this.state;

        let hoverStyle = {
            backgroundColor: "rgba(0, 0, 0, .24)"
        };

        let defaultStyle = {
            backgroundColor: "rgba(0, 0, 0, .12)"
        };

        return hover ? hoverStyle : defaultStyle;
    }

    renderInactive = () => {
        return (
            <a  href="#"
                style={this.determineInactiveStlye()}
                className="add-list"
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
                onClick={() => this.handleActive(true)}
            >
                <Icon icon="plus" maskPosition="center" maskSize="16px" backgroundColor="rgba(255, 255, 255, 0.8)" />
                <span>Add another list</span>
            </a>
        );
    }

    renderActive = () => {
        return (
            <div className="adding-list">
                <input type="text" 
                    name="listNameValue" 
                    placeholder="Enter list title..." 
                    onChange={(e) => this.handleInputChange(e)}
                    ref={focusInput => this.focusInput = focusInput}
                    onBlur={() => this.handleActive(false)}
                />
                <div className="controls">
                   <Button name="Add List" width="auto" className="add" background="#5aac44" hoverColor="#519839" />
                   <Button icon="close" className="close" iconColor="#798d99" background="none" />
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