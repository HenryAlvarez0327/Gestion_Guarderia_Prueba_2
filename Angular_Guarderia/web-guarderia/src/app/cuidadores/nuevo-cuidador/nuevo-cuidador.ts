import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CuidadorService } from '../../services/cuidador.service';

@Component({
  selector: 'app-nuevo-cuidador',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './nuevo-cuidador.html',
  styleUrl: './nuevo-cuidador.css'
})
export class NuevoCuidador implements OnInit {

  esEdicion = false;
  id = 0;

  cuidador: any = {
    cuidador_id: 0,
    nombre: '',
    telefono: '',
    email: '',
    especialidad: ''
  };

  constructor(
    private service: CuidadorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const pid = params.get('id');
      this.id = Number(pid || 0);
      this.esEdicion = this.id > 0;

      if (this.esEdicion) {
        this.service.uno(this.id).subscribe(data => {
          this.cuidador = { ...data };
        });
      }
    });
  }

  
  soloLetras(event: KeyboardEvent) {
    const char = String.fromCharCode(event.keyCode);
    if (!/[A-Za-zÁÉÍÓÚáéíóúÑñ ]/.test(char)) {
      event.preventDefault();
    }
  }


  soloNumeros(event: KeyboardEvent) {
    const char = String.fromCharCode(event.keyCode);
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  }


  bloquearPegadoNoNumerico(event: ClipboardEvent) {
    const texto = event.clipboardData?.getData('text') ?? '';
    if (!/^[0-9]+$/.test(texto)) {
      event.preventDefault();
    }
  }

  guardar() {

  
    if (!this.cuidador.nombre || !/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(this.cuidador.nombre)) {
      alert('Nombre inválido');
      return;
    }


    if (!/^[0-9]{10}$/.test(this.cuidador.telefono)) {
      alert('Teléfono debe tener 10 números');
      return;
    }

    
    if (this.cuidador.email &&
      !/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(this.cuidador.email)) {
      alert('Email inválido');
      return;
    }

    if (this.esEdicion) {

      this.cuidador.cuidador_id = this.id;

      this.service.editar(this.id, this.cuidador).subscribe(() => {
        alert('Actualizado');
        this.router.navigate(['/cuidadores']);
      });

    } else {

      this.service.nuevo(this.cuidador).subscribe(() => {
        alert('Guardado');
        this.router.navigate(['/cuidadores']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/cuidadores']);
  }
}