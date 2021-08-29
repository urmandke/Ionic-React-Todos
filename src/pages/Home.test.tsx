import React from 'react';
import { render } from '@testing-library/react';
import Home, { Todo } from './Home';

test('page should have a title of Ionic React Todos', async () => {
  const { findByText } = render(<Home />);
  await findByText('Ionic React Todos');
});

test('when there are no todos, a no todos message should show', async () => {
    const { findByText } = render(<Home />);
    await findByText('No todos, add some!')
});

test('when ToDoList is loaded with todos, the todos should be in the list', async() =>{
    const todos: Todo[] = [
        {id: 1, text:'review PR'},
        {id: 2, text:'update docs'}
    ];
    
    const { findByText } = render(<Home/>);
    await findByText(todos[0].text);
    await findByText(todos[1].text);
})