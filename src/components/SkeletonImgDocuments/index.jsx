import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const SkeletonImgDocuments = ({
  widthImg = 210,
  heightImg = 118,
  widthText = 210,
}) => {
  return (
    <div>
      <Skeleton variant="text" width={widthText} />
      <Skeleton variant="rect" width={widthImg} height={heightImg} />
    </div>
  );
};

export default SkeletonImgDocuments;
