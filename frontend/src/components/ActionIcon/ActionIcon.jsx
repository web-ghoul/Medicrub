import { IconButton, Tooltip } from '@mui/material';

const ActionIcon = ({ clicked, children, title }) => {
  return (
    <Tooltip title={title}>
      <IconButton onClick={clicked}>
        {children}
      </IconButton>
    </Tooltip>
  )
}

export default ActionIcon