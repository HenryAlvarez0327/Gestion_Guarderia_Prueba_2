import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NinoService } from '../services/nino.service';

@Component({
  selector: 'app-ninos',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './ninos.html',
  styleUrl: './ninos.css'
})
export class Ninos implements OnInit {

  lista: any[] = [];
  listaOriginal: any[] = [];
  textoBusqueda: string = ''; 

  constructor(
    private service: NinoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.service.todos().subscribe({
      next: (data) => {
        this.lista = data;
        this.listaOriginal = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });
  }

  filtrar() {
    const texto = this.textoBusqueda.toLowerCase().trim();

    if (!texto) {
      this.lista = this.listaOriginal;
      return;
    }

    this.lista = this.listaOriginal.filter(n =>
      (n.nombre || '').toLowerCase().includes(texto) ||
      (n.apellido || '').toLowerCase().includes(texto) ||
      (n.alergias || '').toLowerCase().includes(texto)
    );

    this.cdr.detectChanges();
  }

  limpiarBusqueda() {
    this.textoBusqueda = ''; 
    this.lista = this.listaOriginal;
  }

  eliminar(id: number) {
    if (!confirm("¿Eliminar niño?")) return;

    this.service.eliminar(id).subscribe({
      next: () => this.cargar(),
      error: (err) => console.log(err)
    });
  }
}