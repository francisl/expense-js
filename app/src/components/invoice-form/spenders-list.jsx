import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';

export default (props) => {
  const spenders = props.spenders.map((s) => (
    <FormControlLabel
      control={
        <Checkbox
          key={s.id}
          onChange={props.onUpdate}
          checked={s.selected}
          id={`${s.id}`}
        />
      }
      label={s.name}
    />
    ));
  return ( 
      <Container tokens={{ childrenGap: 10 }}>
          {spenders}
      </Container>);
}
