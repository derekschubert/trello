import React, { Component } from 'react';
import Modal from './Modal.js';

import Button from '../Button';

export default class Modals extends Component {
  static Create = (props) => {
    return (
      <Modal {...props} width="305px">
        <Modal.Header title="Create" />
        <Modal.Footer>
          <Modal.DetailedButton title="Create Board..."
            description="A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything." />
          <Modal.DetailedButton title="Create Team..."
            description="A team is a group of boards and people. Use it to organize your company, side hustle, family, or friends." />
          <Modal.DetailedButton title="Create Business Team..."
            description="With Business Class your team has more security, administrative controls, and unlimited Power-Ups." />
        </Modal.Footer>
      </Modal>
    );
  }

  static Information = (props) => {
    return (
      <Modal {...props} width="360px">
        <Modal.Header title="Information" />
        <Modal.Section>
          <Modal.Row>
            <Modal.ImageButton title="Get Inspired By Dozens Of Different Trello Workflows">
              <Modal.Image src="https://a.trellocdn.com/prgb/dist/images/tips/inspiration-1@1x.e1565bd541d2b56ec792.png" />
            </Modal.ImageButton>
          </Modal.Row>
          <Modal.Row>
            <Button background="none"
              name="Get a new tip"
              width="100%"
              fontColor="#6b808c"
              weight="400"
              extraStyles={{
                color: "#6b808c",
                textDecoration: "underline"
              }} />
          </Modal.Row>
        </Modal.Section>
        <Modal.Footer>
          <Modal.Row>
            <Button background="none"
              name="Tour"
              width="fit-content"
              fontColor="#6b808c"
              weight="400"
              extraStyles={{
                color: "#6b808c",
                textDecoration: "underline"
              }} />
            <Button background="none"
              name="Pricing"
              width="fit-content"
              fontColor="#6b808c"
              weight="400"
              extraStyles={{
                color: "#6b808c",
                textDecoration: "underline"
              }} />
            <Button background="none"
              name="Apps"
              width="fit-content"
              fontColor="#6b808c"
              weight="400"
              extraStyles={{
                color: "#6b808c",
                textDecoration: "underline"
              }} />
            <Button background="none"
              name="Blog"
              width="fit-content"
              fontColor="#6b808c"
              weight="400"
              extraStyles={{
                color: "#6b808c",
                textDecoration: "underline"
              }} />
            <Button background="none"
              name="Privacy"
              width="fit-content"
              fontColor="#6b808c"
              weight="400"
              extraStyles={{
                color: "#6b808c",
                textDecoration: "underline"
              }} />
            <Button background="none"
              name="More..."
              width="fit-content"
              fontColor="#6b808c"
              weight="400"
              extraStyles={{
                color: "#6b808c",
                textDecoration: "underline"
              }} />
          </Modal.Row>
        </Modal.Footer>
      </Modal>
    );
  }

  static Notifications = (props) => {
    return (
      <Modal {...props} width="420px">
        <Modal.Header title="Notifications" />
        <Modal.Section>
          <Modal.Column extraStyles={{ marginTop: "16px", marginBottom: "16px" }}>
            <img alt="No new notifications" src="https://a.trellocdn.com/prgb/dist/images/taco-sleep.0582d9f3bdb5060e7285.svg" />
            <span className="no-notifications-title">No Unread Notifications</span>
          </Modal.Column>
        </Modal.Section>
        <Modal.Section>
          <Modal.Button title="View All Notifications" />
        </Modal.Section>
        <Modal.Footer>
          <Modal.Button title="Change Notification Email Frequency" />
          <Modal.Button title="Allow Desktop Notifications" />
        </Modal.Footer>
      </Modal>
    );
  }

