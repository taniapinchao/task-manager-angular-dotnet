import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css']
})
export class TasksComponent implements OnInit {

  tasks = signal<Task[]>([]);

  // Objeto para el modal (crear o editar)
  tareaModal: Partial<Task> = {};

  isEditMode = false; // Controla si es edición o creación

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas() {
    this.taskService.getTasks().subscribe({
      next: data => this.tasks.set(data),
      error: err => console.error(err)
    });
  }

  abrirModalCrear() {
    this.isEditMode = false;
    this.tareaModal = { titulo: '', descripcion: '', completada: false };
  }

  abrirModalEditar(task: Task) {
    this.isEditMode = true;
    this.tareaModal = { ...task }; // Copiamos solo la tarea seleccionada
  }

  guardarTarea() {
    if (!this.tareaModal.titulo?.trim()) return;

    const ahora = new Date().toISOString();

    if (this.isEditMode && this.tareaModal.id != null) {
      // Actualizar solo la tarea seleccionada
      const actualizada: Task = {
        id: this.tareaModal.id,
        titulo: this.tareaModal.titulo!,
        descripcion: this.tareaModal.descripcion || '',
        completada: this.tareaModal.completada ?? false,
        fechaCreacion: ahora,  // nueva fecha
        editada: true          // marcar como editada
      };

      this.taskService.updateTask(this.tareaModal.id, actualizada)
        .subscribe(() => {
          // Reemplaza solo la tarea editada en el signal
          this.tasks.update(tareas => tareas.map(t =>
            t.id === actualizada.id ? actualizada : t
          ));
        });

    } else {
      // Crear nueva tarea
      const nueva: Task = {
        id: 0, // Temporal; el backend asignará ID
        titulo: this.tareaModal.titulo!,
        descripcion: this.tareaModal.descripcion || '',
        completada: false,
        fechaCreacion: ahora,
        editada: false
      };

      this.taskService.createTask(nueva)
        .subscribe(creada => {
          this.tasks.update(tareas => [...tareas, creada]);
        });
    }
  }

  eliminarTarea(id?: number) {
    if (id == null) return; // seguridad
    this.taskService.deleteTask(id).subscribe(() => this.cargarTareas());
  }

  cambiarEstado(task: Task) {
    if (task.id == null) return; // seguridad: salir si no tiene id

    const actualizada: Task = {
      ...task,
      completada: !task.completada
    };

    this.taskService.updateTask(task.id, actualizada).subscribe(() => {
      // actualizar solo la tarea modificada en el signal
      this.tasks.update(tareas => tareas.map(t =>
        t.id === task.id ? actualizada : t
      ));
    });
  }

}