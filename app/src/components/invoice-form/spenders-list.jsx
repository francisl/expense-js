import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';

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
      <Container tokens={{ childrenGap: 10 }}>
          {spenders}
      </Container>);
}
