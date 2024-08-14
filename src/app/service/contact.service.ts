import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../model/contact.model';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/api/crm.contact'; // Đường dẫn API

  constructor(private http: HttpClient) {}

  // Lấy danh sách contact
  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}.list`);
  }

  // Thêm contact
  addContact(contact: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}.add`, contact);
  }

  // Sửa contact
  updateContact(id: string, contact: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}.update/${id}`, contact);
  }

  // Xóa contact
  deleteContact(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}.delete/${id}`);
  }
}
