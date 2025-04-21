import React from 'react'
import CodeBar from '../components/CodeBar'
import MonacoEditor from '../components/MonacoEditor'
import ChatBox from '../components/ChatBox'

const CodeSpace = () => {
  return (
    <div className='flex flex-col'>
      <CodeBar />
      <div className='grid grid-cols-[70%_30%] gap-1 border p-2'>
        <div> <MonacoEditor/> </div>
        <div> <ChatBox/> </div>
      </div>
    </div>
  )
}

export default CodeSpace