using Microsoft.EntityFrameworkCore;

namespace ApiGuarderia.Models
{
    public class ApiGuarderiaDbContext : DbContext
    {
        public ApiGuarderiaDbContext(DbContextOptions<ApiGuarderiaDbContext> options) : base(options) { }

        public DbSet<NinoModels> Ninos { get; set; }
        public DbSet<CuidadorModels> Cuidadores { get; set; }
        public DbSet<AsignacionModels> Asignaciones { get; set; }
    }
}