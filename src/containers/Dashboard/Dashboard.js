import React, { Component } from 'react';
import { Container, Header, Grid, Card } from 'semantic-ui-react';

import { categoryOptions } from '../../shared/filterOptions';
import './Dashboard.css';

class Dashboard extends Component {

    cardClickHandler = (categoryText) => {
        console.log(categoryText);

        this.props.history.push('/store?category=' + categoryText);
    }

    render() {
        let categories = (
            <Grid columns="equal" stackable>
                {categoryOptions.map(category => (
                    <Grid.Column key={category.key}>
                        <Card
                            fluid
                            color={category.color}
                            onClick={() => { this.cardClickHandler(category.text) }}>
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
                <Header style={{paddingTop:"1rem"}}>Top Popular</Header>

            </Container>
        );
    }
}

export default Dashboard;