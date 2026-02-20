import { Component } from '@angular/core';
import { TaskList } from './components/task-list/task-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskList],
  template: `
    <div class="container">
      <h1>Gestión de Tareas</h1>
      <app-task-list></app-task-list>
    </div>
  `,
  styles: [`
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    h1 {
      text-align: center;
      color: #333;
    }
  `]
})
export class AppComponent {
  title = 'task-manager-frontend';
}