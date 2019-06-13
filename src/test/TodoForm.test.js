import React from 'react';
import { shallow } from 'enzyme';
import TodoForm from '../TodoForm';
import { assert } from 'chai';

const noop = () => {};

describe('<TodoForm>', () => {
    it('should render a <form.todo>', () => {
        let wrapper = shallow(<TodoForm onSubmit={noop} />);

        assert.strictEqual(wrapper.find('form.todo').length, 1, "No <form> rendered by <TodoForm>");
    });

    it.skip('should prefill the form with the prop.description', () => {
        let taskName = 'cats';
        let wrapper = shallow(<TodoForm description={taskName} onSubmit={noop}/>);

        assert.strictEqual(wrapper.find('input[name="description"]').prop('value'), taskName);
    });
});
