using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiGuarderia.Models
{
    public class AsignacionModels
    {
        [Key]
        public int asignacion_id { get; set; }

        [ForeignKey("Nino")]
        public int nino_id { get; set; }

        [ForeignKey("Cuidador")]
        public int cuidador_id { get; set; }

        public DateTime fecha_asignacion { get; set; } = DateTime.Today;

        [MaxLength(20)]
        public string estado { get; set; } = "Activo";
        public NinoModels? Nino { get; set; }
        public CuidadorModels? Cuidador { get; set; }
    }
}
