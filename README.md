# ReadAround 

**ReadAround** Is a **Python** automation project that randomly selects a country and recommends a classic book from its literary tradition. Data is managed in **JSON** and results are displayed on a static site hosted with GitHub Pages. Born from a personal goal to read more internationally.

---

## 🚀 Features
- Python script to generate and manage the dataset (`countries_books.json`).
- Static website styled with **Bootstrap**.
- A "Pick a Country" button that randomly selects a country and displays book suggestions.
- Extensible JSON data structure: you can easily add more countries and books.

---

## 🛠️ Tech Stack
- **Python** → dataset generation and manipulation  
- **JSON** → storing countries and books  
- **HTML + CSS + JavaScript** → frontend logic  
- **Bootstrap** → responsive design and styling  
- **GitHub Pages** → hosting  

---

## 📂 Project Structure
readaround/
│── index.html # Main page
│── about.html # About page
│── app.js # Frontend logic
│── styles.css # Custom styling
│── countries_books.json # Dataset
│── generate_countries_json.py # Script to generate JSON
│── random_picker.py # Test script for random selection
│── requirements.txt # Python dependencies

---

## 🌐 Live Demo
Check out the live version here:  
👉 [ReadAround on GitHub Pages](https://bredscc.github.io/read-around/)

---

## 💡 Future Ideas
- Add a search/filter by country.  
- Display book covers using a public API.  
- Allow users to contribute book suggestions.  
- Add more interactivity with animations.  
