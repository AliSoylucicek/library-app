import React, { Component } from 'react';
import { Container, Header, Grid, Segment, Card } from 'semantic-ui-react';

import { categoryOptions } from '../../shared/filterOptions';
import './Dashboard.css';

class Dashboard extends Component {

    cardClick = (e) => {
        console.log(e);
    }

    render() {
        let categories = (
            <Grid columns="equal" stackable>
                {categoryOptions.map(category => (
                    <Grid.Column key={category.key}>
                        <Card
                            fluid
                            color={category.color}
                            onClick={() => { this.cardClick(category.text) }}>
                            <Card.Content>
                                <Card.Header textAlign="center">
                                    {category.text}
                                </Card.Header>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                ))}

            </Grid>
        );

        return (
            <Container fluid>
                <Header style={{paddingTop:"1rem"}}>Categories</Header>
                {categories}

            </Container>
        );
    }
}

export default Dashboard;