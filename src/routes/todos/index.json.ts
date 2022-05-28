import type { RequestHandler } from '@sveltejs/kit';

let todos: Todo[] = [];

export const get: RequestHandler = () => {
    return {
        status: 200,
        body: todos
    }
}

export const post: RequestHandler<{}, FormData> = async ({request}) => {
    const data = await request.formData();

    todos.push({
        created_at: new Date(),
        text: data.get('text') as string,
        done: false
    });
    return {
        status: 303,
        headers: {
            location: "/"
        }
    }
}