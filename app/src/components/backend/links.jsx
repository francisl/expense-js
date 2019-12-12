import React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

 export default (props) => {
    return <Stack vertical align="stretch">
        <ul>
            <li key='report'><a href="/report">Report</a></li>
            <li key='stores'><a href="/stores">Stores</a></li>
            <li key='categories'><a href="/categories">Categories</a></li>
        </ul>
    </Stack>
 }
