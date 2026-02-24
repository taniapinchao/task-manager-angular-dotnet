using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Data;
using TaskManagerAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// 1️⃣ DbContext InMemory (desarrollo)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("TaskDb"));

// 2️⃣ CORS para Angular
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Angular dev server
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 3️⃣ Servicios
builder.Services.AddScoped<ITaskService, TaskService>();

// 4️⃣ Controladores y Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 5️⃣ Swagger solo en desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 6️⃣ Usar CORS
app.UseCors("AllowAngular");

// 7️⃣ Autorización (si la tienes)
app.UseAuthorization();

// 8️⃣ Mapear controladores
app.MapControllers();

// 9️⃣ Ejecutar app
app.Run();