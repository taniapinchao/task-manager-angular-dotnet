export interface Task {
  id?: number;          // <- ahora opcional
  titulo: string;
  descripcion: string;
  fechaCreacion: string;
  completada: boolean;
  editada?: boolean;    // opcional
}