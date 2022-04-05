import React from "react";
import { Box, Typography } from "@material-ui/core";

import BorderLinearProgressCustom from "./BorderLinearProgressCustom";

const BorderLinearProgress = ({ percent, width }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width={width} mr={1}>
        <BorderLinearProgressCustom variant="determinate" value={percent} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {percent}%
        </Typography>
      </Box>
    </Box>
  );
};

export default BorderLinearProgress;
