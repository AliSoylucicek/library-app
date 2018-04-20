import React from 'react';
import { Header, Icon, Segment, Grid } from 'semantic-ui-react';

import './ErrorHeader.css';

const errorHeader = (props) => {

    return (
        <Grid verticalAlign="middle" centered>
            <Segment basic>
                <Header as='h2' icon>
                    <Icon name={props.icon} />
                    {props.header}
                    <Header.Subheader>
                        {props.subHeader}
                    </Header.Subheader>
                    <Header.Subheader >
                    <a onClick={props.onClick} style={{cursor: "pointer"}}>{props.link}</a>
                    </Header.Subheader>
                </Header>
            </Segment>
        </Grid>

    );
};

export default errorHeader;