import React, { useState } from "react";
import "./highlith.css";
import marked from "marked";
import hljs from "highlight.js";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { FileCopy, Check } from "@material-ui/icons/";
import { useStyles } from "./styles";
import { copyClipBoard } from "utils/clipboard/copyClipboard";

const BeautifulCode = ({ codeSource }) => {
  const classes = useStyles();
  const [copy, setCopy] = useState(false);
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

  const handleIcon = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 500);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Tooltip title="Copiar" aria-label="Copiar">
          <IconButton
            aria-label="Copiar"
            onClick={() => {
              handleIcon();
              copyClipBoard(codeSource);
            }}
          >
            {copy ? (
              <>
                <Check className={classes.buttonCopy} />
                <Typography className={classes.textCopy}>Copiado!</Typography>
              </>
            ) : (
              <FileCopy className={classes.buttonCopy} />
            )}
          </IconButton>
        </Tooltip>
      </div>
      <div dangerouslySetInnerHTML={{ __html: marked(MARKDOWN_TEXT) }} />
    </div>
  );
};

export default BeautifulCode;
