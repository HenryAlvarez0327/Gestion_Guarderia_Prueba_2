using ApiGuarderia.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiGuarderia.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CuidadoresController : ControllerBase
    {
        private readonly ApiGuarderiaDbContext _context;

        public CuidadoresController(ApiGuarderiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCuidadores()
        {
            var lista = await _context.Cuidadores
                .AsNoTracking()
                .ToListAsync();

            return Ok(lista);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCuidador(int id)
        {
            var cuidador = await _context.Cuidadores
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.cuidador_id == id);

            if (cuidador == null) return NotFound("Cuidador no encontrado");

            return Ok(cuidador);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCuidador([FromBody] CuidadorModels cuidador)
        {
            if (cuidador == null) return BadRequest("Datos inválidos");

            _context.Cuidadores.Add(cuidador);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCuidador), new { id = cuidador.cuidador_id }, cuidador);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateCuidador(int id, [FromBody] CuidadorModels cuidador)
        {
            if (cuidador == null) return BadRequest("Datos inválidos");
            if (id != cuidador.cuidador_id) return BadRequest("El ID no coincide");

            var existe = await _context.Cuidadores.AnyAsync(c => c.cuidador_id == id);
            if (!existe) return NotFound("Cuidador no encontrado");

            _context.Entry(cuidador).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCuidador(int id)
        {
            var cuidador = await _context.Cuidadores.FindAsync(id);
            if (cuidador == null) return NotFound("Cuidador no encontrado");

            var tieneAsignaciones = await _context.Asignaciones
                .AnyAsync(a => a.cuidador_id == id && a.estado == "Activo");

            if (tieneAsignaciones)
                return BadRequest("No se puede eliminar porque tiene asignaciones activas.");

            _context.Cuidadores.Remove(cuidador);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}