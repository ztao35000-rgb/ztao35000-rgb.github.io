const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// ใช้ __dirname เพื่อล็อกตำแหน่งที่แน่นอน
const projectPath = __dirname;

app.use(express.static(projectPath));

// API สำหรับดึงไฟล์
app.get('/api/files', (req, res) => {
    console.log("ได้รับคำขอให้ดึงไฟล์...");
    try {
        const files = fs.readdirSync(projectPath).filter(f => f.endsWith('.html'));
        console.log("พบไฟล์:", files);
        res.json(files);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Server Error");
    }
});

// API อ่านไฟล์
app.get('/api/files', (req, res) => {
    console.log("กำลังอ่านไฟล์:", req.params.name);
    const filePath = path.join(projectPath, req.params.name);
    res.sendFile(filePath);
});

// API บันทึกไฟล์
app.post('/api/save', (req, res) => {
    const { filename, content } = req.body;
    const filePath = path.join(projectPath, filename);
    fs.writeFileSync(filePath, content);
    console.log("บันทึกไฟล์สำเร็จ:", filename);
    res.send({ status: 'Saved!' });
});

app.listen(8080, () => console.log('Server พร้อมแล้ว! เข้าที่ http://localhost:8080/editor12345660.html'));
