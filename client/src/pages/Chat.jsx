import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import { useAuth } from "../context/AuthContext";
import { usePopup } from "../context/PopupContext";
import { useNavigate } from "react-router-dom";
import { useConverter } from "../context/ConverterContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import CodeInput from "../components/CodeInput";

const Chat = () => {
  const { user, logout } = useAuth();
  const [inputLang, setInputLang] = useState("");
  const [outputLang, setOutputLang] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [isProfile, setisprofile] = useState(false);

  const { showPopup } = usePopup();
  const { loading, convertedCode, error, setConvertedCode, convertCode } =
    useConverter();

  // console.log("Converted from context:", convertedCode);

  const handleConvert = () => {
    if (!inputLang || !outputLang || !code.trim()) {
      showPopup("Please provide all inputs");
      return;
    }

    convertCode({ inputLang, outputLang, code });
    console.log(convertedCode)
  };
  
  const handleLogout = async () => {
    const res = await logout();
    if (res?.success || res === undefined) {
      showPopup("Logged out successfully");
      navigate("/");
    } else {
      showPopup("Logout failed");
      window.location.reload();
    }
  };

  

  return (
    <>
      <Navbar
        onProfileClick={() => setisprofile(true)}
        onLogout={handleLogout}
      />

      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-16">
        {isProfile && user && (
          <Profile
            user={user}
            onClose={() => setisprofile(false)}
            onLogout={handleLogout}
          />
        )}

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
          Code Converter - Shift Code Across Languages
        </h1>

        {/* Input Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-4">Enter Your Code</h2>

          <div className="flex flex-col md:flex-row md:items-center md:gap-6 mb-4">
            <label className="text-sm font-medium mb-2 md:mb-0">
              Input Language:
            </label>
            <select
              className="p-2 border border-gray-300 rounded-md w-full md:w-60"
              value={inputLang}
              onChange={(e) => setInputLang(e.target.value)}
            >
              <option value="">Select Language</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="rust">Rust</option>
            </select>
          </div>

          {/* <textarea
            className="w-full h-48 p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Paste or write your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea> */}

          <CodeInput
            code={code}
            setCode={setCode}
            language={inputLang || "javascript"}
          />

          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
            onClick={handleConvert}
            disabled={loading}
          >
            {loading ? "Converting..." : "Convert"}
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Converted Output</h2>

          <div className="flex flex-col md:flex-row md:items-center md:gap-6 mb-4">
            <label className="text-sm font-medium mb-2 md:mb-0">
              Output Language:
            </label>
            <select
              className="p-2 border border-gray-300 rounded-md w-full md:w-60"
              value={outputLang}
              onChange={(e) => setOutputLang(e.target.value)}
            >
              <option value="">Select Language</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="rust">Rust</option>
            </select>

            <button
              className="mt-2 md:mt-0 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              onClick={() => navigator.clipboard.writeText(convertedCode)}
              disabled={!convertedCode}
            >
              Copy
            </button>
            
          </div>

          {/* <textarea
            className="w-full h-48 p-4 border border-gray-300 rounded-md resize-none bg-gray-100 text-gray-700"
            readOnly
            value={convertedCode ||"waiting for response"}
          ></textarea> */}

          <div className="bg-[#1e1e1e] rounded-md overflow-auto text-sm font-mono w-full min-h-[200px] text-white">
            <SyntaxHighlighter
              language={outputLang || "javascript"}
              style={vscDarkPlus} 
              wrapLongLines={true}
              customStyle={{
                background: "transparent",
                margin: 0,
                padding: 16,
                minHeight: "200px",
              }}
            >
              {convertedCode || "// Output will appear here"}
            </SyntaxHighlighter>
          </div>

          {error && (
            <p className="text-red-500 mt-4 text-sm font-medium">{error}</p>
          )}
        </div>
      </div>
<div className="flex justify-center p-4   bg-gray-50 ">
  <span className="text-gray-500 font-medium text-center">
    AI Powered Code Converter. Built with React and Node
  </span>
</div>
    </>
  );
};

export default Chat;
