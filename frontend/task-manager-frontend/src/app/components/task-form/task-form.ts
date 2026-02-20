import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, TaskItem } from '../../services/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm implements OnInit {
  @Input() task: TaskItem | null = null;
  @Output() close = new EventEmitter<void>();

  titulo = '';
  descripcion = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    if (this.task) {
      this.titulo = this.task.titulo;
      this.descripcion = this.task.descripcion;
    }
  }

  save(): void {
    if (!this.titulo.trim()) return;

    if (this.task) {
      const updated: TaskItem = {
        ...this.task,
        titulo: this.titulo,
        descripcion: this.descripcion
      };
      this.taskService.updateTask(this.task.id, updated).subscribe(() => {
        this.close.emit();
      });
    } else {
      const newTask: TaskItem = {
        id: 0,
        titulo: this.titulo,
        descripcion: this.descripcion,
        fechaCreacion: new Date().toISOString(),
        completada: false
      };
      this.taskService.createTask(newTask).subscribe(() => {
        this.close.emit();
      });
    }
  }

  cancel(): void {
    this.close.emit();
  }
}