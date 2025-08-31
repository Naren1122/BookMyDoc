# 🩺 BookMyDoctor – Doctor Appointment & Health Management System  

BookMyDoctor is a **MERN stack web application** that allows patients to book doctor appointments online, doctors to manage schedules and prescriptions, and admins to oversee the entire platform.  
This project is designed as a **resume portfolio project** to showcase real-world development skills beyond CRUD applications.  

---

## 🚀 Features  

### 👤 Patient  
- Register/Login (Email + Google OAuth)  
- Search doctors by **specialty, location, availability, and ratings**  
- Book/cancel appointments in **real time**  
- Pay consultation fees online (**eSewa/Stripe**)  
- Get SMS/Email/Push reminders for appointments  
- View past **medical history & prescriptions**  

### 👨‍⚕️ Doctor  
- Register → Wait for **Admin approval** (license verification)  
- Manage profile and available time slots  
- Accept/Reject appointments  
- Create & upload **digital prescriptions**  
- Track **earnings and performance analytics**  

### 🛡️ Admin  
- Login with **superuser credentials**  
- Approve/Reject new doctor accounts  
- Manage patients, doctors, and appointments  
- View **analytics dashboard** (revenue, most booked doctors, peak booking times)  
- Handle disputes & support  

### 🔥 Advanced Features (to stand out)  
- 🤖 AI Chatbot (symptom checker + FAQs)  
- 💬 Real-time Patient ↔ Doctor chat (Socket.io)  
- 📹 Video consultation support (WebRTC / Zoom API)  
- 📂 Upload medical reports & prescriptions  
- 🔔 Notifications (Email, SMS, Push, PWA support)  

---

## 🛠️ Tech Stack  

**Frontend**  
- Next.js 13+ (App Router)  
- Tailwind CSS / ShadCN UI  
- Redux Toolkit (state management)  

**Backend**  
- Node.js + Express  
- MongoDB + Mongoose  
- JWT Authentication + Role-based Access  

**Other Integrations**  
- Socket.io (real-time chat & notifications)  
- eSewa/Stripe (payments)  
- Nodemailer + Twilio (emails & SMS)  
- WebRTC / Zoom API (video calls)  

**Deployment**  
- Frontend → Vercel  
- Backend → Render/Heroku  
- Database → MongoDB Atlas  

---

## 🔐 User Roles & Login Flow  

- **Patient** → Direct signup/login  
- **Doctor** → Registers → status `"pending"` → Admin approves → can log in  
- **Admin** → Pre-created (seeded manually in DB)  

---

## 📂 Project Structure (Next.js 13 + Express Backend)

```
BookMyDoctor/
│── client/ # Frontend (Next.js 13+ App Router)
│ ├── app/ # Next.js app directory
│ │ ├── layout.js # Root layout
│ │ ├── page.js # Homepage
│ │ ├── login/ # Login page
│ │ ├── signup/ # Signup page
│ │ ├── dashboard/ # Common dashboard layout
│ │ │ ├── patient/ # Patient dashboard pages
│ │ │ ├── doctor/ # Doctor dashboard pages
│ │ │ └── admin/ # Admin dashboard pages
│ │ ├── api/ # Next.js API routes (for client-side helpers)
│ │ └── not-found.js # 404 page
│ │
│ ├── components/ # Reusable UI components
│ ├── lib/ # Utilities (fetch wrappers, constants)
│ ├── redux/ # Redux Toolkit slices
│ ├── styles/ # Global CSS / Tailwind config
│ └── public/ # Static assets (images, icons, etc.)
│
│── server/ # Backend (Node + Express)
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routes
│ ├── controllers/ # Business logic
│ ├── middleware/ # Auth & role check
│ └── config/ # DB & server config
│
│── README.md
│── package.json
```


2️⃣ **Setup Backend**

cd server
npm install
npm run dev


3️⃣ **Setup Frontend**
cd client
npm install
npm run dev


4️⃣ Environment Variables

Create .env file in server/ with:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
ESEWA_KEY=your_esewa_key   # if using eSewa
STRIPE_KEY=your_stripe_key # if using Stripe



## **🗂️ Project Phases & Progress**

### **📌 Phase 1 – Core System (MERN Basics) ✅**
- [x] Setup MERN environment (client + server)
- [x] Implement user authentication (JWT + roles)
- [ ] Patient signup/login
- [ ] Doctor signup (pending approval by Admin)
- [ ] Admin login (pre-seeded superuser)
- [ ] Basic appointment booking system

### **📌 Phase 2 – Enhancements ⚡**
- [x] Doctor availability & schedule management
- [ ] Appointment cancellation flow
- [ ] Doctor profile & specialization setup
- [ ] Ratings & reviews for doctors
- [ ] Patient medical history tracking

### **📌 Phase 3 – Real-Time Features 🔔**
- [ ] Live patient-doctor chat (Socket.io)
- [ ] Push/email reminders for appointments
- [ ] Admin analytics dashboard (revenue, bookings, peak times)

### **📌 Phase 4 – Advanced Features 🤖**
- [ ] AI-powered symptom checker chatbot
- [ ] Telemedicine video consultation (WebRTC / Zoom API)
- [ ] Upload & share prescriptions/reports (PDF, images)
- [ ] PWA support (installable app + offline features)

### **📌 Phase 5 – Polish & Deployment 🚀**
- [ ] Responsive, modern UI (Tailwind + animations)
- [ ] SEO optimization
- [ ] Deploy frontend (Vercel)
- [ ] Deploy backend (Render/Heroku)
- [ ] Setup MongoDB Atlas (cloud DB)
- [ ] Final demo link & documentation





## **🖼️ Screenshots / Demo**

(Upload screenshots or GIFs here once UI is ready)



## **🤝 Contributing**

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.



## **📜 License**

This project is licensed under the MIT License.



## **👨‍💻 Author**

-  Naren Maharjan
- 💼 LinkedIn: www.linkedin.com/in/naren-maharjan-010319359
- 📧 Email: naren.14151415@gmail.com  


