import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NinoService {

  private RUTA_API = 'https://localhost:7267/api/Ninos';

  constructor(private http: HttpClient) {}

  todos(): Observable<any[]> {
    return this.http.get<any[]>(this.RUTA_API);
  }

  uno(id: number): Observable<any> {
    return this.http.get<any>(`${this.RUTA_API}/${id}`);
  }

  nuevo(nino: any): Observable<any> {
    return this.http.post<any>(this.RUTA_API, nino);
  }

  editar(id: number, nino: any): Observable<any> {
    return this.http.put<any>(`${this.RUTA_API}/${id}`, nino);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.RUTA_API}/${id}`);
  }
}