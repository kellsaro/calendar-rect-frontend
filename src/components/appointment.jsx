import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import $ from 'jquery';

import { formatedDate } from './utils';

export default class Appointment extends React.Component {
  static propTypes = {
    appointment: PropTypes.object.isRequired,
    onDelete: PropTypes.func
  }

  static defaultProps = {
    appointment: {}
  }

  constructor(props) {
    super(props)
    this.state = {
      appointment: props.appointment
    }

    this.base_url = 'http://localhost:3001/api/v1/appointments'	  
  }

  componentDidMount() {
    if(this.props.match) {
      $.ajax({
        type: 'GET',
        url: `${this.base_url}/${this.props.match.params.id}`,
        dataType: 'JSON',
        headers: JSON.parse(sessionStorage.getItem('user'))
      })
      .done( data => {
        this.setState({appointment: data});
      })	  
    }
  }

  handleOnClickDelete = () => {
    if(window.confirm('Are you sure you want to delete this appointment?')){
      $.ajax({
        type: 'DELETE',
        url: `${this.base_url}/${this.state.appointment.id}`,
        dataType: 'JSON',
        headers: JSON.parse(sessionStorage.getItem('user'))
      })
      .done( data => {
        this.props.onDelete();
      });
    }
  }

  render() {
    return (
      <div className='appointment'>
        <Link to={`/appointments/${this.state.appointment.id}`}>		
          <h3>{ this.state.appointment.title }</h3>
        </Link>		
        <p>{ formatedDate(this.state.appointment.appt_time) }</p>
        <Link to={`/appointments/${this.state.appointment.id}/edit`}>
          Edit
        </Link>  
        <span className='hspace' />
        <Link onClick={this.handleOnClickDelete} to='#'>
          Delete
        </Link>  
      </div>
    )
  }
}
