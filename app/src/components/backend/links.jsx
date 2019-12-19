import React from 'react';
import Container from '@material-ui/core/Container';

 export default (props) => {
    return <Container vertical align="stretch">
        <ul>
            <li key='report'><a href="/report">Report</a></li>
            <li key='stores'><a href="/stores">Stores</a></li>
            <li key='categories'><a href="/categories">Categories</a></li>
        </ul>
    </Container>
 }
