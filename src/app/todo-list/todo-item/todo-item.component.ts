import {
  Component,
  inject,
  input,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { TodoDataService } from '../../services/todo-data.service';
import { EmptyTodo, Todo } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '../../pipes/date.pipe';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  editMode = false;
  titleInput: string = '';
  todoData = inject(TodoDataService);

  todo = input<Todo>(EmptyTodo);
  newItemEvent: OutputEmitterRef<string> = output<string>();

  constructor() {}

  updateTask() {
    this.todo().done = !this.todo().done;
    this.todoData.updateTodo(this.todo());
    if (this.todo().done)
      this.newItemEvent.emit(this.todo().label + ' is done !');
  }

  updateTitle() {
    const task = this.todo().label;
    this.todo().label = this.titleInput;
    this.todoData.updateTodo(this.todo());
    this.editMode = false;
    this.newItemEvent.emit(task + ' has been updated to ' + this.todo().label);
  }

  enterEditMode() {
    this.editMode = true;
  }
}
