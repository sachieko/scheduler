import React from 'react';
import classNames from 'classnames';

import 'components/Button.scss';

const Button = props => {
  const classes = classNames('button', { 'button--confirm': props.confirm, 'button--danger': props.danger })
  return <><button className={classes} {...props}>{props.children}</button></>;
}

export default Button;
