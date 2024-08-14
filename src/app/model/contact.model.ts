export interface Website {
  ID: string;
  VALUE_TYPE: string;
  VALUE: string;
  TYPE_ID: string;
}

export interface Contact {
  ID?: string;
  NAME: string;
  BANK_NAME?: string;
  ADDRESS?: string;
  PHONE?: { VALUE: string; VALUE_TYPE: string }[];
  EMAIL?: { VALUE: string; VALUE_TYPE: string }[];
  WEBSITE?: Website[]; // Sử dụng kiểu Website[] cho WEBSITE
}
