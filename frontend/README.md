# Mini CRM Frontend

Frontend untuk Mini CRM, dibangun menggunakan **React.js** + **TypeScript**.  
Aplikasi ini menyediakan antarmuka untuk mengelola data **Customer** dan **Order**.

## Fitur
- Manajemen data pelanggan (Customer).
- Form input order baru.
- Report seluruh order.
- Report order berdasarkan pelanggan.
- **LocalStorage** untuk penyimpanan sementara.
- UI minimalis menggunakan **Tailwind CSS**.
- Navigasi dengan **React Router v6**.

## Struktur Direktori
frontend/
- src/
  - app # Root aplikasi
  - components/ # Komponen UI (Button, Input)
  - features/
    - customer/ # Modul customer (API, form, interface)
    - order/ # Modul order (API, form, report)
  - routes/ # Routing
  - main.tsx # Entry point

## Catatan
- Data order sementara disimpan di localStorage.
- Berinteraksi dengan backend melalui endpoint REST API.
- Menggunakan React Hooks (useState, useEffect, useContext).
