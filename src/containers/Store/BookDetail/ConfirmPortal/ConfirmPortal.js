import React from 'react';

import { Item, Label, Button, Icon, Modal, TransitionablePortal } from 'semantic-ui-react';

const confirmPortal = (props) => {

    const items = props.books.map(book => (
        <Item.Group key={book.id}>
            <Item>
                <Item.Image>
                    <Icon name="book" size="huge" fitted style={{ marginLeft: "20px" }} />
                </Item.Image>
                <Item.Content>
                    <Item.Header >{book.name}</Item.Header>
                    <Item.Description>
                        <Label>
                            {book.price}
                        </Label>
                    </Item.Description>
                </Item.Content>
            </Item>
        </Item.Group>
    ));


    return (
        <TransitionablePortal onClose={props.handleClose} open={props.open}>
            <Modal dimmer="inverted" open onClose={props.handleClose} closeIcon>
                <Modal.Header>{props.header}</Modal.Header>
                <Modal.Content>
                    {items}
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color="blue" onClick={props.primary}>
                        {props.primaryButton}
                    </Button>
                    <Button basic color="green" onClick={props.secondary}>
                        {props.secondaryButton}
                    </Button>
                </Modal.Actions>
            </Modal>
        </TransitionablePortal>
    );
}

export default confirmPortal;