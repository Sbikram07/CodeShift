import React from "react";
import Editor from "react-simple-code-editor";
import Highlight, { defaultProps } from "prism-react-renderer";
import vscDarkPlus from "prism-react-renderer/themes/vsDark";

const CodeInput = ({ code, setCode, language = "javascript" }) => {
  return (
    <div className="rounded-md overflow-hidden font-mono text-sm bg-[#1e1e1e]">
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={(code) => (
          <Highlight
            {...defaultProps}
            code={code}
            language={language}
            theme={vscDarkPlus}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={className}
                style={{ ...style, margin: 0, padding: 0 }}
              >
                {tokens.map((line, i) => {
                  const { key, ...lineProps } = getLineProps({ line });
                  return (
                    <div key={i} {...lineProps}>
                      {line.map((token, j) => {
                        const { key: tokenKey, ...tokenProps } = getTokenProps({
                          token,
                        });
                        return <span key={j} {...tokenProps} />;
                      })}
                    </div>
                  );
                })}
              </pre>
            )}
          </Highlight>
        )}
        padding={16}
        className="outline-none w-full min-h-[200px] react-simple-code-editor"
        style={{
          fontFamily: '"Fira Code", monospace',
          fontSize: 14,
        }}
        placeholder="Write or paste your code here..."
      />
    </div>
  );
};

export default CodeInput;
