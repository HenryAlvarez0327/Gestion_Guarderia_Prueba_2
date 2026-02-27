import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AsignacionService {

  private url = 'https://localhost:7267/api/Asignaciones';

  constructor(private http: HttpClient) {}

  todos() {
    return this.http.get<any[]>(this.url);
  }

  uno(id: number) {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  nuevo(data: any) {
    return this.http.post(this.url, data);
  }

  editar(id: number, data: any) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}