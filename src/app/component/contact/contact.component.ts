import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ContactService } from 'src/app/service/contact.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  contacts: any[] = [];
  editingContact: boolean = false;
  editingContactId: string | null = null;

  phoneValueTypes: string[] = ['Work', 'Home', 'Mobile'];
  emailValueTypes: string[] = ['Work', 'Home', 'Other'];
  webValueTypes: string[] = ['Work', 'Personal', 'Other'];

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      NAME: ['', Validators.required],
      ADDRESS: [''],
      PHONE: this.fb.array([
        this.createPhoneGroup()
      ]),
      EMAIL: this.fb.array([
        this.createEmailGroup()
      ]),
      WEBSITE: this.fb.array([
        this.createWebsiteGroup()
      ]),
      BANK_NAME: [''],
      SOTK: ['']
    });
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  get phones(): FormArray {
    return this.contactForm.get('PHONE') as FormArray;
  }

  get emails(): FormArray {
    return this.contactForm.get('EMAIL') as FormArray;
  }

  get websites(): FormArray {
    return this.contactForm.get('WEBSITE') as FormArray;
  }

  createPhoneGroup(): FormGroup {
    return this.fb.group({
      VALUE: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      VALUE_TYPE: ['Work']
    });
  }

  createEmailGroup(): FormGroup {
    return this.fb.group({
      VALUE: ['', [Validators.required, Validators.email]],
      VALUE_TYPE: ['Work']
    });
  }

  createWebsiteGroup(): FormGroup {
    return this.fb.group({
      VALUE: ['', Validators.required],
      VALUE_TYPE: ['Work']
    });
  }

  addPhone(): void {
    this.phones.push(this.createPhoneGroup());
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  addEmail(): void {
    this.emails.push(this.createEmailGroup());
  }

  removeEmail(index: number): void {
    this.emails.removeAt(index);
  }

  addWebsite(): void {
    this.websites.push(this.createWebsiteGroup());
  }

  removeWebsite(index: number): void {
    this.websites.removeAt(index);
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe(
      (data) => {
        this.contacts = data;
      },
      (error) => {
        console.error('Error fetching contacts', error);
      }
    );
  }

  addContact(): void {
    if (this.contactForm.invalid) {
      console.error('Form is invalid');
      this.contactForm.markAllAsTouched(); // Đánh dấu tất cả các trường để hiển thị lỗi
      return;
    }

    this.contactService.addContact(this.contactForm.value).subscribe(
      (response) => {
        console.log('Contact added', response);
        this.contactForm.reset();
        this.contactForm.setControl('PHONE', this.fb.array([this.createPhoneGroup()]));
        this.contactForm.setControl('EMAIL', this.fb.array([this.createEmailGroup()]));
        this.contactForm.setControl('WEBSITE', this.fb.array([this.createWebsiteGroup()]));
        this.loadContacts(); // Tải lại danh sách sau khi thêm thành công
      },
      (error) => {
        console.error('Error adding contact', error);
      }
    );
  }

  editContact(contact: any): void {
    this.editingContact = true;
    this.editingContactId = contact.id;

    this.contactForm.patchValue({
      NAME: contact.NAME,
      ADDRESS: contact.ADDRESS,
      BANK_NAME: contact.BANK_NAME,
      SOTK: contact.SOTK
    });

    this.contactForm.setControl('PHONE', this.fb.array(contact.PHONE.map((p: any) => this.fb.group({
      VALUE: [p.VALUE, [Validators.required, Validators.pattern(/^\d+$/)]],
      VALUE_TYPE: [p.VALUE_TYPE]
    }))));

    this.contactForm.setControl('EMAIL', this.fb.array(contact.EMAIL.map((e: any) => this.fb.group({
      VALUE: [e.VALUE, [Validators.required, Validators.email]],
      VALUE_TYPE: [e.VALUE_TYPE]
    }))));

    this.contactForm.setControl('WEBSITE', this.fb.array(contact.WEBSITE.map((w: any) => this.fb.group({
      VALUE: [w.VALUE, Validators.required],
      VALUE_TYPE: [w.VALUE_TYPE]
    }))));
  }

  updateContact(): void {
    if (this.contactForm.invalid || !this.editingContactId) {
      console.error('Form is invalid or no contact is being edited');
      return;
    }

    this.contactService.updateContact(this.editingContactId, this.contactForm.value).subscribe(
      (response) => {
        console.log('Contact updated', response);
        this.editingContact = false;
        this.editingContactId = null;
        this.contactForm.reset();
        this.loadContacts(); // Tải lại danh sách sau khi cập nhật thành công
      },
      (error) => {
        console.error('Error updating contact', error);
      }
    );
  }

  deleteContact(id: string): void {
    this.contactService.deleteContact(id).subscribe(
      (response) => {
        console.log('Contact deleted', response);
        this.loadContacts(); // Tải lại danh sách sau khi xóa thành công
      },
      (error) => {
        console.error('Error deleting contact', error);
      }
    );
  }

  cancelEdit(): void {
    this.editingContact = false;
    this.editingContactId = null;
    this.contactForm.reset();
  }
  checkPhoneErrors(): boolean {
    return this.phones.controls.some(phone => phone.get('VALUE')?.invalid && phone.get('VALUE')?.touched);
  }
  checkEmailErrors(): boolean {
    return this.emails.controls.some(email => email.get('VALUE')?.invalid && email.get('VALUE')?.touched);
  }
  checkWebsiteErrors(): boolean {
    return this.websites.controls.some(web => web.get('VALUE')?.invalid && web.get('VALUE')?.touched);
  }
}
