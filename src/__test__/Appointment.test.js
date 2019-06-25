import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';

import { BrowserRouter as Router } from 'react-router-dom';
import Enzyme, { shallow, mount } from  'enzyme';
import renderer from 'react-test-renderer';

import Appointment from '../components/appointment';

Enzyme.configure({ adapter: new Adapter() });

describe('render', () => {
  // testing shallow
  it('renders appointment without crashing', () => {
    shallow(<Appointment appointment={{id:1, title:'Stand up meeting', appt_time: new Date('06/26/2019, 15:00:00')}}/>);
  });

  // testing composition
  it("should display appointment's title", () => {
    const appointment = mount(<Router><Appointment appointment={{id:1, title:'Stand up meeting', appt_time: new Date()}}/></Router>);
    const title = <h3>Stand up meeting</h3>;
    expect(appointment.contains(title)).toEqual(true);
  });

  /*
  it("should display appointment's time", () => {
    const appointment = mount(<Router><Appointment appointment={{id:2, title:'Stand up meeting', appt_time: new Date('06/26/2019, 15:00:00')}}/></Router>);
    const wrapper = shallow(<Appointment appointment={{id:2, title:'Stand up meeting', appt_time: new Date('06/26/2019, 15:00:00')}}/>);
    console.log(wrapper.debug());
    const appt_time = <p>June 26 2019, 3:00:00 pm</p>;
    expect(appointment.contains(appt_time)).toEqual(true);
  });*/

  // testing snapshot
  it('should match Appointment snapshot', () => {
    const tree = renderer.create(<Router><Appointment appointment={{id:1, title:'Stand up meeting', appt_time: new Date('06/26/2019, 15:00:00')}}/></Router>)
                         .toJSON();
    expect(tree).toMatchSnapshot();
  });

});