import React from 'react';
import { Checkbox, Layout } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const { Content } = Layout;

type Spender = {
  id: string;
  name: string;
  selected: boolean;
}

type SpenderListProps = {
  onUpdate(e: CheckboxChangeEvent): Function;
  spenders: Spender[];
}

export default (props: SpenderListProps) => {
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
    <div style={{ width: '240px' }}>
      {spenders}
    </div>);
}
