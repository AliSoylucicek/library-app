import React from 'react';
import { Card, Icon, Label, Grid, Rating, Button } from 'semantic-ui-react';

import './BrowserBook.css';

const browserBook = (props) => {

    let discountLabel = null;

    if (props.oldPrice) {
        discountLabel = <Label color='green' corner icon="arrow down"></Label>
    }

    let button = null;
    switch (props.purchaseState) {
        case "cart":
            button = (
                <Button animated="vertical" basic color="green" fluid onClick={props.detailClicked}>
                    <Button.Content hidden>Details</Button.Content>
                    <Button.Content visible>Added to Cart</Button.Content>
                </Button>
            );
            break
        case "purchased":
            button = (
                <Button animated="vertical" basic color="green" fluid onClick={props.detailClicked}>
                    <Button.Content hidden>Details</Button.Content>
                    <Button.Content visible>Purchased</Button.Content>
                </Button>
            );
            break
        default:
            button = (
                <Button onClick={props.detailClicked} basic primary fluid>
                    Details
                </Button>
            );
            break
    }

    return (
        <Grid.Column mobile={16} tablet={8} computer={4}>
            <Card fluid>
                <Icon name="book" size="massive" fitted style={{ marginTop: "10px", marginBottom: "10px" }} />
                <Card.Content>
                    {discountLabel}
                    <Card.Header>
                        {props.name}
                    </Card.Header>
                    <Card.Meta>
                        <span>
                            {props.author}
                        </span>
                    </Card.Meta>

                    <Card.Description>
                        <Label>
                            {props.category}
                        </Label>
                    </Card.Description>
                    <Rating disabled icon='star' rating={props.rating} maxRating={5} style={{ marginTop: ".5em" }} />
                    <Card.Description textAlign="right">
                        {props.oldPrice ? <s style={{ marginRight: "5px" }}>{props.oldPrice}</s> : null}
                        <Label size="large">
                            {props.price}
                        </Label>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {button}
                </Card.Content>
            </Card>
        </Grid.Column>
    );
};

export default browserBook;