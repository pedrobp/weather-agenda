import React from 'react';
import { makeStyles, ButtonBase, Tooltip } from '@material-ui/core';
import { format } from 'date-fns';

const ReminderChip = ({ data, handleOpenReminder }) => {
  const classes = useStyles();

  return (
    <Tooltip arrow enterDelay={500} title={data.description}>
      <ButtonBase onClick={handleOpenReminder} className={classes.root}>
        <div className={classes.time}>{format(data.date, 'HH:mm')}</div>
        <div className={classes.content}>{data.description}</div>
      </ButtonBase>
    </Tooltip>
  );
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: '#38bb4e',
    color: 'white',
    display: 'flex',
    borderRadius: '5px',
    lineHeight: '20px',
    cursor: 'pointer',
    '&:hover > #editIcon': {
      display: 'block'
    }
  },
  time: {
    fontWeight: 'bold',
    margin: '2px 5px'
  },
  content: {
    margin: '2px 5px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    flex: 1
  }
});

export default ReminderChip;
