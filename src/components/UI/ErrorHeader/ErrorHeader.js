import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';

const errorHeader = (props) => {
    return (
        <Segment compact padded basic style={{ margin: "25vh auto" }}>
            <Header as='h2' icon textAlign="center">
                <Icon name={props.icon} />
                {props.header}
                <Header.Subheader>
                    {props.subHeader}
                </Header.Subheader>
            </Header>
        </Segment>

    );
};

export default errorHeader;