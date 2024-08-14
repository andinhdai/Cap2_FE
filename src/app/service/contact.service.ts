import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from "src/app/model/contact.model";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/api/crm.contact'; // Đường dẫn API

  
  constructor(private http: HttpClient) {}

  // Lấy danh sách contact
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}.list`);
  }

  // Thêm contact
  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}.add`, contact);
  }

  // Sửa contact
  updateContact(id: string, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}.update/${id}`, contact);
  }

  // Xóa contact
  deleteContact(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}.delete/${id}`);
  }
}