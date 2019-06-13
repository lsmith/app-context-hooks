import React from 'react';
import Todo from '../Todo';
import { shallow } from 'enzyme';
import { assert } from 'chai';

describe('<Todo>', () => {
    it('should render as a list item', () => {
        let wrapper = shallow(<Todo description="cats" done />);

        assert.strictEqual(wrapper.find('li').length, 1, "Failed to render Todo as a list item");
    });

    describe('todo text content', () => {
        it('should render the description in the output markup', () => {
            let description = 'cats are heavy';
            let wrapper = shallow(<Todo description={description} />);

            assert.strictEqual(wrapper.find('p').text(), description, "Failed to render Todo text");
        });
    });

    describe('done state', () => {
        it('should render Todos as not done by default', () => {
            let wrapper = shallow(<Todo description="test task" />);

            assert.strictEqual(wrapper.find('li.done').length, 0, "Did not default the 'done' prop to false");
        });

        it('should render done Todos with a "done" class', () => {
            let wrapper = shallow(<Todo description="test task" done />);

            assert.strictEqual(wrapper.find('li.done').length, 1, "Failed to add 'done' class");
        });

        it('should not render not-done Todos with the "done" class', () => {
            let wrapper = shallow(<Todo description="test task" done={false} />);

            assert.strictEqual(wrapper.find('li.done').length, 0, "Incorrectly rendered not-done item with 'done' class");
        });
    });
});