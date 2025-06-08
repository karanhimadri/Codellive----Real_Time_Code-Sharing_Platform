import { useContext, useState } from 'react';
import CodeBar from '../components/CodeBar';
import MonacoEditor from '../components/MonacoEditor';
import ChatBox from '../components/ChatBox';
import { authContext } from '../context/AuthContextProvider';


const CodeSpace = () => {
  const [inputName, setInputName] = useState('');
  const { setTempUserName, tempUserName, setIsTempLoggedIn } = useContext(authContext);

  const handleSubmit = () => {
    if (inputName.trim() !== '') {
      setTempUserName(inputName.trim())
      setIsTempLoggedIn(true)
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Main Layout */}
      <CodeBar />
      <div className="grid grid-cols-[70%_30%] gap-1 border p-2 flex-1">
        <div><MonacoEditor /></div>
        <div><ChatBox /></div>
      </div>

      {/* Overlay Card with Background Blur */}
      {!tempUserName && (
        <div className="absolute inset-0 z-50 flex items-start justify-center backdrop-blur-sm bg-black/30">
          <div className="mt-24 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-80 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
              Enter your name to continue
            </h2>
            <input
              type="text"
              placeholder="Temporary name"
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeSpace;
