# Anvaya CRM App

A simple and scalable Customer Relationship Management (CRM) application designed to manage customers, leads, and sales activities efficiently. This app helps teams track interactions, organize customer data, and improve overall productivity.
Built with React frontend, Express/Node backend, MongoDB database.

---

## Demo Link

[Live Demo](https://anvaya-crm-app-plum.vercel.app/)

---

## Quick Start

```
git clone https://github.com/PrafulC7/anvaya_crm_app.git
cd <anvaya_crm>
npm install
npm run dev

```

---

## Technologies

- **Frontend:** React, JavaScript, HTML5, CSS3
- **Styling:** Bootstrap
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Version Control:** Git & GitHub

---

## Demo Video
Watch a walkthrough (5-7 minutes) of all the major features of this app:
[Loom Video](https://www.loom.com/share/3ceeb0f52dc54a9d8f2ecc91388fd31b)

---

## Features

### 🧑‍💼 Lead Management
- Create new leads
- View a list of all leads
- Update lead details
- Delete existing leads
- Filter leads by status or agent

### 👥 Agent Management
- Assign leads to agents
- View agent-wise lead distribution
- Update agent information
- Track agent performance

### 📊 Dashboard & Analytics
- Display total leads count
- Show leads grouped by status
- Visualize agent performance data
- Provide quick overview of CRM activity

### ⚙️ User Experience
- Display responsive UI across devices
- Show loaders during API requests
- Handle API errors gracefully
- Maintain clean and intuitive navigation

---

## ⚙️ Environment Setup

This project uses environment variables for secure configuration.

### 📄 Create a `.env` file in the root directory
```
env
PORT=3000
MONGO_URI=mongodb+srv://neoGStudent:neoGStudentBD@neog.acigu1h.mongodb.net/anvaya_crm?retryWrites=true&w=majority&appName=neoG
```

---

## API Reference

### **GET /api/leads**<br>
List all leads<br>
Sample Response:<br>
```
[{_id, name, source, salesAgent, status, tags, timeToClose...},{_id,name,...}...]
```
### **POST /api/leads**<br>
Add New lead<br>
Sample Response:<br>
```
[{_id, name, source, salesAgent, status, tags, timeToClose...}]
```
### **GET /api/leads/:id**<br>
List Details<br>
Sample Response:<br>
```
[{_id, name, source, salesAgent, status, tags, timeToClose,...}]
```
### **GET /api/agents**<br>
Agents List<br>
Sample Response:<br>
```
[{_id, name, email,...},{_id,name,...}...]
```
### **POST /api/agents**<br>
Add New Agent<br>
Sample Response:<br>
```
[{_id, name, email,...}]
```
### **GET /api/agents/:id**<br>
Agents Details<br>
Sample Response:<br>
```
[{_id, name, email,...}]
```

## Contact
For bugs or feature request, please reach out to prafullacharde00715@gmail.com
