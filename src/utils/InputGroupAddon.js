import React from 'react';

export const InputGroupAddon = (props) => (
  <div className="input-group-prepend">
    <span className="input-group-text">
      {props.children}
    </span>
  </div>
);
