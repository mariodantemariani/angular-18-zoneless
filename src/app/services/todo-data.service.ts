import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  todos: Todo[] = [];
  id: number = this.todos.length;

  constructor() {}

  getTodos(): Todo[] {
    return JSON.parse(JSON.stringify(this.todos));
  }

  createTodo(label: string): void {
    this.todos.push({
      label: label,
      done: false,
      id: this.id,
      createDate: new Date().valueOf(),
    });
    this.id += 1;
  }

  updateTodo(todo: Todo): void {
    var index = this.todos.findIndex((t) => t.id === todo.id);
    this.todos[index] = todo;
  }
}
