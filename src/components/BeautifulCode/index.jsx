import React from "react";
import "./highlith.css";
import marked from "marked";
import hljs from "highlight.js";

const BeautifulCode = ({ codeSource }) => {
  const MARKDOWN_TEXT = `
\`\`\`javascript
${codeSource}
\`\`\`
`;

  marked.setOptions({
    langPrefix: "hljs language-",
    highlight: function (code) {
      return hljs.highlightAuto(code, ["html", "javascript"]).value;
    },
  });

  return (
    <div>
      <div
        style={{ height: "300px", overflow: "auto" }}
        dangerouslySetInnerHTML={{ __html: marked(MARKDOWN_TEXT) }}
      />
    </div>
  );
};

export default BeautifulCode;
