(Fri 10, 3) / (Sun 12 ,3) ศึกษาการทำ CRUD (create read update delete) ของข้อมูล โดยใช้ข้อมูลที่เป็น array ของ object ที่กำหนดให้ (สามารถเรียกใช้ข้อมูลจาก db.json ได้โดยตรง)
- การเข้าถึงข้อมูล object ตาม propertie ต่าง ๆ ของ object และแสดงผลที่ template 
- การกำหนดเงื่อนไขในการ query object โดยใช้ข้อมูลจากแต่ละ properties ตามความเหมาะสม
- การเพิ่มข้อมูลเข้าไปใน array ผ่าน form template
- การอัพเดทข้อมูลที่มีอยู่ใน array ผ่าน form template
- การลบ object ออกจาก array
- การเรียกใช้ข้อมูลใน array 
ทั้งนี้ ให้สร้าง function สำหรับการทำงานแต่ละประเภท และกำหนดข้อกำหนดที่ควรปฏิบัติในการทำ CRUD ข้างต้น เช่น ห้ามเป็นค่าว่างสำหรับบาง properties ให้ครอบคลุม

หมายเหตุ : 

* 1. ในการทดสอบให้สร้าง components file เพื่อเรียกใช้/ทดสอบการทำงานของ function ที่สร้างขึ้น ร่วมกับ template html และ เรียกใช้ component ที่สร้างขึ้นที่ App.vue

* 2. CRUD FLOW ประกอบไปด้วย

       2.1. การเพิ่ม/แก้ไข/ลบ/อ่าน obj หนังสือภายในระบบที่หน้าหลัก  --> Geist
       
       2.2. การเพิ่ม/อัพเดต/อ่าน obj การยืมหนังสือ -- Pond
       
       2.3. การสร้าง/อ่าน/ตรวจสอบ/แก้ไข/ลบ บัญชีผู้ใช้งาน --> Perm
       
       2.4 ระบบอื่น ๆ ที่ครอบคลุม CRUD FLOW ที่สอดคล้องกับการทำงานของแอพพลิเคชั่น 1 Flow --> Bank [Post/Anoucement System]
