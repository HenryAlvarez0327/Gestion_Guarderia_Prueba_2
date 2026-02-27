import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NinoService } from '../../services/nino.service';

@Component({
  selector: 'app-nuevo-nino',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './nuevo-nino.html',
  styleUrl: './nuevo-nino.css'
})
export class NuevoNino implements OnInit {

  esEdicion = false;
  id = 0;

  nino: any = {
    nino_id: 0,
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    alergias: ''
  };

  constructor(
    private service: NinoService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const pid = params.get('id');
      this.id = Number(pid || 0);
      this.esEdicion = this.id > 0;

      if (this.esEdicion) {
        this.cargarParaEditar(this.id);
      }
    });
  }

  private normalizarFechaParaInputDate(valor: any): string {
    if (!valor) return '';
    const s = String(valor).trim();

    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.substring(0, 10);

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(s)) {
      const [dd, mm, yyyy] = s.split('/');
      return `${yyyy}-${mm}-${dd}`;
    }

    const d = new Date(s);
    if (!isNaN(d.getTime())) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }

    return '';
  }

  cargarParaEditar(id: number) {
    this.service.uno(id).subscribe({
      next: (data: any) => {
       
        this.nino = { ...data };

    
        this.nino.fecha_nacimiento = this.normalizarFechaParaInputDate(this.nino.fecha_nacimiento);

     
        this.cdr.detectChanges();
        setTimeout(() => this.cdr.detectChanges(), 0);
      },
      error: (err: any) => {
        console.log('❌ Error cargando niño:', err);
        alert('No se pudo cargar el niño');
        this.router.navigate(['/ninos']);
      }
    });
  }

  guardar() {
    if (!this.nino.nombre || !this.nino.apellido || !this.nino.fecha_nacimiento) {
      alert('Completa Nombre, Apellido y Fecha');
      return;
    }

    if (this.esEdicion) {
      this.nino.nino_id = this.id;

      this.service.editar(this.id, this.nino).subscribe({
        next: () => {
          alert('✅ Actualizado');
          this.router.navigate(['/ninos']);
        },
        error: (err: any) => {
          console.log('❌ Error actualizar:', err);
          alert('❌ Error al actualizar (revisa consola)');
        }
      });

    } else {
      this.service.nuevo(this.nino).subscribe({
        next: () => {
          alert('✅ Guardado');
          this.router.navigate(['/ninos']);
        },
        error: (err: any) => {
          console.log('❌ Error guardar:', err);
          alert('❌ Error al guardar (revisa consola)');
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/ninos']);
  }
  soloLetras(event: KeyboardEvent){
  const char = String.fromCharCode(event.keyCode);
  if(!/[A-Za-zÁÉÍÓÚáéíóúÑñ ]/.test(char)){
    event.preventDefault();
  }
}
}