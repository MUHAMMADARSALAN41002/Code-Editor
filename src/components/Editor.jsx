import React, { useEffect, useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled } from "react-codemirror2";
import "./Editor.css";

const Editor = (props) => {
  const { name, language, onChange, value } = props;
  const [open, setopen] = useState(true);

  function handleChange(editor, data, value) {
    onChange(value);
  }

  useEffect(() => {
    const collapsedEle = document.getElementsByClassName("collapsed");
    if (window.screen.width > 768) {
      if (collapsedEle.length == 2) {
        const hideIcon = document.getElementsByClassName("notCollapse")[0];
        hideIcon.querySelector(".expand_collapse_btn").style.display = "none";
      } else {
        const showIcon = document.querySelectorAll(".expand_collapse_btn");

        showIcon.forEach((element) => {
          element.style.removeProperty("display");
        });
      }
    }
  }, [open]);

  return (
    <>
      <div className={`editor_container ${open ? "notCollapse" : "collapsed"}`}>
        <div className="editor_heading">
          {name}
          <button
            onClick={() => setopen(!open)}
            className="expand_collapse_btn"
          >
            {open ? (
              <i className="uil uil-compress-alt"></i>
            ) : (
              <i className="uil uil-expand-alt"></i>
            )}
          </button>
        </div>
        <Controlled
          onBeforeChange={handleChange}
          value={value}
          className="code_mirror_wrapper"
          options={{
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: "material",
            lineNumbers: true,
          }}
        />
      </div>
    </>
  );
};

export default Editor;
