import React, { useEffect, useState } from "react";
import "./App.css";
import Editor from "./components/Editor";
import useLocalStorage from "./components/useLocalStorage";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [javascript, setJavascript] = useLocalStorage("js", "");
  const [data, setData] = useState("");

  useEffect(() => {
    const timeoutData = setTimeout(() => {
      setData(`
      <html>
        <body>${html} </body> 
        <style> ${css}</style>
        <script>${javascript}</script>
      </html>
      `);
    }, 250);
    return () => {
      clearTimeout(timeoutData);
    };
  }, [html, css, javascript]);

  return (
    <>
      <div className="box editor">
        <Editor name="HTML" language="xml" value={html} onChange={setHtml} />
        <Editor name="CSS" language="css" value={css} onChange={setCss} />
        <Editor
          name="JS"
          language="javascript"
          value={javascript}
          onChange={setJavascript}
        />
      </div>
      <div className="box">
        <iframe
          srcDoc={data}
          title="output"
          className="output_data"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
