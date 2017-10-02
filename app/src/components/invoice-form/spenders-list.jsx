import React from 'react';
import { Checkbox } from '@blueprintjs/core';

export default (props) => {
  const spenders = props.spenders.map((s) => (
    <Checkbox
      key={s.id}
      onChange={props.onUpdate}
      name="spenders"
      value={s.id}
      label={s.name}
      checked={s.selected}
    />));
  return (<div className="large-input">{spenders}</div>);
}
