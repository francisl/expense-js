import React from 'react';
import { Component } from 'react';
import _ from 'lodash';
import { Checkbox } from '@blueprintjs/core';

export default class SpendersList extends Component {
    constructor(props, context){
        super(props, context);
        this.onCheck = this.onCheck.bind(this);
    }

    getSelectedSpenders(target) {
        if (target.checked){
            return  _.concat(this.props.selected, target.value);
        }
        return _.filter(this.props.selected, (s) => {
                return s !== target.value;
        });
    }

    onCheck(e) {
        this.props.onUpdate(this.getSelectedSpenders(e.target));
    }

    render() {
      const spenders = this.props.spenders.map((s) => (
        <Checkbox
          key={s.id}
          onChange={this.onCheck}
          name="spenders"
          value={s.id}
          label={s.name} />));
      return (<div className="large-input">{spenders}</div>);
    }
}
