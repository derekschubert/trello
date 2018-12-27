import React, {Component} from 'react';
import './MenuModal.css';

import Button from '../Button';
import Modal from './Modal';

export default class MenuModal extends Component {
    render() {
        let { open } = this.props;

        if (open) {
            return (
                <Modal setLocation={true}
                    {...this.props}
                    className="main-menu"
                    position={{right: 0, bottom: 0, top: 40}}
                    width="340px" >
                    <Modal.Header 
                        titleStyle={{fontWeight: "700", color: "#17394d", fontSize: "16px"}} 
                        title="Menu" />

                    <Modal.MenuSection>
                        <Button background="none"
                            width="100%"
                            name="Change Background"
                            fontColor="#17394d"
                            iconColor="#798d99"
                            icon="cardcover" />
                        <Button background="none"
                            width="100%"
                            name="Filter Cards"
                            fontColor="#17394d"
                            iconColor="#798d99"
                            icon="filter" />
                        <Button background="none"
                            width="100%"
                            name="Stickers"
                            fontColor="#17394d"
                            iconColor="#798d99"
                            icon="sticker" />
                        <Button background="none"
                            width="100%"
                            name="More"
                            fontColor="#17394d"
                            iconColor="#798d99"
                            icon="more" />
                    </Modal.MenuSection>
                    <Modal.Divider />
                    <Modal.MenuSection>
                        <Button background="none"
                                width="100%"
                                name="Activity"
                                fontColor="#17394d"
                                iconColor="#798d99"
                                icon="activity" />
                    </Modal.MenuSection>
                    <Modal.Divider />
                </Modal>
            );
        } else {
            return null;
        }
    }
}