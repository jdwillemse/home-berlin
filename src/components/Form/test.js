import React from 'react';

import Form from './index';

describe('Form', () => {
  beforeAll(() => {
    // Mock warn & error to catch errors thrown by React into the console
    console.warn = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    expect(console.warn).not.toBeCalled();
    expect(console.error).not.toBeCalled();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<Form history={{ push: jest.fn() }} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
