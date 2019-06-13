import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';

import App from '../App';
import TodoList from '../TodoList';
import TodoForm from '../TodoForm';

describe('<App />', () => {
    it('should render without crashing', () => {
        let wrapper = shallow(<App />);

        assert.strictEqual(wrapper.find('main.app-content').length, 1, "Could not find rendered <App>")
    });

    it('should render a TodoForm if passed an onAdd handler', () => {
        let wrapper = shallow(<App onAdd={() => {}} />);

        assert.strictEqual(wrapper.find(TodoForm).length, 1, "Could not find the TodoList");
    });

    it.skip('should not render a TodoForm if not passed an onAdd handler', () => {
        let wrapper = shallow(<App />);

        assert.strictEqual(wrapper.find(TodoForm).length, 0, "Could not find the TodoList");
    });

    it('should render a TodoList', () => {
        let wrapper = shallow(<App />);

        assert.strictEqual(wrapper.find(TodoList).length, 1, "Could not find the TodoList");
    });
});