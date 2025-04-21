import React, { useContext, useEffect, useState } from 'react'
import { assets, languages } from '../assets/assets'
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { codeContext } from '../context/CodeContextProvider';
import generateRoomId from '../utils/generateRoomID';
import { toast } from 'react-toastify';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { ImExit } from "react-icons/im";
import { FaUsers } from "react-icons/fa";


const CodeBar = () => {
  const { theme, lang, totalUser, setLang, setTheme, setRoomCode, localCode, setLocalCode, connctionMsg, handleRoomCreation, handleRoomJoining, handleRoomLeaving } = useContext(codeContext)
  const [fileName, setFileName] = useState("firstProgram.js")
  const [copiedNotify, setCopiedNotify] = useState("")
  const [roomsCode, setRoomsCode] = useState({
    joinRoomCode: "",
    createRoomCode: ""
  })
  const [roomStates, setRoomStates] = useState({
    createRoomState: false,
    joinRoomState: false,
    divState: false,
    isUserJoined: false
  })
  const [threeDotState, setThreeDotState] = useState({
    threeState: false,
  })

  useEffect(() => {
    if (connctionMsg?.successMsg === "") {
      return
    }
    toast.success(connctionMsg?.successMsg)
  }, [connctionMsg?.successMsg])

  useEffect(() => {
    if (connctionMsg?.errorMsg === "") {
      return
    }
    toast.success(connctionMsg?.errorMsg)
  }, [connctionMsg?.errorMsg])

  // Called when user click `Create Room` button
  const handleOnClickCreateRoom = () => {
    setRoomStates(pre => ({ ...pre, createRoomState: true, divState: true, joinRoomState: false }))
    if (roomsCode.createRoomCode.trim() === "") {
      let roomID = generateRoomId();
      handleRoomCreation(roomID)
      setRoomsCode(pre => ({ ...pre, createRoomCode: roomID }))
    }
  }

  // Called when User click Join Button under `Join`
  const handleOnClickLeavingRoom = () => {
    handleRoomLeaving(roomsCode.joinRoomCode)
    setRoomsCode(prev => ({ ...prev, createRoomCode: "" }))
    setRoomStates(prev => ({ ...prev, isUserJoined: false }))
    setRoomsCode(prev => ({ ...prev, joinRoomCode: "" }))
  }

  // Called for copy the whole editor's text or code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(localCode).then().catch();
    setThreeDotState(prev => ({ ...prev, threeState: !prev.threeState }))
  }

  // Called for clear code or text
  const handleClearCode = () => {
    setLocalCode("")
    setThreeDotState(prev => ({ ...prev, threeState: !prev.threeState }))
  }

  // This function Called for copy the created room Code to clipboard to user
  const handleCopy = () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      toast.error("Sorry, Please manually copy the code");
      return;
    }

    navigator.clipboard
      .writeText(roomsCode.createRoomCode.trim())
      .then(() => {
        setCopiedNotify("copied.")
        setTimeout(() => {
          setCopiedNotify("")
        }, 3000);
      })
      .catch(() => {
        setCopiedNotify("Failed to copied.")
        setTimeout(() => {
          setCopiedNotify("")
        }, 3000);
      });
  };

  // Hadelling codeContext language setup
  const handleLanguageChange = (e) => {
    setLang(e.target.value)
  }

  //  Hadelling codeContext Codde Editor Theme setup
  const handleThemeOfEditor = () => {
    setTheme(pre => pre === "vs-dark" ? "light" : "vs-dark")
  }

  //  Hadelling codeContext User joining room code setup
  const handleJoinRoomCode = () => {
    if (!/^\d{6}$/.test(roomsCode.joinRoomCode.trim())) {
      toast.error("Invaild Code.")
      return
    }
    handleRoomJoining(roomsCode.joinRoomCode)
    setRoomCode(roomsCode.joinRoomCode)
    setRoomStates(prev => ({ ...prev, isUserJoined: true }))
    setRoomStates(prev => ({ ...prev, divState: false }))
  }

  return (
    <div className='w-full flex items-center bg-blue-500 justify-between py-3 px-16'>
      <div className='flex items-center justify-center gap-2'>
        <input className='w-36 px-2 py-1 bg-white text-lg rounded' type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />

        <select className='px-2 py-1.5 bg-white text-lg rounded cursor-pointer' onChange={handleLanguageChange} value={lang}>
          {languages.map((lang) => (
            <option className='bg-gray-50' key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>

        <button className='px-2 py-[9px] bg-white text-lg rounded hover:bg-slate-100' onClick={handleThemeOfEditor}>
          {theme === "vs-dark" ? <MdOutlineLightMode size={18} /> : <MdOutlineDarkMode size={18} />}
        </button>

        <div className="relative inline-block">
          {/* Dots Button */}
          <button onClick={() => setThreeDotState(pre => ({ ...pre, threeState: !pre.threeState }))} className="px-2 py-[9px] bg-white text-lg rounded hover:bg-slate-100 border border-gray-300">
            <PiDotsThreeOutlineVerticalFill size={17} />
          </button>
          {threeDotState.threeState && <div className="absolute z-10 top-full left-0 mt-2 min-w-[80px] bg-white rounded border border-gray-200 shadow-lg flex flex-col">
            <button onClick={handleClearCode} className="w-full px-3 py-2 text-sm text-left hover:bg-blue-500 hover:text-white"> Clear </button>
            <button onClick={handleCopyCode} className="w-full px-3 py-2 text-sm text-left hover:bg-blue-500 hover:text-white"> Copy </button>
          </div>}
        </div>

      </div>

      <div className='flex items-center justify-center gap-3'>
        {!roomStates.isUserJoined && <>
          <button
            className='px-3 py-1 bg-blue-500 border-2 border-white text-lg text-white rounded transition-all hover:bg-white hover:text-blue-500 duration-300'
            onClick={handleOnClickCreateRoom}>
            Create Room
          </button>
          <button className='px-3 py-1 bg-white text-lg rounded hover:bg-slate-100'
            onClick={() => setRoomStates(pre => ({ ...pre, createRoomState: false, divState: true, joinRoomState: true }))}>
            Join
          </button>
        </>}
        {roomStates.isUserJoined && <>
          <div className='flex items-center px-4 py-1 bg-white gap-4 rounded'>
            <video className="w-8" autoPlay muted loop preload="auto">
              <source src={assets.LIVE_video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className='flex items-center gap-2'>Code: <span className='font-bold text-gray-500'>{roomsCode.joinRoomCode}</span></p>
            <p className='flex items-center gap-2'><FaUsers /> <span>{totalUser}</span></p>
          </div>
          <button
            onClick={handleOnClickLeavingRoom}
            className='px-2 py-2 bg-blue-500 border-2 border-white text-lg text-white rounded transition-all hover:bg-white hover:text-black duration-300'>
            <ImExit size={20} />
          </button>
        </>}

        {roomStates.divState && <div className='absolute z-10 top-36 w-72 h-20 bg-white shadow-xl p-2 rounded border border-gray-400'>

          <div className='flex items-center justify-between'>
            {roomStates.createRoomState && <p className='text-sm text-gray-700'>Share this Room code with your friends.</p>}
            {roomStates.joinRoomState && <p className='text-sm text-gray-700'>Paste here your room code for join.</p>}
            <span onClick={() => setRoomStates(pre => ({ ...pre, divState: false }))}
              className='pb-4 text-gray-500 cursor-pointer hover:text-black'>
              <RxCross2 />
            </span>
          </div>

          <div className='flex items-center mt-1 gap-2'>
            {roomStates.createRoomState && <input className='border-dashed border-gray-500 w-20 pl-4 focus:outline-none' readOnly type="text" value={roomsCode.createRoomCode} />}
            {roomStates.createRoomState && <>
              <span onClick={handleCopy} className='cursor-pointer hover:text-gray-400'>
                <FaRegCopy />
              </span>
              <span className='italic text-gray-400'>{copiedNotify}</span>
            </>}
            {roomStates.joinRoomState &&
              <div className='flex items-center gap-2'>
                <input className='border-2 border-gray-400 w-28 pl-4 rounded focus:outline-none' type="text" value={roomsCode.joinRoomCode}
                  onChange={(e) => setRoomsCode(pre => ({ ...pre, joinRoomCode: e.target.value }))}
                />
                <button onClick={handleJoinRoomCode} className='border-2 border-white px-2.5 py-[2px] rounded bg-blue-500 text-white'>Join</button>
              </div>
            }
          </div>

        </div>}

      </div>
    </div>
  )
}

export default CodeBar