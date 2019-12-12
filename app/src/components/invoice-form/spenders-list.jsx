import React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

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
      <Stack tokens={{ childrenGap: 10 }}>
          {spenders}
      </Stack>);
}
