import { Component, inject, TemplateRef } from '@angular/core';
import { TodoDataService } from '../services/todo-data.service';
import { Todo } from '../models/todo.model';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  public newTask: string = '';
  public todos: Todo[] = [];

  todoData = inject(TodoDataService);
  toastService = inject(ToastService);

  constructor() {
    this.todoData.createTodo('Angular-18');
    this.todoData.createTodo('Zoneless');
    this.todoData.createTodo('Input&Output Signals');
    this.updateList();
  }

  notifyUser(template: TemplateRef<any>): void {
    this.toastService.show({
      template,
      classname: 'bg-success text-light',
      delay: 10000,
    });
  }

  ngOnInit() {}

  updateList() {
    this.todos = this.todoData.getTodos();
  }

  addTask(template: TemplateRef<any>) {
    this.todoData.createTodo(this.newTask);
    this.updateList();
    this.toastService.show({
      template,
      classname: 'bg-success text-light',
      delay: 10000,
    });
    this.newTask = '';
  }
}
