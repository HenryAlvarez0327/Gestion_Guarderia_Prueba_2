import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AsignacionService } from '../../services/asignacion.service';
import { NinoService } from '../../services/nino.service';
import { CuidadorService } from '../../services/cuidador.service';

@Component({
  selector: 'app-nueva-asignacion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './nueva-asignacion.html',
  styleUrl: './nueva-asignacion.css'
})
export class NuevaAsignacion implements OnInit {

  esEdicion = false;
  id = 0;

  hoy = new Date().toISOString().substring(0, 10);

  ninos: any[] = [];
  cuidadores: any[] = [];

  asignacion: any = {
    asignacion_id: 0,
    nino_id: 0,
    cuidador_id: 0,
    fecha_asignacion: this.hoy,
    estado: 'Activo'
  };

  constructor(
    private asignacionService: AsignacionService,
    private ninoService: NinoService,
    private cuidadorService: CuidadorService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarCombos();

    this.route.paramMap.subscribe(params => {
      const pid = params.get('id');
      this.id = Number(pid || 0);
      this.esEdicion = this.id > 0;

      if (this.esEdicion) {
        this.cargarParaEditar(this.id);
      }
    });
  }

  cargarCombos() {
    this.ninoService.todos().subscribe({
      next: (data) => {
        this.ninos = data ?? [];
        this.cdr.detectChanges();
      }
    });

    this.cuidadorService.todos().subscribe({
      next: (data) => {
        this.cuidadores = data ?? [];
        this.cdr.detectChanges();
      }
    });
  }

  cargarParaEditar(id: number) {
    this.asignacionService.uno(id).subscribe({
      next: (data: any) => {
        this.asignacion = { ...data };

       
        const s = String(this.asignacion.fecha_asignacion ?? '');
        if (s.includes('T')) this.asignacion.fecha_asignacion = s.substring(0, 10);

        this.cdr.detectChanges();
        setTimeout(() => this.cdr.detectChanges(), 0);
      },
      error: (err) => {
        console.log('❌ Error cargando asignación:', err);
        alert('No se pudo cargar la asignación');
        this.router.navigate(['/asignaciones']);
      }
    });
  }

  guardar() {
   
    if (!this.asignacion.nino_id || this.asignacion.nino_id === 0) {
      alert('Selecciona un niño');
      return;
    }

    if (!this.asignacion.cuidador_id || this.asignacion.cuidador_id === 0) {
      alert('Selecciona un cuidador');
      return;
    }

    if (!this.asignacion.fecha_asignacion) {
      alert('Selecciona una fecha');
      return;
    }

   
    if (this.asignacion.fecha_asignacion > this.hoy) {
      alert('La fecha no puede ser futura');
      return;
    }

    
    if (!['Activo', 'Inactivo'].includes(this.asignacion.estado)) {
      alert('Estado inválido');
      return;
    }

 
    if (this.esEdicion) {
      this.asignacion.asignacion_id = this.id;

      this.asignacionService.editar(this.id, this.asignacion).subscribe({
        next: () => {
          alert('✅ Actualizado');
          this.router.navigate(['/asignaciones']);
        },
        error: (err) => {
          console.log('❌ Error actualizar:', err);
          alert('❌ Error al actualizar (revisa consola)');
        }
      });

    } else {
      this.asignacionService.nuevo(this.asignacion).subscribe({
        next: () => {
          alert('✅ Guardado');
          this.router.navigate(['/asignaciones']);
        },
        error: (err) => {
          console.log('❌ Error guardar:', err);
          
          alert(err?.error || '❌ Error al guardar (revisa consola)');
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/asignaciones']);
  }
}