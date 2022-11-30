// db.ts
import Dexie, { Table } from 'dexie';
import { Task } from './Task';

export interface TodoList {
  id?: number;
  title: string;
}
export interface TodoItem {
  id?: number;
  todoListId: number;
  title: string;
  done?: boolean;
}

export class AppDB extends Dexie {
  todoItems!: Table<TodoItem, number>;
  todoLists!: Table<TodoList, number>;
  tasks!: Table<Task, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      todoLists: '++id',
      todoItems: '++id, todoListId',
      tasks: '++id'
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    const todoListId = await db.todoLists.add({
      title: 'To Do Today',
    });
    await db.todoItems.bulkAdd([
      {
        todoListId,
        title: 'Feed the birds',
      },
      {
        todoListId,
        title: 'Watch a movie',
      },
      {
        todoListId,
        title: 'Have some sleep',
      },
    ]);

    await db.tasks.bulkAdd([
      {
        text: 'Test',
        day: 'Yesterday',
        reminder: false
      },
      {
        text: 'Test1',
        day: 'Today',
        reminder: true
      },
      {
        text: 'Test2',
        day: 'Tomorrow',
        reminder: true
      }
    ]);
  }
}

export const db = new AppDB();