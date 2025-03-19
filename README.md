# Codellive – Real-Time Collaborative Code Sharing Platform 👨‍💻💬

Codellive is a **real-time collaborative platform** where users can create rooms to share code and text with friends, while chatting live. It features **WebSocket-based communication**, **dynamic room creation**, and **Google OAuth 2.0 authentication** for a seamless user experience.

🔗 **Live Demo:** [LINK](https://your-live-link.com)
---

## ⚙️ Tech Stack

- **Frontend:** React.js, CSS, Bootstrap
- **Backend:** Node.js, Express.js
- **Real-Time Engine:** WebSocket (Socket.io)
- **Authentication:** Google OAuth 2.0
- **Database:** MongoDB (Mongoose)
- **Tools:** Git, GitHub, Firebase Hosting (optional)

---

## 🚀 Key Features

- 🧑‍🤝‍🧑 Create & join **real-time rooms** via unique Room IDs for collaborative code sharing.
- 🔄 **Live code updates** and **real-time chat messaging** using WebSocket.
- 🔐 Seamless login with **Google OAuth 2.0**, ensuring secure and fast access.
- 📊 Auto **member tracking** to show real-time participants in each room.
- 📱 Responsive UI with **React.js + Bootstrap**, optimized for all screen sizes.

---

## 📂 Quick Setup

```bash
# Clone Repo
git clone https://github.com/yourusername/codellive.git && cd codellive

# Backend Setup
cd backend && npm install
# Add .env with your config (see below)
npm start

# Frontend Setup
cd ../frontend && npm install
npm start
```

## 📂 Quick .env Setup

```bash
MONGO_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
```
# Thank You
