import React from 'react';

import Input from './index';

const inputProps = { onBlur: jest.fn(), addRef: jest.fn() };
const fields = [
  {
    name: 'phone',
    label: 'Phone number',
    type: 'tel',
    pattern: '^+?(d|-|s)+$'
  },
  {
    name: 'fullname',
    label: 'Full name',
    type: 'text'
  },
  {
    name: 'email',
    label: 'Email address',
    type: 'email'
  }
];

describe('Input', () => {
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
    for (let i = 0; i < fields.length; i++) {
      const wrapper = shallow(<Input {...fields[i]} {...inputProps} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    }
  });
});
