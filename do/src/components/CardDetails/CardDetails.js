import React, { Component } from 'react';
import './CardDetails.css';

import Button from '../Button';
import Icon from '../Icon';
import UserIcon from '../UserIcon';

/* eslint jsx-a11y/anchor-is-valid: 0  */

class CardDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardDetailsListener: false,
            descriptionIsActive: false
        };
    }

    toggleDescriptionView = (isActive) => {
        this.setState({descriptionIsActive: isActive});
    }

    static Button = ({icon, title}) => (
        <button className="card-details-button">
            <Icon icon={icon}
                backgroundColor="#798d99"
                maskPosition="center"
                size="20px"
                maskSize="16px" />
            <span className="title">{title}</span>
        </button>
    );

    static Comment = ({user, comment}) => (
        <div></div>
    );

    static CardHeader = ({name, close}) => (
        <div className="header">
            <Icon icon="cardcover"
                backgroundColor="#798d99"
                maskPosition="center"
                maskSize="24px" />
            <div className="title-info">
                <span className="name">{name}</span>
                <span className="in-list">in list <a href="#">{"LIST NAME"}</a></span>
            </div>
            <div className="close">
                <Button icon="close"
                    iconColor="#6b808c"
                    background="none"
                    onClick={close}
                    iconMaskPosition="center"
                    iconSize="32px"
                    width="32px"
                    height="32px" />
            </div>
        </div>
    );

    static CardButtons = () => (
        <div className="sidebar-buttons">
            <span className="section-title">ADD TO CARD</span>
            <div className="section">
                <CardDetails.Button icon="trellian" title="Members" />
                <CardDetails.Button icon="label" title="Labels" />
                <CardDetails.Button icon="checklist" title="Checklist" />
                <CardDetails.Button icon="" title="Due Date" />
                <CardDetails.Button icon="" title="Attachment" />
            </div>
            <span className="section-title">ACTIONS</span>
            <div className="section">
                <CardDetails.Button icon="" title="Move" />
                <CardDetails.Button icon="" title="Copy" />
                <CardDetails.Button icon="" title="Watch" />
                <span className="divider"></span>
                <CardDetails.Button icon="" title="Archive" />
            </div>
            <Button
                name="Share and more..."
                background="none"
                width="168px"
                weight="400"
                extraStyles={{ justifyItems: "left" }}
                fontColor="#6b808c" />
        </div>
    );

    static Labels = ({labels}) => {
        labels = [{name: 'Need to Do', color: '#c377e0'}, {name: "Accomplished", color: "#51e898"}]; // temp data

        if (labels.length) {
            return (
                <div className="card-labels">
                    <span className="content-soft-title">LABELS</span>
                    <div className="labels">
                        {labels.map((l, i) => (
                            <CardDetails.Label key={i} {...l} />
                        ))}
                        <div className="add-label">
                            <Button icon="plus"
                                background="rgba(9,45,66,.08)"
                                hoverColor="rgba(9,45,66,.13)"
                                iconColor="#798d99" />
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    };

    static Label = ({name, color}) => (
        <span className="card-label" style={{backgroundColor: color}}>{name}</span>
    );

    static Description = ({active, description, onClick}) => {
        if (active) {
            return (
                <div className="section description">
                    <Icon icon="description"
                        backgroundColor="#798d99"
                        maskPosition="center"
                        maskSize="24px" />
                    <span className="content-title">Description</span>
                    <div className="content">
                        <textarea onChange={() => {}} value={description} placeholder="Add a more detailed description..." />
                        <div className="controls">
                            <Button className="save-description"
                                name="Save"
                                background="#5aac44"
                                hoverColor="#519839"
                                extraStyles={{boxShadow: "0 1px 0 0 #3f6f21", padding: "0 6px"}}
                                width="fit-content" />
                            <Button className="close"
                                icon="close"
                                background="none"
                                iconColor="#798d99" />
                            <Button className="formatting-help"
                                name="Formatting help"
                                background="rgba(9, 45, 66, .08)"
                                hoverColor="rgba(9, 45, 66, .13)"
                                fontColor="#6b808c"
                                weight="400"
                                extraStyles={{textDecoration: "underline", textDecorationColor: "#6b808c"}}
                                width="fit-content" />
                        </div>
                    </div>
                </div>
            );
        } else if (description.length) {
            return (
                <div className="section description">
                    <Icon icon="description"
                        backgroundColor="#798d99"
                        maskPosition="center"
                        maskSize="24px" />
                    <span className="content-title">Description <a onClick={() => onClick(true)} href="#" className="edit-description-link">Edit</a></span>
                    <div className="content">
                        <span className="inactive-description" onClick={() => onClick(true)}>{description}</span>
                    </div>
                </div>                
            );
        } else {
            return (
                <div className="section description">
                    <Icon icon="description"
                        backgroundColor="#798d99"
                        maskPosition="center"
                        maskSize="24px" />
                    <span className="content-title">Description</span>
                    <div className="content">
                        <button className="show-description" onClick={() => onClick(true)}>
                            <span>Add a more detailed description...</span>
                        </button>
                    </div>
                </div>
            );
        }
    };

    static WriteComment = () => (
        <div className="section comment">
            <Icon icon="comments"
                backgroundColor="#798d99"
                maskPosition="center"
                maskSize="24px" />
            <span className="content-title">Add Comment</span>
            <UserIcon diameter="32px" user={{name: "Derek", initials: "DS"}} />
            <div className="content">
                <div className="textarea-wrapper">
                    <textarea placeholder="Write a comment..."></textarea>
                    <div className="comment-options">
                        <Button icon="attachments"
                            iconSize="18px"
                            iconColor="#789d99"
                            background="none" />
                        <Button name="@"
                            fontSize="16px"
                            fontColor="#789d99"
                            background="none" />
                        <Button icon="emoji"
                            iconSize="18px"
                            iconColor="#789d99"
                            background="none" />
                        <Button icon="cardcover"
                            iconSize="18px"
                            iconColor="#789d99"
                            background="none" />
                    </div>
                </div>
                <Button className="save-comment"
                    name="Save"
                    background="#5aac44"
                    hoverColor="#519839"
                    extraStyles={{boxShadow: "0 1px 0 0 #3f6f21", padding: "0 6px"}}
                    width="fit-content" />
            </div>
        </div>
    );

    static Activity = () => (
        <div className="section activity">
            <Icon icon="activity"
                backgroundColor="#798d99"
                maskPosition="center"
                maskSize="24px" />
            <span className="content-title">Activity</span>                            
        </div>
    );

    componentDidUpdate = () => {
        let { open } = this.props;
        let { cardDetailsListener } = this.state;

        if (open && !cardDetailsListener) {
            document.addEventListener('mousedown', this.handleFocusClick, false);
            this.setState({cardDetailsListener: true});
        } else if (!open && cardDetailsListener) {
            document.removeEventListener('mousedown', this.handleFocusClick, false);
            this.setState({cardDetailsListener: false});
        }
    }

    handleFocusClick = (e) => {
        if (!this.cardDetails.contains(e.target)) {
            this.props.closeCardDetails();
        }
    }

    render() {   
        let { open, card, closeCardDetails } = this.props;
        let { descriptionIsActive } = this.state;

        if (open) {
            return (
                <div className="card-details-wrapper">
                    <div ref={cardDetails => this.cardDetails = cardDetails} className="card-details">
                        <CardDetails.CardHeader name={card.name} close={closeCardDetails} />
                        <div className="main-content">
                            <CardDetails.Labels />
                            <CardDetails.Description description={card.description} active={descriptionIsActive} onClick={this.toggleDescriptionView} />
                            <CardDetails.WriteComment />
                            <CardDetails.Activity />
                        </div>
                        <CardDetails.CardButtons />
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
};

export default CardDetails;