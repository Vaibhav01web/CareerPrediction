# 🚀 AI Career Prediction System

An AI-powered Career Prediction System built using **React**, **Spring Boot**, **Python**, and **Machine Learning**. The application analyzes a student's academic performance, technical skills, projects, and internships to predict the most suitable career path.

---

## 📌 Features

### 🎯 Career Prediction

Predicts the most suitable career based on:

* CGPA
* DSA Skills
* Communication Skills
* Machine Learning Knowledge
* Web Development Skills
* Cloud Computing Knowledge
* Cybersecurity Knowledge
* Number of Projects
* Number of Internships

### 🤖 Machine Learning Integration

* Trained using Scikit-Learn
* Random Forest Classification Model
* Python-based prediction engine
* Real-time predictions

### 🌐 Full Stack Architecture

* React Frontend
* Spring Boot Backend
* Python ML Service
* REST API Communication

### 📊 Interactive User Interface

* Modern dashboard design
* Skill sliders
* Real-time input updates
* Career result visualization

---

# 🏗️ Project Architecture

```text
┌───────────────────┐
│   React Frontend  │
└─────────┬─────────┘
          │ HTTP Request
          ▼
┌───────────────────┐
│ Spring Boot API   │
└─────────┬─────────┘
          │ Executes
          ▼
┌───────────────────┐
│ Python ML Model   │
│ Random Forest     │
└─────────┬─────────┘
          │ Prediction
          ▼
┌───────────────────┐
│ Career Result     │
└───────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

* React.js
* JavaScript
* CSS

## Backend

* Spring Boot
* Java
* REST APIs
* Maven

## Machine Learning

* Python
* Scikit-Learn
* Pandas
* NumPy
* Joblib

## Database (Future Integration)

* PostgreSQL
* Spring Data JPA

---

# 📂 Project Structure

```text
CareerPrediction
│
├── backend
│   ├── src
│   ├── pom.xml
│   └── mvnw.cmd
│
├── frontend
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
├── ml_model
│   ├── train.py
│   ├── predict.py
│   ├── career_dataset.csv
│   └── career_model.pkl
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Vaibhav01web/CareerPrediction.git

cd CareerPrediction
```

---

## 2️⃣ Start Backend

```bash
cd backend

./mvnw spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

## 3️⃣ Start Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 4️⃣ Install Python Dependencies

```bash
pip install pandas scikit-learn numpy joblib
```

---

# 📡 API Endpoint

## Predict Career

### Request

```http
POST /api/predict
```

### Request Body

```json
{
  "cgpa": 8.5,
  "dsa": 8,
  "communication": 9,
  "ml": 9,
  "webdev": 7,
  "cloud": 7,
  "cybersecurity": 2,
  "projects": 10,
  "internships": 2
}
```

### Response

```json
{
  "career": "Data Scientist"
}
```

---

# 📈 Sample Predictions

| Input Profile           | Predicted Career      |
| ----------------------- | --------------------- |
| High ML + Python Skills | ML Engineer           |
| Strong Analytics Skills | Data Scientist        |
| Strong Web Skills       | Full Stack Developer  |
| Strong Security Skills  | Cybersecurity Analyst |
| Strong Cloud Skills     | Cloud Architect       |

---

# 🔥 Future Enhancements

* Career Roadmap Generation
* Skill Gap Analysis
* Career Confidence Score
* Salary Prediction
* User Authentication (JWT)
* PostgreSQL Integration
* Prediction History
* Resume Analysis
* Deployment on Cloud

---

# 🎓 Learning Outcomes

This project demonstrates:

* Full Stack Development
* Machine Learning Integration
* REST API Development
* Java Spring Boot
* React Frontend Development
* Python Automation
* Model Deployment Concepts

---

# 👨‍💻 Author

**Vaibhav Singh Rajput**

* GitHub: https://github.com/Vaibhav01web

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps motivate further development and improvements.
