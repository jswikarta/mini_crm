# Mini CRM Backend

Backend untuk Mini CRM, dibangun menggunakan **Express.js** + **TypeScript**.  
Menyediakan REST API untuk mengelola data **Customer** dan **Order**.

## Fitur
- CR untuk data pelanggan (Customer).
- CR untuk data pesanan (Order).
- Penyimpanan data menggunakan file JSON (tanpa database eksternal).
- Validasi input untuk create Customer & Order.
- Struktur modular (Controller, Service, Routes).

## Struktur Direktori
backend/
- src/
  - mock/ # Penyimpanan database (db.json)
  - modules/
    - customer/ # Modul customer (controller, service, model)
    - order/ # Modul order (controller, service, model)
  - routes/ # Routing API
  - server.ts # Entry point server

## Endpoint Utama
- GET /customer - Ambil semua pelanggan.
- GET /customer/:ID - Ambil satu pelanggan.
- POST /customer - Tambah pelanggan baru.

- GET /order - Ambil semua order.
- POST /order - Tambah order baru.
- GET /order/:customer_id - Ambil data order berdasarkan customer id.
