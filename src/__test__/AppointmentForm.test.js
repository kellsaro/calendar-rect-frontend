import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';

import { BrowserRouter as Router } from 'react-router-dom';
import Enzyme, { shallow, mount } from  'enzyme';
import renderer from 'react-test-renderer';

import AppointmentForm from '../components/appointment-form';

Enzyme.configure({ adapter: new Adapter() });

describe('render', () => {
  // test shallow
  it('renders AppointmentForm without crashing', () => {
    shallow(<AppointmentForm />);
  });

  // test 
  it("toggles form submit button disabled status based on form validity", () => {
    const appointmentForm = mount(<Router><AppointmentForm /></Router>);
    expect(appointmentForm.find('.submit-button').props().disabled).toEqual(true);

    appointmentForm.find('[name="title"]')
                   .simulate('change', { target: {
                      value: 'a valid title',
                      name: 'title'
                    }});

    appointmentForm.find('.rdtNext span')
                   .at(0)
                   .simulate('click');

    appointmentForm.find('.rdtDay')
                   .at(10)
                   .simulate('click');
    expect(appointmentForm.find('.submit-button').props().disabled).toEqual(false);                              
  });

  // test AppointmentForm snapshot
  it("should match AppointmentForm snapshot", () => {
    const tree = renderer.create(<Router><AppointmentForm /></Router>)
                         .toJSON();
    expect(tree).toMatchSnapshot();
  });

});