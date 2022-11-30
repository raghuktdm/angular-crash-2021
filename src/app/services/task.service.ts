import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Task } from '../db/Task';
import { liveQuery} from 'dexie';
import { db } from '../db/AppDB';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  constructor() {}

  getTasks(): Observable<Task[]> {
    return from(liveQuery(() => db.tasks.toArray())); // from converts Dexie Observable to RxJs observable
  }

  deleteTask(task: Task): Observable<void> {
    return from(db.tasks.delete(task.id));
  }

  updateTaskReminder(task: Task): Observable<number> {
    return from(db.tasks.update(task.id, {reminder: task.reminder}));
  }

  addTask(task: Task): Observable<number> {
    return from(db.tasks.put(task));
  }
}
