import React from 'react';
import { Component } from 'react';
import _ from 'lodash';

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
        return <div className="inline field">
                    { this.props.spenders.map(
                        (s) => {
                            return <div key={s.id} className="ui checkbox" onChange={this.onCheck}>
                                <input type="checkbox" name="spenders" value={s.id} checked={ _.some(this.props.selected, (e) => { return parseInt(e) === s.id })} />
                                <label>{s.name}</label>
                            </div>;
                        })
                    }
            </div>;
        }
}
