import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CuidadorService {


  private RUTA_API = 'https://localhost:7267/api/Cuidadores';

  constructor(private http: HttpClient) {}

  todos(): Observable<any[]> {
    return this.http.get<any[]>(this.RUTA_API);
  }

  uno(id: number): Observable<any> {
    return this.http.get<any>(`${this.RUTA_API}/${id}`);
  }

  nuevo(cuidador: any): Observable<any> {
    return this.http.post<any>(this.RUTA_API, cuidador);
  }

  editar(id: number, cuidador: any): Observable<any> {
    return this.http.put<any>(`${this.RUTA_API}/${id}`, cuidador);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.RUTA_API}/${id}`);
  }
}