// contact.model.ts (hoặc tương tự)
export interface Phone {
  VALUE: string;
  VALUE_TYPE: string;
}

export interface Email {
  VALUE: string;
  VALUE_TYPE: string;
}

export interface Website {
  VALUE: string;
  VALUE_TYPE: string;
}

export interface Contact {
  NAME: string;
  ADDRESS: string;
  PHONE: Phone[];
  EMAIL: Email[];
  WEBSITE: Website[];
  BANK_NAME: string;
  SOTK: string;
}
