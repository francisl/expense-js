import React from 'react';
import { Checkbox, Layout } from 'antd';

const { Content } = Layout;

export default (props) => {
  const spenders = props.spenders.map((s) => (
    <Checkbox
      key={s.id}
      onChange={props.onUpdate}
      
      checked={s.selected}
      id={`${s.id}`}
    >
      {s.name}
    </Checkbox>
  ));
  
  return (
    <div styles={{ root: { width: '240px' } }}>
      {spenders}
    </div>);
}
