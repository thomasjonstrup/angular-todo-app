import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {db, TodoList} from '../db'
import { liveQuery } from 'dexie';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list/item-list.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, CommonModule, ItemListComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo-app';
  todoLists$ = liveQuery(() => db.todoLists.toArray());
  listName = 'My new list';

  async addNewList() {
    await db.todoLists.add({
      title: this.listName
    });
  }

  identifyList (index: number, list: TodoList) {
    return `${list.id}${list.title}`;
  }
}
