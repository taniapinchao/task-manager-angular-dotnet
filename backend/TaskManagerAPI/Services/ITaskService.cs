using TaskManagerAPI.Models;

namespace TaskManagerAPI.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllAsync();
        Task<TaskItem?> GetByIdAsync(int id);
        Task<TaskItem> CreateAsync(TaskItem tarea);
        Task<bool> UpdateAsync(int id, TaskItem tarea);
        Task<bool> DeleteAsync(int id);
    }
}