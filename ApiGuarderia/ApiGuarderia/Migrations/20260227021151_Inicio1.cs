using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiGuarderia.Migrations
{
    /// <inheritdoc />
    public partial class Inicio1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cuidadores",
                columns: table => new
                {
                    cuidador_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    especialidad = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                    telefono = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    email = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cuidadores", x => x.cuidador_id);
                });

            migrationBuilder.CreateTable(
                name: "Ninos",
                columns: table => new
                {
                    nino_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    apellido = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    fecha_nacimiento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    alergias = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ninos", x => x.nino_id);
                });

            migrationBuilder.CreateTable(
                name: "Asignaciones",
                columns: table => new
                {
                    asignacion_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nino_id = table.Column<int>(type: "int", nullable: false),
                    cuidador_id = table.Column<int>(type: "int", nullable: false),
                    fecha_asignacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    estado = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Asignaciones", x => x.asignacion_id);
                    table.ForeignKey(
                        name: "FK_Asignaciones_Cuidadores_cuidador_id",
                        column: x => x.cuidador_id,
                        principalTable: "Cuidadores",
                        principalColumn: "cuidador_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Asignaciones_Ninos_nino_id",
                        column: x => x.nino_id,
                        principalTable: "Ninos",
                        principalColumn: "nino_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Asignaciones_cuidador_id",
                table: "Asignaciones",
                column: "cuidador_id");

            migrationBuilder.CreateIndex(
                name: "IX_Asignaciones_nino_id",
                table: "Asignaciones",
                column: "nino_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Asignaciones");

            migrationBuilder.DropTable(
                name: "Cuidadores");

            migrationBuilder.DropTable(
                name: "Ninos");
        }
    }
}
