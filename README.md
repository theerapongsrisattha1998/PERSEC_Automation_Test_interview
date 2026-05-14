# BullVPN Automation Testing with Playwright

โปรเจกต์ทดสอบระบบเบื้องต้นของเว็บ BullVPN ด้วย JavaScript + Playwright

## วิธีการติดตั้ง
1. ติดตั้ง Library ทั้งหมด:
   ```bash
   npm install
   ```
2. ติดตั้ง Playwright Browsers:
   ```bash
   npx playwright install
   ```

## การตั้งค่าก่อนรัน
1. คัดลอกไฟล์ `.env.example` และเปลี่ยนชื่อเป็น `.env.prod`
2. กรอกข้อมูลส่วนตัวในไฟล์ `.env.prod`:
   - `USER_NAME`: ชื่อผู้ใช้งาน
   - `PASSWORD`: รหัสผ่าน
   - `EMAIL`: อีเมลที่ลงทะเบียน

## วิธีการรันเทส
- **รันเทสทั้งหมด (Default):**
  ```bash
  npx playwright test
  ```
- **รันเทสผ่านสคริปต์ Production:**
  ```bash
  npm run test:prod
  ```
- **รันเทสแบบเปิด UI (สำหรับ Debug):**
  ```bash
  npx playwright test --ui
  ```
- **ดูผลการรันล่าสุด (HTML Report):**
  ```bash
  npx playwright show-report
  ```
- **รันเจาะจงเบราว์เซอร์เฉพาะตัว (Cross-browser):**
  ```bash
  # รันเฉพาะบน Google Chrome / Chromium
  npm run test:prod:chromium

  # รันเฉพาะบน Firefox
  npm run test:prod:firefox

  # รันเฉพาะบน Safari (WebKit)
  npm run test:prod:webkit
  ```

## จุดเด่นของโปรเจกต์
- **Object-Oriented Programming (OOP):** นำ 4 เสาหลักของ OOP มาออกแบบเพื่อเพิ่มศักยภาพของสคริปต์ เช่น **Encapsulation** ห่อหุ้มคำสั่งที่ซับซ้อนอย่าง `.check({ force: true })` ไว้ใน Method และพร้อมสืบทอดฟังก์ชันส่วนกลางด้วย **Inheritance** ไปยังทุกหน้าจอ
- **Page Object Model (POM):** แยกส่วนประกาศ Element Locators และ Logic ของหน้าเว็บออกจากตัวสคริปต์ทดสอบ เพื่อให้อ่านง่าย คลีน และบำรุงรักษาได้ง่ายในอนาคตเมื่อโครงสร้างเว็บเปลี่ยน
- **Constants Management:** หลีกเลี่ยงการ Hardcode ข้อมูลในระบบ โดยเก็บ Path, ตัวแปรราคากลาง และ Message อ้างอิงต่างๆ ไว้ที่ศูนย์กลางควบคุม (`utils/constants.js`)
- **Environment Support:** บริหารจัดการข้อมูลสำคัญของระบบ (Sensitive Data) ผ่านระบบ Environment Variables แยกออกจากตัวสคริปต์หลักชัดเจน (`.env.prod`) พร้อมรองรับการรันบนระบบภายนอก
- **Robust Selector Strategy:** ออกแบบเพื่อจัดการจุดบกพร่องเว็บที่เป็น Dynamic โดยกรองเฉพาะปุ่มที่มองเห็นบนหน้าจอจริง (`visible=true`) เพื่อขจัดปัญหาความคลุมเครือของข้อมูล (Strict Mode Violation)

## โครงสร้างโปรเจกต์ (Project Structure)
```text
├── models/                  # โฟลเดอร์เก็บคลาส Page Object Model (POM)
│   └── LoginPage.js         # คลาสจัดการ Element และ Method ในหน้าลงชื่อใช้งาน
│   └── MyAccountPage.js     # คลาสจัดการ Element และ Method ในหน้าบัญชีผู้ใช้
├── tests/                   # โฟลเดอร์เก็บไฟล์สคริปต์ทดสอบหลัก (*.spec.js)
│   └── MyAccountPageTest.spec.js
├── utils/                   # โฟลเดอร์เครื่องมือส่วนกลาง
│   └── constants.js         # ศูนย์กลางจัดการค่าคงที่ PATHS และราคาประเมิน
├── .env.prod                # ไฟล์สำหรับผูก Environment ของระบบ Production
├── playwright.config.js     # ไฟล์ตั้งค่าและแบ่งสัดส่วนรัน Cross-browser
└── package.json             # ไฟล์บริหารจัดการ Library และคำสั่งรันระบบ
```

## CI/CD (GitHub Actions)
โปรเจกต์นี้มีการตั้งค่า Workflow สำหรับรันเทสอัตโนมัติผ่าน GitHub Actions:
- **Trigger:** รันทุกครั้งที่มีการ `push` หรือ `pull_request` ไปยัง Branch `main`
- **Actions:** ระบบจะติดตั้ง Browser และรันเทสทั้งหมดให้โดยอัตโนมัติ
- **Report:** หลังรันเสร็จ สามารถดูสรุปผลการเทสได้ในหัวข้อ "Actions" บน GitHub
