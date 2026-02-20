# Task Manager - Angular + .NET

Prueba técnica - CRUD de tareas con Angular y .NET

## Descripción
Aplicación web para gestionar tareas con operaciones CRUD (Crear, Leer, Actualizar y Eliminar), desarrollada con Angular en el frontend y .NET Web API en el backend.

## Requisitos previos
- Node.js y npm instalados
- Angular CLI instalado
- .NET SDK instalado

## Cómo ejecutar el proyecto

### Backend (.NET)
1. Abre la carpeta `backend/TaskManagerAPI` en Visual Studio
2. Ejecuta el proyecto presionando **F5**
3. La API estará disponible en: `https://localhost:7117`
4. Puedes probar los endpoints en: `https://localhost:7117/swagger`

### Frontend (Angular)
1. Abre una terminal y navega a la carpeta:
```
cd frontend/task-manager-frontend
```
2. Instala las dependencias:
```
npm install
```
3. Ejecuta la aplicación:
```
ng serve
```
4. Abre el navegador en: `http://localhost:4200`

## Funcionalidades
- Listar todas las tareas
- Crear una nueva tarea
- Editar una tarea existente
- Eliminar una tarea con confirmación
- Marcar una tarea como completada o pendiente

## Tecnologías usadas
- Angular 19
- .NET Web API
- Entity Framework Core (InMemory)
- Font Awesome