import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, TaskItem } from '../../services/task';
import { TaskForm } from '../task-form/task-form';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskForm],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {
  tasks: TaskItem[] = [];
  selectedTask: TaskItem | null = null;
  showForm = false;
  showDeleteModal = false;
  taskToDelete: number | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  openForm(task?: TaskItem): void {
    this.selectedTask = task || null;
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.selectedTask = null;
    this.loadTasks();
  }

  deleteTask(id: number): void {
    this.taskToDelete = id;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.taskToDelete !== null) {
      this.taskService.deleteTask(this.taskToDelete).subscribe(() => {
        this.loadTasks();
        this.showDeleteModal = false;
        this.taskToDelete = null;
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.taskToDelete = null;
  }

  
  toggleComplete(task: TaskItem): void {
    task.completada = !task.completada;
    this.taskService.updateTask(task.id, task).subscribe();
  }
}