# 🚗 Carrio Motors — Car Dealership Web Application

Carrio Motors is a **Single Page Application (SPA)** developed as part of our Semester 1 project at **Aptech Computer Education**.  
The project showcases a responsive car dealership platform where users can explore, compare, and interact with premium car models.

---

## ✨ Features

- **Hero Section** — Interactive hero display with animated car switching (React + GSAP).
- **Car Grid & Modal**  
  - Grid view of all available cars.  
  - Clicking on a car opens a modal with details (specifications, dealer location, etc.).
- **Warranty Section** — Brand-wise warranty details with animations.
- **Finance Section** — View financing schemes per model (APR, tenure, down-payment, installments).
- **Gallery** — Visual showcase of cars with hover effects and popup info.
- **About Us & Contact Us** — Company info, email, phone, and location with functional contact form.
- **Extras (per requirements)**  
  - Live **date, time, and geolocation ticker**.  
  - **Visitor count** displayed beside the logo.  
  - Menus with **hover color transitions** and **fade-in/out animations**.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React.js  
- **Styling**: Traditional CSS (Flexbox, Grid, media queries)  
- **Animations**: GSAP (GreenSock Animation Platform)  
- **Data Handling**: JSON (cars, finance schemes, warranty details)  
- **Utilities**: HTML5 APIs (geolocation, localStorage)  

---

## 📂 Project Structure

Carrio-Motors/
│── public/ # Static assets (images, icons, etc.)
│── src/
│ ├── components/ # Reusable UI components (Hero, Gallery, Contact, etc.)
│ ├── constant/ # JSON data files (cars, finance.json, warranty.json)
│ ├── pages/ # Page-level components (About, Contact, Sitemap)
│ ├── App.jsx # Main SPA structure
│ └── index.js # React entry point
│
│── package.json # Dependencies & scripts
│── README.md # Project documentation


---

## ⚡ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/carrio-motors.git


Navigate into the project:

cd carrio-motors


Install dependencies:

npm install


Start the development server:

npm run dev
