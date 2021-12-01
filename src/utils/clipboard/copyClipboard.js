const copyClipBoard = (value) => {
  navigator.clipboard.writeText(value);
};

export { copyClipBoard };
