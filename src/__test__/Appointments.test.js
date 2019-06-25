import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';

import { BrowserRouter as Router } from 'react-router-dom';
import Enzyme, { shallow, mount } from  'enzyme';
import renderer from 'react-test-renderer';

import Appointments from '../components/appointments';
import Appointment from '../components/appointment';

Enzyme.configure({ adapter: new Adapter() });

describe('render', () => {
  // testing shallow
  it('renders appointments without crashing', () => {
    shallow(<Appointments />);
  });

  /*
  it("should match appointments snapshot", () => {
    const tree = renderer.create(<Router><Appointment appointment={{id:1, title:'Stand up meeting', appt_time: new Date('06/26/2019, 15:00:00')}}/></Router>)
                         .toJSON();
    expect(tree).toMatchSnapshot();
  });*/

});