import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts: any[] = [];
  newContact: any = {
    NAME: '',
    ADDRESS: '',
    PHONE: [{ VALUE: '', VALUE_TYPE: 'WORK' }],
    EMAIL: [{ VALUE: '', VALUE_TYPE: 'WORK' }],
    WEBSITE: [{ VALUE: '', VALUE_TYPE: 'WORK' }],
    BANK_NAME: '',
    SOTK: ''
  };
  editingContact: any = null;
  
  emailValueTypes = ['WORK', 'PERSONAL' ,'OTHER'];
  phoneValueTypes = ['WORK', 'PERSONAL','HOME', 'FAX', 'OTHER'];
  webValueTypes = ['WORK', 'PERSONAL', 'OTHER'];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
    });
  }

  addField(contact: any, field: string) {
    contact[field].push({ VALUE: '', VALUE_TYPE: 'WORK' });
  }

  removeField(contact: any, field: string, index: number) {
    contact[field].splice(index, 1);
  }

  addContact() {
    this.contactService.addContact(this.newContact).subscribe(() => {
      this.newContact = {
        NAME: '',
        ADDRESS: '',
        PHONE: [{ VALUE: '', VALUE_TYPE: 'WORK' }],
        EMAIL: [{ VALUE: '', VALUE_TYPE: 'WORK' }],
        WEBSITE: [{ VALUE: '', VALUE_TYPE: 'WORK' }],
        BANK_NAME: '',
        SOTK: ''
      };
      this.loadContacts();
    });
  }

  editContact(contact: any) {
    this.editingContact = { ...contact };
  }

  updateContact() {
    this.contactService.updateContact(this.editingContact.ID, this.editingContact).subscribe(() => {
      this.editingContact = null;
      this.loadContacts();
    });
  }

  deleteContact(id: string) {
    this.contactService.deleteContact(id).subscribe(() => {
      this.loadContacts();
    });
  }

  cancelEdit() {
    this.editingContact = null;
  }
}
