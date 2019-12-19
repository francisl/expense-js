import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

 export default (props) => {
    return <Layout vertical align="stretch">
        <Content>
            <ul>
                <li key='report'><a href="/report">Report</a></li>
                <li key='stores'><a href="/stores">Stores</a></li>
                <li key='categories'><a href="/categories">Categories</a></li>
            </ul>
        </Content>
    </Layout>
 }
