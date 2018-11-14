import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Button.css';

import Icon from '../Icon';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            showModal: false,
            modalPosition: {}
        };
    }

    componentDidMount = () => {
        
    }

    handleClick = (e) => {
        let { refId } = this.props;

        if (refId) {
            let position = ReactDOM
                .findDOMNode(this.refs[refId])
                .getBoundingClientRect();

            console.log("Position of element:", position);
            this.setState({modalPosition: {x: position.x, y: position.y, height: position.height}, showModal: true});
        }
    }
    
    closeModal = () => {
        this.setState({showModal: false});
    }

    handleHover = (cursorIsHovering) => {
        this.setState({hover: cursorIsHovering});
    }

    handleBackground = () => {
        let { background, hoverColor } = this.props;
        let { hover } = this.state;
        let backgroundColor = "";

        if (!hoverColor.length || !hover) { // Unhovered State or Default Hover Values (per Unhovered State)
            switch (background) {
                case "none":
                    backgroundColor = hover ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.0)";
                    break;
                case "light":
                    backgroundColor = hover ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.3)";
                    break;
                case "dark":
                    backgroundColor = hover ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)";
                    break;
                case "blue":
                    backgroundColor = hover ? "rgba(255,255,255,0.2)" : "#00c2e0";
                    break;
                default:
                    backgroundColor = background;
                    break;
            }
        } else { // hovered state && provided with specific hover color mode
            if (hoverColor.length) {
                switch (hoverColor) {
                    case "none":
                        backgroundColor = "rgba(0,0,0,0)";
                        break;
                    case "light":
                        backgroundColor = "rgba(255,255,255,0.2)";
                        break;
                    case "dark":
                        backgroundColor = "rgba(0,0,0,0.12)";
                        break;
                    default:
                        backgroundColor = hoverColor;
                        break;
                }
            } else { // backgrounds defaults based on unhovered state color

            }
        }
        
        return backgroundColor;
    }

    determineStyle = () => {
        let { width, height, extraStyles } = this.props;
        let style = {
            width,
            height,
            ...extraStyles
        };

        style.backgroundColor = this.handleBackground();

        return style;
    }

    determineClassNames = () => {
        let { icon, className } = this.props;

        let classes = "btn";

        if (!icon) {
            classes += " no-icon";
        } else if (icon === "notification") {
            classes += " notification";
        }

        if (className) {
            classes += " " + className;
        }

        return classes;
    }

    render() {
        let { iconWrapperSize, refId, href, icon, name, weight, fontSize, iconMaskPosition, iconColor, iconSize } = this.props;

        return (
            <React.Fragment>
                <a  onMouseEnter={() => this.handleHover(true)}
                    onMouseLeave={() => this.handleHover(false)}
                    onClick={(e) => this.handleClick(e)}
                    className={this.determineClassNames()} 
                    style={this.determineStyle()}
                    href={href}
                    ref={refId}
                >
                    {icon && <Icon size={iconWrapperSize} icon={icon} backgroundColor={iconColor} maskSize={iconSize} maskPosition={iconMaskPosition} />}
                    {name && <span style={{fontWeight: weight, fontSize}} className="name">{name}</span>}
                </a>
                {React.Children.map(this.props.children, child => 
                    React.cloneElement(child, {
                        position: this.state.modalPosition,
                        open: this.state.showModal,
                        closeModal: this.closeModal
                    }),
                )}
            </React.Fragment>
        );
    }
}

Button.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    name: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.string,
    weight: PropTypes.string,
    hoverColor: PropTypes.string,
    iconColor: PropTypes.string,
    fontSize: PropTypes.string,
    iconMaskPosition: PropTypes.string,
    extraStyles: PropTypes.object,
    iconSize: PropTypes.string,
    iconWrapperSize: PropTypes.string,
    background: PropTypes.string.isRequired
};

Button.defaultProps = {
    width: "32px",
    hoverColor: "",
    iconWrapperSize: "32px",
    extraStyles: {},
    height: "32px",
    iconColor: "#fff",
    iconSize: "auto",
    fontSize: "14px",
    iconMaskPosition: "center",
    href: "#",
    weight: "700",
};