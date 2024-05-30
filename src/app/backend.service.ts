// src/app/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:5000/api/';  // Replace with your API endpoint
  private accessToken = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken  // Replace with your token
    });

    return this.http.get( this.apiUrl + 'contacts', { headers });
  }

  createContact(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken  // Replace with your token  // Replace with your token
    });

    return this.http.post( this.apiUrl + 'contacts', data, { headers });
  }

  deleteContact(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken  // Replace with your token // Replace with your token
    });

    return this.http.delete(`${this.apiUrl + 'contacts'}/${id}`, { headers });
  }

  editContact(id: any, data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken  // Replace with your token
    });

    return this.http.put(`${this.apiUrl + 'contacts'}/${id}`,data, { headers });
  }

  login(data: any): Observable<any> {

    return this.http.post( this.apiUrl + 'users/login', data);
  }

  register(data: any): Observable<any> {

    return this.http.post( this.apiUrl + 'users/register', data);
  }
}
