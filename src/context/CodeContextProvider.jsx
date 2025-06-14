import { createContext, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { io } from "socket.io-client"
import { authContext } from './AuthContextProvider'


export const codeContext = createContext()

const CodeContextProvider = ({ children }) => {

  const { user } = useSelector((store) => store.auth_store)
  const { tempUserName } = useContext(authContext);

  const [userName, setUserName] = useState("")
  const URL = "https://codelive.rwinsight.site"
  const [socket, setSocket] = useState(null)
  const [lang, setLang] = useState("plaintext")
  const [theme, setTheme] = useState("vs-dark")
  const [roomCode, setRoomCode] = useState("")
  const [localCode, setLocalCode] = useState(`Hello, welcome to CodeLIVE `)
  const [userMessages, setUserMessages] = useState([])
  const [connctionMsg, setConnctionMsg] = useState({
    successMsg: "",
    errorMsg: ""
  })
  const [totalUser, setTotalUser] = useState(0)
  const [isUserJoined, setIsUserJoined] = useState(false)
  const [userLists, setUserLists] = useState({
    creator: "",
    created_at: "",
    users: []
  });

  useEffect(() => {
    setUserName(user?.given_name || user?.name || tempUserName)
  }, [user, tempUserName])

  useEffect(() => {
    const socketInstance = io(URL, {
      transports: ["websocket"]
    });
    setSocket(socketInstance);

    socketInstance.emit("messageFromClient", "_");

    // Validate the connection and notify the user that `Server is connected`
    socketInstance.on("validateConnection", (message) => {
      setConnctionMsg(prev => ({ ...prev, successMsg: message }))
    });

    // Notify Sender Room Creation Successfull
    socketInstance.on("RoomCreationSuccess", ({ success, message }) => {
      if (success) {
        setConnctionMsg(prev => ({ ...prev, successMsg: message }))
      } else {
        setConnctionMsg(prev => ({ ...prev, errorMsg: message }))
      }
    })

    // Notify all user that `one new ( user_name ) user is connected` except the new user
    socketInstance.on("userJoined", (msg) => {
      setConnctionMsg(prev => ({ ...prev, successMsg: msg }))
    });

    // Notify Joined user itself
    socketInstance.on("userJoinSuccess", (msg) => {
      setIsUserJoined(true)
      localStorage.setItem("isJoined", "true")
      setConnctionMsg(prev => ({ ...prev, successMsg: msg }))
    })

    // Set `isJoinedUser` false that ensure he could not share code
    socketInstance.on("userLeavedRoom", () => {
      localStorage.setItem("isJoined", "false")
      setIsUserJoined(false)
      console.log("userLeavedRoom")
    });

    // Notify Sender and Other users that one user leaved the room
    socketInstance.on("successMessage", (msg) => {
      setConnctionMsg(prev => ({ ...prev, successMsg: msg }))
    });

    // Tracking every error messages
    socketInstance.on("errorMessage", (msg) => {
      setConnctionMsg(prev => ({ ...prev, errorMsg: msg }))
    });

    // Counte total user in a room
    socketInstance.on("countTotalUser", (count) => {
      setTotalUser(count);
    });

    // Set local code from server
    socketInstance.on("codeUpdate", (server_code) => {
      setLocalCode(server_code);
    });

    socketInstance.on("msgFromServer", ({ name, message }) => {
      setUserMessages((prevMessages) => [...prevMessages, { sender: name, local: 0, msg: message }]);
    });

    socketInstance.on("allUsers", (response) => {
      setUserLists({
        creator: response.created_by,
        created_at: response.created_at,
        users: response.users
      });
      console.log(response)
    })

    socketInstance.on("seeAllUsers", (response) => {
      setUserLists({
        creator: response.created_by,
        created_at: response.created_at,
        users: response.users
      });
    })

    return () => {
      socketInstance.disconnect(); // Cleanup on unmount
    };
  }, [])

  // Handle user Room joining
  const handleRoomJoining = (roomCode) => {
    localStorage.setItem("roomId", roomCode)
    localStorage.setItem("username", userName)
    socket?.emit("joinRoom", { name: userName, roomCode: roomCode });
  };

  const handleRoomReJoining = () => {
    const previousRoomId = localStorage.getItem("roomId")
    const previousUserName = localStorage.getItem("username")
    const isJoined = localStorage.getItem("isJoined") === "true"

    if (isJoined && previousRoomId && previousUserName) {
      socket.emit("rejoin", { roomId: previousRoomId, userName: previousUserName })
    }
  }

  // Sending roomCode to server for new Room creation
  const handleRoomCreation = (roomCode) => {
    socket?.emit("createRoom", { roomCode, userName });
  };
  // Handle Leaving Room
  const handleRoomLeaving = (roomCode) => {
    socket?.emit("leaveRoom", { name: userName, roomCode: roomCode });
    setRoomCode("");
  };

  const getAllUsersByRoomId = (roomId) => {
    socket.emit("getAllUser", roomId)
  }

  // Handle Code share among the rooms
  const handleCodeFromMonacoEditor = (code) => {
    setLocalCode(code)
    if (!isUserJoined) {
      return
    }
    if (roomCode) {
      socket?.emit("updateCode", { roomCode: roomCode, code: code });
    }
  }

  const handleLocalMessageToServer = (userName, message) => {
    if (!isUserJoined) {
      return
    }
    if (roomCode) {
      socket?.emit("msgFromClient", { roomCode, name: userName, msg: message });
    }
  };

  const value = {
    localCode,
    lang,
    theme,
    connctionMsg,
    socket,
    totalUser,
    userMessages,
    userName,
    userLists,
    setLang,
    setTheme,
    setRoomCode,
    setLocalCode,
    handleCodeFromMonacoEditor,
    handleRoomCreation,
    handleRoomJoining,
    handleRoomLeaving,
    handleLocalMessageToServer,
    setUserMessages,
    getAllUsersByRoomId,
  }

  return (
    <codeContext.Provider value={value}>
      {children}
    </codeContext.Provider>
  )
}

export default CodeContextProvider