# 💸 Expense Tracker SaaS

A full-stack expense tracking application built with the **MERN stack**. The project is organized into separate frontend and backend applications and uses Tailwind CSS for styling.

## ✨ Overview

Expense Tracker is designed to help users manage and review their personal finances in one place. This repository contains the application frontend and API backend.

## 🧰 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Architecture:** MERN stack (frontend and backend separated)

## 📁 Project Structure

```text
expense-tracker/
├── backend/       # Node.js and Express.js API
├── frontend/      # React.js user interface
└── README.md
```

## 🚀 Getting Started

Follow these steps to run the project locally. Commands can vary depending on the scripts defined in each `package.json`.

### Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB database (local installation or hosted instance)

### 1. Clone the repository

```bash
git clone https://github.com/sujald3505/expense-tracker.git
cd expense-tracker
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the environment variables required by your backend configuration. For example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

If your application uses additional variables (such as a JWT secret or frontend origin), add them using the exact names expected by the backend code. **Do not commit real credentials or secrets.**

Start the backend using the script defined in `backend/package.json`. For example, if the project defines a `dev` script:

```bash
npm run dev
```

### 3. Configure the frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Create a frontend environment file if your setup requires one, and configure the API base URL using the variable name expected by your React application.

Start the frontend using the script defined in `frontend/package.json`. For example, if the project defines a `dev` script:

```bash
npm run dev
```

Open the local URL printed in the terminal.

## ⚙️ Configuration Notes

- Check `backend/package.json` and `frontend/package.json` for the available npm scripts.
- Confirm the environment variable names in the source code before running the app.
- Make sure the MongoDB database is reachable by the backend.
- Keep `.env` files and production secrets out of version control.



## 🛣️ Future Improvements

Potential enhancements, depending on the current implementation, include:

- Expense summaries and visual analytics
- Category-based filtering and date-range reports
- Budget planning and spending insights
- Data export and downloadable reports
- Automated tests and deployment documentation

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request describing the changes.

## 👨‍💻 Author

**Sujal Dudhatra**

- GitHub: [@sujald3505](https://github.com/sujald3505)
- Project Repository: [expense-tracker](https://github.com/sujald3505/expense-tracker)

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.
