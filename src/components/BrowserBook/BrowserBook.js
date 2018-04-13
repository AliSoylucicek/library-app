import React from 'react';
import { Card, Icon, Label, Grid, Rating, Button } from 'semantic-ui-react';

import './BrowserBook.css';

const browserBook = (props) => {

    let buttons = (
        <Button.Group fluid widths={2}>
                        <Button onClick={props.addClicked} basic positive>
                            Add to Cart
                        </Button>
                        <Button onClick={props.detailClicked} basic primary>
                            Details
                        </Button>
                    </Button.Group>
    );

    if(props.alreadyAdded === "true")
        buttons = (
        <Button basic color="green" fluid onClick={props.detailClicked}>
            Already Added
        </Button>
    );

    return (
        <Grid.Column stretched mobile={16} tablet={8} computer={4}>
            <Card>
                <Icon name="book" size="massive" fitted style={{ marginTop: "10px", marginBottom: "10px", color: "black" }} />
                <Card.Content>
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
                        <Label size="large">
                            {props.price}
                        </Label>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {buttons}
                </Card.Content>
            </Card>
        </Grid.Column>
    );
};

export default browserBook;