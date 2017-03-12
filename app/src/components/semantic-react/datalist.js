import React from 'react';
import { Component } from 'react';

export class DataList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            rendered: undefined
        };
        console.log('DataList Constructor called....');
    }

    render() {
            const id = this.props.fieldId;
            const key = this.props.listKey;
            const list = this.props.list;

            if (this.state.rendered === undefined){
                if ( list.length === 0){
                    return <datalist id={id}></datalist>;
                }
                const options = list.map((c) => {
                    return <option value={c[key]} key={c[key]} />;
                });
                this.state.rendered = (<datalist id={id}>{options}</datalist>);
            }
            return this.state.rendered;
    }
}
