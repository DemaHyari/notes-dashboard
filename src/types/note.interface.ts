export interface Note {
  id: string;
  title: string;
  description: string;
  type: "personal" | "work" | "study" | "appointment";
  createdAt: Date | string;
  updatedAt: Date | string;
}