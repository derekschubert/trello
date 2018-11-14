import React, {Component} from 'react';
import Modal from './Modal.js';

export default class Modals extends Component {
    static BoardManageTeam = (props) => {
        return (
            <Modal {...props} width="305px">
                <Modal.Header title="Starbound" />
                <Modal.Section>
                    <Modal.Button title="Change Team..." href="#" />
                    <Modal.Button title="View Team Page" href="#" />
                </Modal.Section>
                <Modal.Footer>
                    <Modal.Button title="Upgrade to Business Class" href="#" />
                </Modal.Footer>
            </Modal>
        );
    };
}