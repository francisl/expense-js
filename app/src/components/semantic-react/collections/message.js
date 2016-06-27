import React from 'react';
import { Component } from 'react';
import classNames from 'classnames';

export class Message extends Component {

    render(){
		const { className, ...otherProps } = this.props;
		const classes = classNames({
		    'ui': true,
		    'message': true
		}, className);

        return <div className={classes} {...otherProps}>{this.props.children}</div>;
    }
}
