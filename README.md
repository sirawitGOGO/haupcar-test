
## Repository Description

แบบทดสอบการทางเทคนิคของบริษัท Haupcar ในตำแหน่งงาน Full Stack Developer ซึ่งใน Repository นี้จะรวมทั้ง Frontend และ Backend ของแบบทดสอบนี้

## Guidelines

### วิธีติดตั้ง Backend และ Database

- เข้าไปที่โฟลเดอร์ backend
- ติดตั้ง Database ด้วยคำสั่งด้านล่างนี้
```bash
docker compose up -d
```
เป็นการสร้าง Contrainer ของ Database ด้วย Docker
- ติดตั้ง Dependencies ก่อนรัน Server ด้วยคำสั่งด้านล่างนี้
```bash
npm install
```
- รัน Backend server ด้วยคำสั่งด้านล่างนี้
```bash
npm run dev
```

### วิธีติดตั้ง Frontend

- เข้าไปที่โฟลเดอร์ frontend
- ติดตั้ง Dependencies ก่อนรัน fronend ด้วยคำสั่งด้านล่างนี้
```bash
npm install
```
- รัน Backend server ด้วยคำสั่งด้านล่างนี้
```bash
npm run dev
```

เมื่อทดสอบเว็บไซต์เสร็จแล้ว สามารถลบ Contrainer ของ Database ได้โดยเริ่มจาก
- หา Contrainer ของ Database นี้ด้วยคำสั่งด้านล่างนี้
```bash
docker ps -a
```
- ลบ Contrainer ของ Database นี้ด้วยคำสั่งด้านล่างนี้
```bash
docker rm -rf (ชื่อหรือ ID ของ Contrainer)
```

