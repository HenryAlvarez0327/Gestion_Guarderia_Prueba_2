using System.ComponentModel.DataAnnotations;

namespace ApiGuarderia.Models
{
    public class CuidadorModels
    {
        [Key]
        public int cuidador_id { get; set; }

        [Required, MaxLength(120)]
        public string nombre { get; set; } = string.Empty;

        [MaxLength(120)]
        public string? especialidad { get; set; }

        [MaxLength(30)]
        public string? telefono { get; set; }

        [MaxLength(120)]
        public string? email { get; set; }
    }
}
