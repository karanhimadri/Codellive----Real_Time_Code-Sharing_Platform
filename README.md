# 💻 CodeLIVE — Real-time Collaborative Code Editor

CodeLIVE is a web-based real-time collaborative code editor where multiple users can **code together**, **chat**, and **track active participants** in a shared coding room. It is designed for seamless remote interviews, pair programming, and live technical collaboration.

---

## 🌟 Features

- ✍️ Real-time collaborative code editing using **Monaco Editor**
- 🌐 WebSocket communication powered by **Socket.IO**
- 🧑‍🤝‍🧑 Create or join a room with a unique ID
- 🔄 Live user count and joined user list with timestamps
- 💬 Real-time chat messaging inside each room
- 🌗 Light/Dark theme toggle
- 🗃️ Multi-language code support (JavaScript, Python, etc.)
- 🧠 Temporary username support for quick anonymous collaboration
- 🛠️ Graceful user disconnection and room cleanup

---

## 🛠 Tech Stack

### Frontend
- **React** (with Hooks and Context API)
- **Tailwind CSS** for UI styling
- **Monaco Editor** for in-browser code editing
- **Socket.IO Client** for real-time communication

### Backend
- **Node.js**
- **Express**
- **Socket.IO Server**
- **In-memory data structures (Map)** for room and user management

---

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed

### Clone the Repository
```bash
git clone https://github.com/your-username/code-live.git
cd code-live

