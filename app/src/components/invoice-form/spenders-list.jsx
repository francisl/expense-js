import React from 'react';
import { Checkbox } from 'antd';
import { Layout } from 'antd';
const { Content } = Layout;

export default (props) => {
  const spenders = props.spenders.map((s) => (
    <Checkbox
      key={s.id}
      onChange={props.onUpdate}
      label={s.name}
      checked={s.selected}
      id={s.id}
    />));
  return (
    <Layout vertical tokens={{ childrenGap: 10 }} styles={{ root: { width: '240px' } }}>
        <Content>
            {spenders}
        </Content>
    </Layout>);
}
