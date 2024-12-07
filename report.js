const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware untuk parsing body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Konfigurasi koneksi ke database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nabilinge17&',
    database: 'rns_site'
});

// Koneksi ke database
db.connect((err) => {
    if (err) {
        console.error('Koneksi gagal:', err.message);
        return;
    }
    console.log('Terhubung ke database.');
});

// Endpoint untuk menerima data formulir
app.post('/submit-report', (req, res) => {
    const { child_name, disability_type, parent_contact, message } = req.body;

    // Validasi input
    if (!child_name || !disability_type || !parent_contact || !message) {
        return res.status(400).send('Semua field harus diisi.');
    }

    // Query untuk menyimpan laporan
    const sql = `
        INSERT INTO reports (child_name, disability_type, parent_contact, message)
        VALUES (?, ?, ?, ?)
    `;
    const values = [child_name, disability_type, parent_contact, message];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error saat menyimpan data:', err.message);
            return res.status(500).send('Terjadi kesalahan saat mengirim laporan.');
        }
        res.send('Laporan berhasil dikirim!');
    });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
