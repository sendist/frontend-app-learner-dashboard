export interface CatatanData {
  id?: number;
  id_akun: number;
  judul_catatan: string;
  isi_catatan: string;
  privasi: Privasi;
  gambar: string;
  nama_tag: string[];
  catatanbelajar_tag?: { tag: TagData }[];
}

export interface TagData {
  id: number;
  nama_tag: string;
}

export enum Privasi {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC"
}

export type MethodType = "POST" | "PUT" | "GET" | "DELETE"; 