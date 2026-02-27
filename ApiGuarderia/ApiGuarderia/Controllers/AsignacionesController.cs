using ApiGuarderia.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiGuarderia.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AsignacionesController : ControllerBase
    {
        private readonly ApiGuarderiaDbContext _context;

        public AsignacionesController(ApiGuarderiaDbContext context)
        {
            _context = context;
        }


        // GET: api/Asignaciones

        [HttpGet]
        public async Task<IActionResult> GetAsignaciones()
        {
            var lista = await _context.Asignaciones
                .Include(a => a.Nino)
                .Include(a => a.Cuidador)
                .AsNoTracking()
                .ToListAsync();

            return Ok(lista);
        }

        // GET: api/Asignaciones/5

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetAsignacion(int id)
        {
            var asignacion = await _context.Asignaciones
                .Include(a => a.Nino)
                .Include(a => a.Cuidador)
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.asignacion_id == id);

            if (asignacion == null)
                return NotFound("Asignación no encontrada");

            return Ok(asignacion);
        }


        // POST: api/Asignaciones

        [HttpPost]
        public async Task<IActionResult> CreateAsignacion([FromBody] AsignacionModels asignacion)
        {
            if (asignacion == null)
                return BadRequest("Datos inválidos");

           
            if (asignacion.fecha_asignacion == default)
                asignacion.fecha_asignacion = DateTime.Today;

            
            if (string.IsNullOrWhiteSpace(asignacion.estado))
                asignacion.estado = "Activo";

     
            var existeNino = await _context.Ninos.AnyAsync(n => n.nino_id == asignacion.nino_id);
            var existeCuidador = await _context.Cuidadores.AnyAsync(c => c.cuidador_id == asignacion.cuidador_id);

            if (!existeNino)
                return BadRequest("El niño no existe");

            if (!existeCuidador)
                return BadRequest("El cuidador no existe");
            var duplicadoActivo = await _context.Asignaciones.AnyAsync(a =>
                a.nino_id == asignacion.nino_id &&
                a.cuidador_id == asignacion.cuidador_id &&
                a.estado == "Activo"
            );

            if (duplicadoActivo)
                return BadRequest("Ya existe una asignación ACTIVA para este niño y cuidador.");

            _context.Asignaciones.Add(asignacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAsignacion), new { id = asignacion.asignacion_id }, asignacion);
        }


        // PUT: api/Asignaciones/5
        // Cambiar estado o actualizar datos

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateAsignacion(int id, [FromBody] AsignacionModels asignacion)
        {
            if (asignacion == null)
                return BadRequest("Datos inválidos");

            if (id != asignacion.asignacion_id)
                return BadRequest("El ID no coincide");

            var existe = await _context.Asignaciones.AnyAsync(a => a.asignacion_id == id);
            if (!existe)
                return NotFound("Asignación no encontrada");

            _context.Entry(asignacion).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Asignaciones/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteAsignacion(int id)
        {
            var asignacion = await _context.Asignaciones.FindAsync(id);

            if (asignacion == null)
                return NotFound("Asignación no encontrada");

            _context.Asignaciones.Remove(asignacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}