import React from 'react';
import { render } from '@testing-library/react';
import { ionFireEvent as fireEvent } from '@ionic/react-test-utils';
import Home, { Todo } from './Home';

function mockFetch(data: any) {
    return jest.spyOn(window, 'fetch').mockResolvedValue(new Response(JSON.stringify(data)));
}
  
beforeEach(() => mockFetch([]));
  
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

    mockFetch(todos);
    
    const { findByText } = render(<Home/>);
    await findByText(todos[0].text);
    await findByText(todos[1].text);
})

test('when clicking the new button, we should be able to add a new todo', async () => {
    const { findByTitle, findByText } = render(<Home />);
    const addButton = await findByTitle('Add Todo');  
    fireEvent.click(addButton);

    const input = await findByTitle('Todo Text');
    const button = await findByText('Save');

    fireEvent.ionChange(input, 'test todo');
    fireEvent.click(button);
    await findByText('test todo');
});

