import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import TodoList from '../TodoList';
import Todo from '../Todo';

describe('<TodoList>', () => {
    it('should render a <ul class="todo-list">', () => {
        let wrapper = shallow(<TodoList todos={[]} />);

        assert.strictEqual(wrapper.find('ul.todo-list').length, 1, "Failed to render TodoList as a <ul>");
    });

    it('should render each todo item in props.todos as a Todo', () => {
        let todos = [
            { description: 'test item 1', done: false },
            { description: 'test item 2', done: true },
            { description: 'test item 3', done: false },
            { description: 'test item 4', done: true },
        ];

        let wrapper = shallow(<TodoList todos={todos} />);

        assert.strictEqual(wrapper.find(Todo).length, todos.length, "Did not render a Todo for each todo in props.todo");
    });
});