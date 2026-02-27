import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AsignacionService } from '../services/asignacion.service';

@Component({
  selector: 'app-asignaciones',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './asignaciones.html',
  styleUrl: './asignaciones.css'
})
export class Asignaciones implements OnInit {

  lista: any[] = [];
  listaOriginal: any[] = [];
  termino: string = '';

  constructor(
    private service: AsignacionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.service.todos().subscribe({
      next: (data) => {
        console.log("✅ Asignaciones:", data);
        this.listaOriginal = data ?? [];
        this.filtrar();
        this.cdr.detectChanges();
      },
      error: (err) => console.log("❌ Error:", err)
    });
  }

  filtrar() {
    const t = (this.termino || '').toLowerCase().trim();

    if (!t) {
      this.lista = [...this.listaOriginal];
      return;
    }

    this.lista = this.listaOriginal.filter(a => {
      const nino = `${a?.nino?.nombre ?? ''} ${a?.nino?.apellido ?? ''}`.toLowerCase();
      const cuidador = String(a?.cuidador?.nombre ?? '').toLowerCase();
      const estado = String(a?.estado ?? '').toLowerCase();

      return nino.includes(t) || cuidador.includes(t) || estado.includes(t);
    });
  }

  limpiar() {
    this.termino = '';
    this.lista = [...this.listaOriginal];
    this.cdr.detectChanges();
  }

  eliminar(id: number) {
    if (!confirm("¿Eliminar asignación?")) return;

    this.service.eliminar(id).subscribe({
      next: () => this.cargar(),
      error: (err) => console.log(err)
    });
  }
}