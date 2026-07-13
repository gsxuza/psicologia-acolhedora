// Tipos espelhando 1:1 as entidades extraídas do app original no Base44
// (Patient, Session, Document, User) — usados como contrato entre o
// front-end e o schema Postgres em supabase/schema.sql.

export type PatientStatus = "active" | "inactive" | "waiting";

export interface Patient {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  birth_date: string | null; // ISO date
  cpf: string | null; // confidencial
  status: PatientStatus;
  main_complaint: string | null;
  emergency_contact: string | null;
  session_value: number | null;
  notes: string | null; // confidencial
  user_id: string | null; // acesso do próprio paciente, se aplicável
  created_by: string; // psicólogo(a) dono do registro (RLS)
  created_at: string;
  updated_at: string;
}

export type SessionStatus =
  | "scheduled"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

export type SessionModality = "online" | "presencial";
export type PaymentStatus = "pending" | "paid" | "waived";

export interface Session {
  id: string;
  patient_id: string;
  patient_name: string; // cache para exibição rápida
  date: string; // ISO date
  time: string; // "HH:mm"
  duration: number; // minutos
  status: SessionStatus;
  modality: SessionModality;
  notes: string | null; // confidencial
  payment_status: PaymentStatus;
  payment_value: number | null;
  reminder_sent: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export type DocumentCategory = "orientacao" | "material" | "contrato" | "outro";

export interface PatientDocument {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  category: DocumentCategory;
  is_public: boolean;
  patient_id: string | null; // null = documento geral
  created_by: string;
  created_at: string;
}

export type AppRole = "admin" | "user";

export interface Profile {
  id: string; // = auth.users.id
  email: string;
  full_name: string | null;
  role: AppRole;
  created_at: string;
}
