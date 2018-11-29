import React from 'react';

import Button from '../Button';
import Modals from '../Modal/Modals';
import UserIcon from '../UserIcon';

let BoardSubHeader = ({ title, team, visibility, openMenu }) => {
    return (
        <div className="sub-header">
            <div className="left-sub-header">
                <Button fontSize="18px" 
                    className="title" 
                    width="auto" 
                    refId="btn-board-title"
                    name={title} 
                    background="none">
                    <Modals.BoardTitle />
                </Button>
                <Button href="#" icon="star" background="dark" />
                <span className="divider"></span>
                <Button fontSize="14px" 
                    className="team" 
                    width="auto" 
                    background="none" 
                    weight="400" 
                    name={team.name} 
                    refId="btn-board-team" >
                    <Modals.BoardManageTeam />    
                </Button>
                <span className="divider"></span>
                <Button fontSize="14px" 
                    icon="trellian" 
                    className="visibility" 
                    width="auto" 
                    background="none" 
                    refId="btn-board-visibility"
                    weight="normal" 
                    name={visibility}>
                    <Modals.BoardVisibility />    
                </Button>
                <span className="divider"></span>
                <UserIcon 
                    refId="btn-user-dbschube" 
                    diameter="28px" 
                    user={{name: "Derek", initials: "DS"}}>
                    <Modals.BoardMember name="Derek" initials="DS" username="dbschube" />    
                </UserIcon>
                <Button 
                    icon="invite" 
                    width="28px" 
                    height="28px"
                    refId="btn-invite" 
                    iconMaskPosition="28% 28%" 
                    className="invite" 
                    background="light" 
                    hoverColor="dark">
                    <Modals.BoardInvite />    
                </Button>
            </div>
            <div className="right-sub-header">
                <Button onClick={openMenu} icon="more" iconSize="16px" weight="400" width="124px" name="Show Menu" background="none" hoverColor="dark" extraStyles={{ textDecoration: "underline" }} />
            </div>
        </div>
    )
};

export default BoardSubHeader;