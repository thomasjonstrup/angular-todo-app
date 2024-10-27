import { Component, Input } from '@angular/core';
import { liveQuery } from 'dexie';
import { db, TodoList } from '../../db';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent {
  @Input()
  todoList!: TodoList;
  // Observe an arbitrary query:
  todoItems$ = liveQuery(
    () => this.listTodoItems()
  );

  async listTodoItems() {
    return await db.todoItems
      .where({
        todoListId: this.todoList.id,
      })
      .toArray();
  }

  async addItem() {
    await db.todoItems.add({
      title: this.itemName,
      todoListId: this.todoList.id || 0,
    });
  }

  async toggleItem (itemID: number) {
    db.todoItems.where({id: itemID}).modify(item => item.done = !item.done);
  }

  itemName = 'My new item';
}
