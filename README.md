# 🎮 Tic Tac Toe Game

A full-stack **Tic Tac Toe web application** built using **Python (Flask), HTML, CSS, JavaScript, and MySQL**.
This project demonstrates core concepts of **game logic, web development, and database integration**.

---

## 🚀 Features

* 🎮 Interactive 3×3 Tic Tac Toe board
* 👥 Two-player gameplay (X vs O)
* 🧠 Automatic winner & draw detection
* 💾 Game results stored in database
* 🌐 Web-based interface (play in browser)
* ⚡ Lightweight and beginner-friendly project

---

## 🛠 Tech Stack

**Frontend**

* HTML
* CSS
* JavaScript

**Backend**

* Python (Flask)

**Database**

* MySQL (via XAMPP)

---

## 📸 Screenshots

> *![A03A4A94-AC69-47DC-AD8E-82EB0E114715_1_201_a](https://github.com/user-attachments/assets/e2e26ff2-9ac3-4781-a407-4ef4778be795)
*

---

## 🎯 How to Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/afmjarif/TIC-TAC-TOE.git
cd TIC-TAC-TOE
```

### 2️⃣ Install dependencies

```bash
pip install flask mysql-connector-python
```

### 3️⃣ Setup Database (XAMPP)

* Start **Apache** and **MySQL**
* Open: http://localhost/phpmyadmin

Run:

```sql
CREATE DATABASE tic_tac_toe;

USE tic_tac_toe;

CREATE TABLE results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player1 VARCHAR(50),
    player2 VARCHAR(50),
    winner VARCHAR(50),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4️⃣ Run the application

```bash
python app.py
```

### 5️⃣ Open in browser

```
http://127.0.0.1:5000
```

---

## 🎮 How to Play

* Player **X** starts first
* Players take turns clicking on the grid
* First to align 3 symbols wins:

  * Horizontal
  * Vertical
  * Diagonal
* If all cells are filled → **Draw**

---

## 📊 Database Functionality

* Stores:

  * Player names
  * Winner
  * Match timestamp
* Enables future features like:

  * Match history
  * Score tracking

---

## 📂 Project Structure

```
ticgame/
│
├── app.py
├── templates/
│   ├── index.html
│   └── result.html
```

---

## 🔮 Future Improvements

* 🤖 Add AI opponent (Minimax)
* 👤 Player name input system
* 📊 Display match history
* 🎨 Improve UI/UX design
* 🌍 Deploy online (Render / Railway)

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork this repo and submit a pull request.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**AFM Jarif**

* GitHub: https://github.com/afmjarif

---

⭐ If you like this project, don’t forget to **star the repository!**
