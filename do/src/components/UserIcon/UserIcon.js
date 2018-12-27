import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './UserIcon.css';

export default class UserIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalPosition: {}
        }
    }

    determineStyle = () => {
        let { diameter, extraStyles } = this.props;

        return {
            width: diameter,
            height: diameter,
            lineHeight: diameter,
            ...extraStyles
        }
    }

    handleClick = (e) => {
        let { refId } = this.props;
        
        if (refId) {
            let position = ReactDOM
                .findDOMNode(this.refs[refId])
                .getBoundingClientRect();

            this.setState({modalPosition: {x: position.x, y: position.y, height: position.height}, showModal: true});
        }
    }
    
    closeModal = () => {
        this.setState({showModal: false});
    }

    render() {
        let {href, user, refId} = this.props;

        return (
            <React.Fragment>
                <a className="user-icon" 
                    href={href} 
                    style={this.determineStyle()}
                    ref={refId}
                    onClick={(e) => this.handleClick(e)}
                >
                    {user.initials}
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

UserIcon.propTypes = {
    href: PropTypes.string,
    user: PropTypes.object.isRequired,
    diameter: PropTypes.string,
    extraStyles: PropTypes.object
};

UserIcon.defaultProps = {
    diameter: "32px",
    extraStyles: {}
};