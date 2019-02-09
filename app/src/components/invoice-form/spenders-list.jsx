import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default (props) => {
  const { onUpdate } = props
  const spenders = props.spenders.map((s) => (
    <FormGroup row>
      <FormControlLabel
        control={<Checkbox
          onChange={onUpdate}
          value={s.id}
          checked={s.selected}
          color="primary"
        />}
        label={s.name}
      />
    </FormGroup>
  ));
  return (<div className="large-input">{spenders}</div>);
}
