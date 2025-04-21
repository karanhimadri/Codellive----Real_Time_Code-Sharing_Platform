import React, { useContext, useState } from "react";
import Editor from "@monaco-editor/react";
import { codeContext } from "../context/CodeContextProvider";

const MonacoEditor = () => {
  const { lang, theme, localCode, handleCodeFromMonacoEditor } = useContext(codeContext)

  return (
    <div>
      <Editor
        height="575px"
        language={lang}
        value={localCode}
        onChange={(value) => handleCodeFromMonacoEditor(value)}
        theme={theme}
        options={{
          selectOnLineNumbers: true,
          automaticLayout: true,
          autoIndent: "full",
          formatOnPaste: true,
          formatOnType: true,
          fontSize: 15,
          lineHeight: "25px",
          minimap: { enabled: false },
          wordWrap: "on",
        }}
      />
    </div>
  );
};

export default MonacoEditor;
