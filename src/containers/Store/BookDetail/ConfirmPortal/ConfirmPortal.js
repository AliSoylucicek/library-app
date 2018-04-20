import React from 'react';

import { Item, Label, Button, Icon, Modal, TransitionablePortal } from 'semantic-ui-react';

const confirmPortal = (props) => {

    const item = (
        <Item.Group>
            <Item>
                <Item.Image>
                    <Icon name="book" size="huge" fitted style={{ marginLeft: "20px" }} />
                </Item.Image>
                <Item.Content>
                    <Item.Header >{props.book.name}</Item.Header>
                    <Item.Description>
                        <Label>
                            {props.book.price}
                        </Label>
                    </Item.Description>
                </Item.Content>
            </Item>
        </Item.Group>
    );


    return (
        <TransitionablePortal onClose={props.handleClose} open={props.open}>
            <Modal dimmer="inverted" open onClose={props.handleClose} closeIcon>
                <Modal.Header>Added to Cart!</Modal.Header>
                <Modal.Content>
                    {item}
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color="blue" onClick={props.shop}>
                        Back to Shop
                    </Button>
                    <Button basic color="green" onClick={props.cart}>
                        Go to Cart
                    </Button>
                </Modal.Actions>
            </Modal>
        </TransitionablePortal>
    );
}

export default confirmPortal;