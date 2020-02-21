import React from 'react';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

export default (props) => (
  <Header className="header">
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="dashboard"><a href="/">Dashboard</a></Menu.Item>
      <Menu.Item key="report"><a href="/report">Report</a></Menu.Item>
      <Menu.Item key="stores"><a href="/stores">Stores</a></Menu.Item>
      <Menu.Item key="categories"><a href="/categories">Categories</a></Menu.Item>
    </Menu>
  </Header>
)
