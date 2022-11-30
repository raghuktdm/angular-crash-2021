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
    return from(liveQuery(() => db.tasks.toArray())); // from converts to rxjs observable
  }

  deleteTask(task: Task): Observable<Task> {
    return null;
  }

  updateTaskReminder(task: Task): Observable<Task> {
    return null;
  }

  addTask(task: Task): Observable<Task> {
    return null;
  }
}
