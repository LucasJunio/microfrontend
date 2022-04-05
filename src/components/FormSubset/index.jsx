import React from 'react';

import { Card, CardContent, CardHeader } from '@material-ui/core';
import { GlobalPageStyles } from '../../styles/GlobalPageStyles';

const FormSubset = ({ title, children }) => {
  const globalClasses = GlobalPageStyles();
  return (
    <Card className={globalClasses.marginCard}>
      <CardHeader
        title={title}
        className={globalClasses.cardHeader}
        titleTypographyProps={{ variant: 'h4', gutterBottom: true }}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FormSubset;
