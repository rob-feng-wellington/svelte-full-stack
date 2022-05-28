import type { RequestEvent } from '@sveltejs/kit';

let todos: Todo[] = [];

export const api = (request: RequestEvent, todoItem?: Todo) => {
    let body = {};
    let status = 500;

    switch (request.request.method.toUpperCase()) {
        case 'GET':
            body = todos;
            status = 200;
            break;
        case 'POST':
            todos.push(todoItem as Todo);
            body = todoItem as Todo;
            status = 201;
            break;
        case 'DELETE':
            todos = todos.filter((todo: Todo) => todo.uid !== request.params.uid);
            break;
        default:
            break;
    }

    if (request.request.method.toUpperCase() !== "GET") {
        return {
            status: 303,
            headers: {
                location: '/'
            }
        }
    }

    return { status, body};
}