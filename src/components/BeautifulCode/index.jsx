import React from "react";
import "./highlith.css";
import marked from "marked";
import hljs from "highlight.js";

const BeautifulCode = ({ code }) => {
  const MARKDOWN_TEXT = `
\`\`\`${code}\`\`\`
`;

  marked.setOptions({
    langPrefix: "hljs language-",
    highlight: function (code) {
      return hljs.highlightAuto(code, ["html", "javascript"]).value;
    },
  });

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: marked(MARKDOWN_TEXT) }} />
    </div>
  );
};

export default BeautifulCode;
