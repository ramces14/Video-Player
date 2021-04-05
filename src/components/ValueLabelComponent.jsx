import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';

function ValueLabelComponent(props) {
   const { children, open, value } = props;

   return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
         {children}
      </Tooltip>
   );
}

export default ValueLabelComponent;
