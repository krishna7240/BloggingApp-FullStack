#  Full Stack Blogging Application

This is a Full Stack Blogging Web Application built using:

- Frontend: React JS
- Backend: Spring Boot
- Database: MySQL

Users can register, login, create posts, upload media (images/videos), comment on posts, edit and delete their own posts.

---

## Features

- User Registration and Login
- Create Normal Text Posts
- Upload Image / Video Posts
- View All Posts (Latest First)
- Comment on Posts
- View Comments with Username
- My Posts Section
- Edit & Delete Own Posts
- Media Upload Support

---

##  Tech Stack

Frontend:
- React JS
- Axios
- CSS

Backend:
- Spring Boot
- Spring Data JPA
- Hibernate

Database:
- MySQL

---

##  Project Structure

BloggingApp-FullStack  
│  
├── frontend → React Application  
│  
└── backend  
  └── blogging-backend → Spring Boot Application  

---

##  How to Run the Project

### Step 1: Clone the Repository

git clone https://github.com/krishna7240/BloggingApp-FullStack.git
cd BloggingApp-FullStack

yaml
Copy code

---

### Step 2: Create Database

Open MySQL and run:

CREATE DATABASE blogging_app;

yaml
Copy code

---

### Step 3: Configure Database

Open file:

backend/blogging-backend/src/main/resources/application.properties

sql
Copy code

Check username & password:

spring.datasource.username=root
spring.datasource.password=your_mysql_password

yaml
Copy code

Change if needed.

---

### Step 4: Run Backend

Open terminal:

cd backend/blogging-backend
mvn spring-boot:run

yaml
Copy code

Backend starts at:

http://localhost:8080

yaml
Copy code

---

### Step 5: Run Frontend

Open a **new terminal**:

cd frontend
npm install
npm start

yaml
Copy code

Frontend starts at:

http://localhost:3000

yaml
Copy code

---

##  Media Upload Folder

Uploaded images and videos are stored in:

backend/blogging-backend/uploads/

yaml
Copy code

---

##  Author

Name: Kamesh Raghupatruni  
GitHub: https://github.com/krishna7240

---



##  Done