  static MyAccount = (props) => {
    let { name, username } = props;

    return (
      <Modal {...props} width="305px">
        <Modal.Header title={`${name} (${username})`} />
        <Modal.Section>
          <Modal.Button title="Profile" />
          <Modal.Button title="Cards" />
          <Modal.Button title="Settings" />
        </Modal.Section>
        <Modal.Section>
          <Modal.Button title="Help" />
          <Modal.Button title="Shortcuts" />
          <Modal.Button title="Change Language..." />
        </Modal.Section>
        <Modal.Footer>
          <Modal.Button title="Log Out" />
        </Modal.Footer>
      </Modal>
    );
  }

  static BoardManageTeam = (props) => {
    return (
      <Modal {...props} width="305px">
        <Modal.Header title="Starbound" />
        <Modal.Section>
          <Modal.Button title="Change Team..." />
          <Modal.Button title="View Team Page" />
        </Modal.Section>
        <Modal.Footer>
          <Modal.Button title="Upgrade to Business Class" />
        </Modal.Footer>
      </Modal>
    );
  };

  static BoardTitle = (props) => {
    return (
      <Modal {...props} width="305px">
        <Modal.Header title="Rename Board" />
        <Modal.Footer>
          <Modal.Input label="Name" value="Do" />
          <Button name="Rename"
            background="#5aac44"
            hoverColor="#519839"
            fontColor="#fff"
            width="fit-content"
            extraStyles={{ padding: "0 12px", marginLeft: "12px", marginBottom: "12px" }} />
        </Modal.Footer>
      </Modal>
    );
  };

  static BoardVisibility = (props) => {
    return (
      <Modal {...props} width="370px">
        <Modal.Header title="Change Visibility" />
        <Modal.Footer>
          <Modal.DetailedButton title="Private"
            icon="lock"
            color="red"
            description="Only board members can see and edit this board." />
          <Modal.DetailedButton title="Team"
            icon="team"
            color="gray"
            description="All members of the {} team can see and edit this board." />
          <Modal.DetailedButton title="Public"
            icon="public"
            color="green"
            description="Anyone on the internet (including Google) can see this board. Only board members can edit." />
        </Modal.Footer>
      </Modal>
    );
  }

  static BoardMember = (props) => {
    let { name, username, initials } = props;

    return (
      <Modal {...props} width="305px">
        <Modal.MiniProfile initials={initials} name={name} username={username} canEdit={true} />
        <Modal.Button title="Change permissions..." subtitle="(Admin)" />
        <Modal.Button title="View Member's Board Activity" />
      </Modal>
    );
  }

  static BoardInvite = (props) => {
    return (
      <Modal {...props} width="305px">
        <Modal.Header title="Invite To Board" />
        <Modal.Section>
          <Modal.Input placeholder="Email address or name" />
          <Modal.TextArea value="I'm working on this project in Trello and wanted to share it with you!" />
          <Button name="Send Invitation"
            background="#5aac44"
            hoverColor="#519839"
            fontColor="#fff"
            fontSize="16px"
            height="40px"
            weight="700"
            width="calc(100% - 24px)"
            extraStyles={{ margin: "16px 12px" }} />
        </Modal.Section>
        <Modal.Footer>
          <Modal.DetailedButton
            icon="plane"
            color="gray"
            title="Invite with Link"
            description="Anyone with a link can join as a board member." />
        </Modal.Footer>
      </Modal>
    )
  }

  static ListActions = (props) => {
    return (
      <Modal {...props} width='305px'>
        <Modal.Header title='List Actions' />
        <Modal.Section>
          <Modal.Button title='Add Card...' />
          <Modal.Button title='Copy List...' />
          <Modal.Button title='Move List...' />
          <Modal.Button title='Watch' />
        </Modal.Section>
        <Modal.Section>
          <Modal.Button title='Sort By...' />
        </Modal.Section>
        <Modal.Section>
          <Modal.Button title='Move All Cards in This List...' />
          <Modal.Button title='Archive All Cards in This List...' />
        </Modal.Section>
        <Modal.Section>
          <Modal.Button title='Archive This List' />
          <Modal.Button onClick={() => props.actions.deleteList(props.list.shortid)} title='Delete This List' />
        </Modal.Section>
      </Modal>
    );
  }
}