/* ==========================================================================
TUGAS PERTEMUAN 4: DASAR-DASAR JAVASCRIPT
========================================================================== */

// TODO 1: Variabel & Tipe Data 
const nama = "Inggil Lilo Prayogo"; // String
let tahunLahir = 2007;         // Number
let isStudent = true;          // Boolean


// TODO 2: Operator & Template Literals 
let usia = 2026 - tahunLahir;  // Menghitung usia

// PERBAIKAN: Menggunakan tanda backtick ( ` ) untuk Template Literals
console.log(`Halo, saya ${nama}. Usia saya saat ini adalah ${usia} tahun.`);


// TODO 3: Function & Conditional 
function cekStatus(usia) {
    if (usia >= 18) {
        return "Sudah Dewasa";
    } else {
        return "Masih Muda";
    }
}

// Memanggil function dan menampilkan hasilnya di console
console.log(cekStatus(usia));