import React, { useEffect, useState } from "react";
import codePairs from "../data/codePairs.json";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const TYPING_SPEED = 20;
const SWITCH_DELAY = 2000;

const CodeAnimator = () => {
  const [index, setIndex] = useState(0);
  const [typedOriginal, setTypedOriginal] = useState("");
  const [typedConverted, setTypedConverted] = useState("");

  const { original, converted, originalLang, convertedLang } = codePairs[index];

  useEffect(() => {
    let switchTimeout;

    setTypedOriginal("");
    setTypedConverted("");

    const typeCode = (text, setText, onComplete) => {
      let i = 0;
      const type = () => {
        if (i <= text.length) {
          setText(text.slice(0, i));
          i++;
          setTimeout(type, TYPING_SPEED);
        } else {
          onComplete();
        }
      };
      type();
    };

    typeCode(original, setTypedOriginal, () => {
      typeCode(converted, setTypedConverted, () => {
        switchTimeout = setTimeout(() => {
          setIndex((prev) => (prev + 1) % codePairs.length);
        }, SWITCH_DELAY);
      });
    });

    return () => clearTimeout(switchTimeout);
  }, [index]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-6 p-6 w-full">
      <CodeBlock code={typedOriginal} language={originalLang} />
      <CodeBlock code={typedConverted} language={convertedLang} />
    </div>
  );
};

// const CodeBlock = ({ code, language }) => {
//   return (
//     <div className="relative w-full md:flex-1 max-w-[600px] min-h-[400px] md:h-[450px] flex flex-col p-[2px] rounded-xl animate-border-glow flex-shrink-0">
//       {/* Glowing animated border background */}
//       <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 blur-sm opacity-40 animate-border-fade z-[-1]" />

//       {/* Transparent container */}
//       <div className="bg-transparent rounded-xl flex-1 flex flex-col overflow-hidden border border-white/10">
//         <div className="text-base text-gray-300 font-mono px-4 pt-3 pb-1">{language}</div>

//         {/* Scrollable content */}
//         <div className="flex-1 px-4 pb-4 overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
//           <SyntaxHighlighter
//             language={language}
//             style={duotoneDark}
//             customStyle={{
//               backgroundColor: "transparent",
//               fontSize: "1rem",
//               whiteSpace: "pre-wrap",
//               wordBreak: "break-word",
//               overflowX: "auto",
//               userSelect: "none",
//               margin: 0,
//               minHeight: "100%",
//             }}
//             wrapLongLines
//             lineProps={() => ({
//               style: {
//                 backgroundColor: "transparent",
//                 display: "block",
//                 width: "100%",
//               },
//             })}
//           >
//             {code || "// typing..."}
//           </SyntaxHighlighter>
//         </div>
//       </div>
//     </div>
//   );
// };

const CodeBlock = ({ code, language }) => {
  return (
    <div className="relative w-full md:flex-1 max-w-[600px] min-h-[400px] md:h-[450px] flex flex-col p-[2px] rounded-xl shadow-xl shadow-blue-500/40  transition-all duration-300 hover:shadow-pink-500/40">
      {/* Language label */}
      <div className="text-base text-gray-300 font-mono px-4 pt-3 pb-1">{language}</div>

      {/* Scrollable code box */}
      <div className="flex-1 px-4 pb-4 overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <SyntaxHighlighter
          language={language}
          style={duotoneDark}
          customStyle={{
            backgroundColor: "transparent",
            fontSize: "1rem",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowX: "auto",
            userSelect: "none",
            margin: 0,
            minHeight: "100%",
          }}
          wrapLongLines
          lineProps={() => ({
            style: {
              backgroundColor: "transparent",
              display: "block",
              width: "100%",
            },
          })}
        >
          {code || "// typing..."}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};



export default CodeAnimator;
