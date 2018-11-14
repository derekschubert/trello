import React, {Component} from 'react';
import './Modal.css';

import Button from '../Button';

const ModalContext = React.createContext();

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = { listener: false }
    }

    static Header = ({title}) => {
        return (
            <React.Fragment>
                <div className="modal-header">
                    <span>{title}</span>
                    <Button icon="close" 
                        iconColor="#6b808c" 
                        background="none"
                        iconMaskPosition="center" 
                        iconSize="16px"
                        width="32px" 
                        height="32px" />
                </div>
                <Modal.Divider />
            </React.Fragment>
        );
    };

    static Divider = (props) => (
        <React.Fragment>
            <div className="modal-divider">
                <div className="border"></div>
            </div>
        </React.Fragment>
    );

    static Section = (props) => (
        <React.Fragment>
            <div className="modal-section"></div>
        </React.Fragment>
    );

    static Column = (props) => (
        <React.Fragment>
            <div className="modal-column"></div>
        </React.Fragment>
    );

    static Row = (props) => (
        <React.Fragment>
            <div className="modal-row"></div>
        </React.Fragment>
    );

    static Button = (props) => (
        <React.Fragment>
            <div className="modal-button"></div>
        </React.Fragment>
    );

    static Footer = (props) => (
        <React.Fragment>
            <div className="modal-footer"></div>
        </React.Fragment>
    );

    componentDidUpdate = () => {
        let { open } = this.props;
        let { listener } = this.state;

        if (open && !listener) {
            document.addEventListener('mousedown', this.handleFocusClick, false);
            this.setState({listener: true});
        } else if (!open && listener) {
            document.removeEventListener('mousedown', this.handleFocusClick, false);
            this.setState({listener: false});
        }
    }
    
    handleFocusClick = (e) => {
        if (!this.modal.contains(e.target)) {
            this.props.closeModal();
        }
    } 

    determineStyle = () => {
        let { width, height, position } = this.props;

        let top = position.y + position.height + 6;
        let left = position.x;

        return {
            width,
            height,
            top,
            left
        };
    }

    render() {
        let { open, position } = this.props;

        if (open && position.y) {
            return (
                <div className="modal" 
                    style={this.determineStyle()}
                    ref={modal => this.modal = modal}
                >
                    {this.props.children}
                </div>
            );
        } else {
            return null;
        }
    }
}