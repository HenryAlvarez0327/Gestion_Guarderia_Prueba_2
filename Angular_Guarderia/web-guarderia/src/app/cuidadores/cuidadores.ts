import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CuidadorService } from '../services/cuidador.service';

@Component({
  selector: 'app-cuidadores',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cuidadores.html',
  styleUrl: './cuidadores.css'
})
export class Cuidadores implements OnInit {

  listaOriginal: any[] = [];
  listaFiltrada: any[] = [];

  termino: string = '';

  constructor(
    private service: CuidadorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.service.todos().subscribe({
      next: (data) => {
        console.log("✅ Cuidadores:", data);
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
      this.listaFiltrada = [...this.listaOriginal];
      return;
    }

    this.listaFiltrada = this.listaOriginal.filter(c =>
      String(c?.nombre ?? '').toLowerCase().includes(t) ||
      String(c?.telefono ?? '').toLowerCase().includes(t) ||
      String(c?.email ?? '').toLowerCase().includes(t) ||
      String(c?.especialidad ?? '').toLowerCase().includes(t)
    );
  }

  limpiar() {
    this.termino = '';
    this.listaFiltrada = [...this.listaOriginal];
    this.cdr.detectChanges();
  }

  eliminar(id: number) {
    if (!confirm("¿Eliminar cuidador?")) return;

    this.service.eliminar(id).subscribe({
      next: () => this.cargar(),
      error: (err) => console.log(err)
    });
  }
}