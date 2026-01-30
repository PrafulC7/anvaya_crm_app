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

- React JS
- React Router
- Node JS
- Express
- MongoDB

---

## Demo Video
Watch a walkthrough (5-7 minutes) of all the major features of this app:
[Loom Video](https://www.loom.com/share/3ceeb0f52dc54a9d8f2ecc91388fd31b)

---

## Features

Manage customers and leads
Track sales activities and follow-ups
Dashboard with key metrics
Search and filter records
Responsive UI for desktop and mobile

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
