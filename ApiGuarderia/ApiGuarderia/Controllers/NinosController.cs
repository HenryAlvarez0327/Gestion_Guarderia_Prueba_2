using ApiGuarderia.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiGuarderia.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NinosController : ControllerBase
    {
        private readonly ApiGuarderiaDbContext _context;

        public NinosController(ApiGuarderiaDbContext context)
        {
            _context = context;
        }

        // GET: api/Ninos
        [HttpGet]
        public async Task<IActionResult> GetNinos()
        {
            var ninos = await _context.Ninos
                .AsNoTracking()
                .ToListAsync();

            return Ok(ninos);
        }

        // GET: api/Ninos/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetNinoById(int id)
        {
            var nino = await _context.Ninos
                .AsNoTracking()
                .FirstOrDefaultAsync(n => n.nino_id == id);

            if (nino == null) return NotFound("Niño no encontrado");

            return Ok(nino);
        }

        // POST: api/Ninos
        [HttpPost]
        public async Task<IActionResult> CreateNino([FromBody] NinoModels nino)
        {
            if (nino == null) return BadRequest("Datos inválidos");

          
            if (string.IsNullOrWhiteSpace(nino.nombre) || string.IsNullOrWhiteSpace(nino.apellido))
                return BadRequest("Nombre y apellido son obligatorios.");

            _context.Ninos.Add(nino);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNinoById), new { id = nino.nino_id }, nino);
        }

        // PUT: api/Ninos/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateNino(int id, [FromBody] NinoModels nino)
        {
            if (nino == null) return BadRequest("Datos inválidos");
            if (id != nino.nino_id) return BadRequest("El ID no coincide");

            var existe = await _context.Ninos.AnyAsync(n => n.nino_id == id);
            if (!existe) return NotFound("Niño no encontrado");

            _context.Entry(nino).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateException ex)
            {
                return BadRequest($"Error al actualizar: {ex.Message}");
            }
        }

        // DELETE: api/Ninos/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteNino(int id)
        {
           
            var nino = await _context.Ninos
                .FirstOrDefaultAsync(n => n.nino_id == id);

            if (nino == null) return NotFound("Niño no encontrado");

            var tieneAsignacionesActivas = await _context.Asignaciones
                .AsNoTracking()
                .AnyAsync(a => a.nino_id == id && a.estado == "Activo");

            if (tieneAsignacionesActivas)
                return BadRequest("No se puede eliminar el niño porque tiene asignaciones activas.");

            _context.Ninos.Remove(nino);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}