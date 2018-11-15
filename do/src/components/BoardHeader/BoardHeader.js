import React from 'react';

import Modals from '../Modal/Modals';
import Search from '../Search';
import Button from '../Button';
import UserIcon from '../UserIcon';

let BoardHeader = (props) => {
    return (
        <header>
            <div className="left-header">
                <Button background="light" href="/" icon="back" />
                <Button background="light" href="/boards" name="Boards" icon="trelloicon" width="90px" />
                <Search />
            </div>
            <a href="/b/" className="logo" aria-label="Trello Home">
                <span>Trello Home Button</span>
            </a>
            <div className="right-header">
                <Button 
                    background="light" 
                    refId="btn-create"
                    icon="plus">
                    <Modals.Create />    
                </Button>
                <Button 
                    background="light" 
                    refId="btn-information"
                    icon="alert">
                    <Modals.Information />    
                </Button>
                <Button 
                    background="blue" 
                    refId="btn-notification"
                    icon="notification">
                    <Modals.Notifications />    
                </Button>
                <UserIcon refId="btn-account"
                    user={{name: "Derek", initials: "DS"}}>
                    <Modals.MyAccount name="Derek" username="dbschube" />
                </UserIcon>
            </div>
        </header>
    );
}

export default BoardHeader;