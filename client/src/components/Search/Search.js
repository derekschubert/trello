import React, {Component} from 'react';
import './Search.css';

import Icon from '../Icon';
import Button from '../Button';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            isActive: false,
            hover: false
        };
    }

    handleHover = (isHovering) => {
        if (!this.state.isActive) {
            if (isHovering) {
                this.setState({hover: true});
            } else {
                this.setState({hover: false});
            }
        }
    }

    handleFocus = (isInFocus) => {
        if (isInFocus) {
            this.setState({isActive: true, hover: false});
        } else {
            this.setState({
                searchValue: "",
                isActive: false
            });
        }
    }

    handleInputValue = (e) => {
        let newState = {};
        newState[e.target.name] = e.target.value;

        this.setState({...newState});
    }

    determineSearchStyle = () => {
        let { isActive, hover } = this.state;
        let style = {};

        if (isActive) { // Active State
            style = {
                backgroundColor: "#fff",
                gridTemplateColumns: "auto 32px 32px",
                width: "280px"
            };
        } else if (hover) { // Inactive but Hovered State
            style = {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                gridTemplateColumns: "auto 32px",
                width: "180px"
            };
        } else { // Default State
            style = {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                gridTemplateColumns: "auto 32px",
                width: "180px"
            };
        }

        return style;
    }

    renderIcons = () => {
        let { isActive } = this.state;

        if (isActive) {
            return (
                <React.Fragment>
                    <Button icon="link" background="none" iconColor="#333" />
                    <Button icon="close" background="none" iconColor="#333" />
                </React.Fragment>
            );
        } else {
            return (
                <Icon maskPosition="center" icon="search" maskSize="18px" />
            );
        }
    }

    render() {
        let { searchValue } = this.state;

        return (
            <div className="search"
                style={this.determineSearchStyle()}
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
                onFocus={() => this.handleFocus(true)}
                onBlur={() => this.handleFocus(false)}
            >
                <input type="text" name="searchValue" value={searchValue} onChange={(e) => this.handleInputValue(e)} />
                {this.renderIcons()}
            </div>
        );
    }
}