import { useContext, useEffect, useState } from 'react';
import { assets, languages } from '../assets/assets';
import { Sun, Moon, Copy, X, MoreVertical, LogOut, Users } from 'lucide-react';
import { codeContext } from '../context/CodeContextProvider';
import generateRoomId from '../utils/generateRoomID';
import { toast } from 'react-toastify';

const CodeBar = () => {
  const {
    theme, lang, totalUser, setLang, setTheme, setRoomCode,
    localCode, setLocalCode, connctionMsg,
    handleRoomCreation, handleRoomJoining, handleRoomLeaving, getAllUsersByRoomId, userLists
  } = useContext(codeContext);

  const [fileName, setFileName] = useState("firstProgram.js");
  const [copiedNotify, setCopiedNotify] = useState("");
  const [roomsCode, setRoomsCode] = useState({ joinRoomCode: "", createRoomCode: "" });
  const [roomStates, setRoomStates] = useState({ createRoomState: false, joinRoomState: false, divState: false, isUserJoined: false });
  const [threeDotState, setThreeDotState] = useState({ threeState: false });
  const [showJoinedUsers, setShowJoinedUsers] = useState(false);

  // Sample joined users list
  const joinedUsers = ["Alice", "Bob", "Charlie", "David", "Himadri", "Karan", "Allah"];
  const showAllJoinedUsers = () => {
    getAllUsersByRoomId(roomsCode.joinRoomCode);
    setShowJoinedUsers(prev => !prev)
  }

  useEffect(() => {
    if (connctionMsg?.successMsg) toast.success(connctionMsg.successMsg);
  }, [connctionMsg?.successMsg]);

  useEffect(() => {
    if (connctionMsg?.errorMsg) toast.error(connctionMsg?.errorMsg);
  }, [connctionMsg?.errorMsg]);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const filtered = userLists.users.filter(u => u.name !== userLists.creator);
    setUsers(filtered);
  }, [userLists]);

  const handleOnClickCreateRoom = () => {
    setRoomStates(prev => ({ ...prev, createRoomState: true, divState: true, joinRoomState: false }));
    if (roomsCode.createRoomCode.trim() === "") {
      const roomID = generateRoomId();
      handleRoomCreation(roomID);
      setRoomsCode(prev => ({ ...prev, createRoomCode: roomID }));
    }
  };

  const handleOnClickLeavingRoom = () => {
    handleRoomLeaving(roomsCode.joinRoomCode);
    setRoomsCode({ joinRoomCode: "", createRoomCode: "" });
    setRoomStates(prev => ({ ...prev, isUserJoined: false }));
    setShowJoinedUsers(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(localCode).catch(() => { });
    setThreeDotState(prev => ({ ...prev, threeState: false }));
  };

  const handleClearCode = () => {
    setLocalCode("");
    setThreeDotState(prev => ({ ...prev, threeState: false }));
  };

  const handleCopy = () => {
    if (!navigator.clipboard) {
      toast.error("Please manually copy the code");
      return;
    }
    navigator.clipboard.writeText(roomsCode.createRoomCode.trim())
      .then(() => setCopiedNotify("Copied."))
      .catch(() => setCopiedNotify("Failed to copy."));
    setTimeout(() => setCopiedNotify(""), 3000);
  };

  const handleLanguageChange = (e) => setLang(e.target.value);

  const handleThemeOfEditor = () => {
    setTheme(prev => prev === "vs-dark" ? "light" : "vs-dark");
  };

  const handleJoinRoomCode = () => {
    if (!/^\d{6}$/.test(roomsCode.joinRoomCode.trim())) {
      toast.error("Invalid Code.");
      return;
    }
    handleRoomJoining(roomsCode.joinRoomCode);
    setRoomCode(roomsCode.joinRoomCode);
    setRoomStates(prev => ({ ...prev, isUserJoined: true, divState: false }));
  };

  return (
    <div className='w-full flex flex-wrap justify-between items-start bg-blue-500 py-3 px-4 md:px-16 relative'>
      {/* Left Section */}
      <div className='flex flex-wrap items-center gap-2'>
        <input
          className='w-36 px-2 py-1 text-sm rounded bg-white'
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <select
          className='px-2 py-1 text-sm rounded bg-white cursor-pointer'
          onChange={handleLanguageChange}
          value={lang}>
          {languages.map(lang => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
        <button
          className='p-2 bg-white rounded hover:bg-slate-100'
          onClick={handleThemeOfEditor}>
          {theme === "vs-dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative">
          <button onClick={() => setThreeDotState(prev => ({ ...prev, threeState: !prev.threeState }))}
            className="p-2 bg-white rounded hover:bg-slate-100 border border-gray-300">
            <MoreVertical size={17} />
          </button>
          {threeDotState.threeState && (
            <div className="absolute z-20 top-full mt-2 left-0 min-w-[100px] bg-white border rounded shadow">
              <button onClick={handleClearCode} className="w-full px-3 py-2 text-left text-sm hover:bg-blue-500 hover:text-white">Clear</button>
              <button onClick={handleCopyCode} className="w-full px-3 py-2 text-left text-sm hover:bg-blue-500 hover:text-white">Copy</button>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className='flex flex-col items-end gap-2 relative'>
        {!roomStates.isUserJoined ? (
          <div className='flex gap-2'>
            <button
              className='px-3 py-1 text-white bg-blue-600 border border-white rounded hover:bg-white hover:text-blue-600 transition'
              onClick={handleOnClickCreateRoom}>
              Create Room
            </button>
            <button
              className='px-3 py-1 bg-white text-sm border rounded hover:bg-slate-100'
              onClick={() => setRoomStates(prev => ({
                ...prev,
                createRoomState: false,
                divState: true,
                joinRoomState: true
              }))}>
              Join
            </button>
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-3 px-4 py-1 bg-white rounded'>
              <video className="w-6" autoPlay muted loop>
                <source src={assets.LIVE_video} type="video/mp4" />
              </video>
              <p className='text-sm'>Code: <span className='font-semibold text-gray-700'>{roomsCode.joinRoomCode}</span></p>
              <button onClick={() => showAllJoinedUsers()}>
                <p className='flex items-center text-sm gap-1'><Users size={20} className='text-red-600 hover:text-black' /> {totalUser} </p>
              </button>
            </div>
            <button
              onClick={handleOnClickLeavingRoom}
              className='p-2 bg-blue-600 text-white border border-white rounded hover:bg-white hover:text-black transition'>
              <LogOut size={18} />
            </button>
          </div>
        )}

        {/* Room Code Entry Box */}
        {roomStates.divState && (
          <div className='absolute top-[110%] right-0 w-80 bg-white shadow-xl p-4 rounded border border-gray-300 z-50'>
            <div className='flex justify-between items-center mb-2'>
              <p className='text-sm text-gray-600'>
                {roomStates.createRoomState
                  ? "Share this Room code with your friends."
                  : "Paste the room code to join."}
              </p>
              <X onClick={() => setRoomStates(prev => ({ ...prev, divState: false }))}
                className='cursor-pointer text-gray-500 hover:text-black' />
            </div>

            <div className='flex items-center gap-2'>
              {roomStates.createRoomState && (
                <>
                  <input readOnly className='border px-3 py-1 rounded w-24' value={roomsCode.createRoomCode} />
                  <Copy onClick={handleCopy} className='cursor-pointer hover:text-gray-500' />
                  <span className='text-xs italic text-green-500'>{copiedNotify}</span>
                </>
              )}
              {roomStates.joinRoomState && (
                <>
                  <input
                    className='border px-3 py-1 rounded w-32'
                    value={roomsCode.joinRoomCode}
                    onChange={(e) => setRoomsCode(prev => ({ ...prev, joinRoomCode: e.target.value }))}
                    placeholder="Enter Code"
                  />
                  <button
                    onClick={handleJoinRoomCode}
                    className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700'>
                    Join
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Joined Users Card */}
        {showJoinedUsers && (
          <div className='absolute top-[115%] right-0 w-72 bg-white border shadow-lg rounded p-4 z-50'>
            <div className='flex justify-between items-center mb-2'>
              <p className='text-sm font-semibold'>Joined Users</p>
              <X onClick={() => setShowJoinedUsers(false)} className='cursor-pointer hover:text-yellow-800' size={18} />
            </div>
            <ul className="max-h-40 overflow-y-auto space-y-1">
              <li className="sticky top-0 z-10 flex justify-between items-center px-3 py-1 text-sm rounded bg-yellow-100 border border-yellow-500 font-semibold shadow-sm">
                <span className="text-yellow-800">👑 {userLists.creator}</span>
                <span className="text-xs text-yellow-700">{userLists.created_at}</span>
              </li>

              {users.map((user, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center px-3 py-1 text-sm rounded bg-green-200 hover:bg-slate-200"
                >
                  <span>{user.name}</span>
                  <span className="text-xs text-gray-500">{user.joined_at}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeBar;
