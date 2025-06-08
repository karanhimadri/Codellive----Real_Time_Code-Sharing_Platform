import React, { useContext, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { codeContext } from "../context/CodeContextProvider";
import { authContext } from "../context/AuthContextProvider";

const MonacoEditor = () => {
  const { lang, theme, localCode, handleCodeFromMonacoEditor } = useContext(codeContext);
  const { isTempLoggedIn, setIsTempLoggedIn } = useContext(authContext);

  // Handle typing events
  const handleTypingEvents = (editor, callback) => {
    if (!editor || typeof callback !== "function") return;

    editor.onDidChangeModelContent(() => {
      const currentCode = editor.getValue();

      if (!isTempLoggedIn) {
        setIsTempLoggedIn(false)
      }

      callback(currentCode); // continue your normal code sync
    });
  };

  return (
    <div>
      <Editor
        height="575px"
        language={lang}
        value={localCode}
        theme={theme}
        onChange={(value) => handleCodeFromMonacoEditor(value)}
        onMount={(editor) => { handleTypingEvents(editor, handleCodeFromMonacoEditor) }}
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
