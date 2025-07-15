import { createContext, useContext, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;
const ConverterContext = createContext();

export const ConverterProvider = ({ children }) => {
  const [convertedCode, setConvertedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


const convertCode = async ({ inputLang, outputLang, code }) => {
  setLoading(true);
  setConvertedCode("");
  setError(null);

  try {
    const response = await fetch(`${BASE_URL}/api/chat/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ inputLang, outputLang, code }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Conversion failed");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let fullResponse = "";
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      fullResponse += decoder.decode(value, { stream: true });
    }

    const codeStartMatch = fullResponse.match(/__CODE_START__([\s\S]*?)__CODE_END__/);

    if (!codeStartMatch || !codeStartMatch[1]) {
      setConvertedCode("Code block not found.");
      return;
    }

    const codeSection = codeStartMatch[1];

    const match = codeSection.match(/```[\w.+-]*\n([\s\S]*?)```/);
    let rawCode = match && match[1] ? match[1] : codeSection;

    // ✅ Step 1: Remove all line breaks, replace FLAG with real newline
    const codeWithNewlines = rawCode
      .replace(/\r?\n/g, " ")    // Remove all natural newlines
      .replace(/FLAG/gi, "\n");  // Insert actual line breaks at FLAG only

    // ✅ Step 2: Clean lines and remove duplicate empty lines
    const cleanedLines = codeWithNewlines
      .split("\n")
      .map((line) => line.trimEnd())
      .filter((line, idx, arr) => !(line.trim() === "" && arr[idx - 1]?.trim() === ""))
      .filter((line) => line.length > 0);

    // ✅ Step 3: Auto-indent based on braces
    const autoIndent = (codeLines) => {
      let indentLevel = 0;
      return codeLines.map((line) => {
        const trimmed = line.trim();

        if (/^[}\])]?$/.test(trimmed)) indentLevel--;

        const indented = "  ".repeat(Math.max(indentLevel, 0)) + trimmed;

        if (/[{\[(]$/.test(trimmed)) indentLevel++;

        return indented;
      }).join("\n");
    };

    const formattedCode = autoIndent(cleanedLines);

    // ✅ Step 4: Set the final result
    setConvertedCode(formattedCode.trim());
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};



  return (
    <ConverterContext.Provider
      value={{ convertCode, convertedCode, setConvertedCode, loading, error }}
    >
      {children}
    </ConverterContext.Provider>
  );
};

export const useConverter = () => useContext(ConverterContext);
