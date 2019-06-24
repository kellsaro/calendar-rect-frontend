import React from 'react';
import PropTypes from 'prop-types';

export const Label = ({label}) => 
  <React.Fragment>
    {label}
  </React.Fragment>

Label.propTypes = {
  label: PropTypes.string
}
