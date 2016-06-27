import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {};

export let Segment = (props) => {
    const { children, ...otherProps } = props;
    const classes = classNames(`ui raised segment`);

    return <div className={classes} {...otherProps}>{props.children}</div>;
};

// Segment.propTypes = propTypes;
