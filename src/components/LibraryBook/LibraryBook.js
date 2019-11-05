import React from 'react';
import { Card, Icon, Label, Grid, Rating } from 'semantic-ui-react';

import './LibraryBook.css';

const libraryBook = (props) => {

    return (
        <Grid.Column mobile={16} tablet={8} computer={4}>
            <Card fluid>
                <Icon name="book" size="massive" fitted style={{ marginTop: "10px", marginBottom: "10px" }} />
                <Card.Content>
                    <Card.Header style={{ display:"flex",justifyContent:"space-between"}}>
                        {props.name}
                        <Icon name="heart" color="grey"/>
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
                </Card.Content>
            </Card>
        </Grid.Column>
    );
};

export default libraryBook;