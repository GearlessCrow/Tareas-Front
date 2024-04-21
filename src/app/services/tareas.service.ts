import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tareas } from '../models/tareas.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private readonly API_URL = 'http://127.0.0.1:8000/api';

  constructor(
    private http:HttpClient
  ) { }

  getTareas():Observable<Tareas[]>{
    return this.http.get<Tareas[]>(`${this.API_URL}/tareas`);
  }
  getTarea(id: number): Observable<Tareas[]>{
    return this.http.get<Tareas[]>(`${this.API_URL}/tareas/${id}`);
  }
  createTarea(data: Tareas): Observable<Tareas>{
    return this.http.post<Tareas>(`${this.API_URL}/tareas`, data);
  }
  updateTarea(id: number, data: Tareas): Observable<Tareas>{
    return this.http.put<Tareas>(`${this.API_URL}/tareas/${id}`, data);
  }
  deleteTarea(id: number): Observable<any>{
    return this.http.delete<any>(`${this.API_URL}/tareas/${id}`);
  }

}
