using System.ComponentModel.DataAnnotations;

namespace ApiGuarderia.Models
{
    public class NinoModels
    {
        [Key]
        public int nino_id { get; set; }

        [Required, MaxLength(80)]
        public string nombre { get; set; } = string.Empty;

        [Required, MaxLength(80)]
        public string apellido { get; set; } = string.Empty;

        public DateTime fecha_nacimiento { get; set; }

        [MaxLength(200)]
        public string? alergias { get; set; }
    }
}
