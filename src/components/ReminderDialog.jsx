import React from 'react';
import {
  makeStyles,
  Dialog,
  DialogTitle,
  IconButton,
  Typography
} from '@material-ui/core';
import ReminderConfiguration from './ReminderConfiguration';
import ReminderPreview from './ReminderPreview';
import CloseIcon from '@material-ui/icons/Close';

export const dialogMode = {
  PREVIEW: 0,
  CONFIG: 1
};

const ReminderDialog = ({
  open,
  data,
  handleChangeData,
  handleClose,
  mode,
  handleChangeMode
}) => {
  const classes = useStyles();

  return (
    <Dialog maxWidth="md" open={open}>
      <DialogTitle disableTypography className={classes.title}>
        <Typography variant="h6">Reminder Details</Typography>
        <IconButton
          data-testid="close-button"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {mode === dialogMode.PREVIEW ? (
        <ReminderPreview
          data={data}
          handleClose={handleClose}
          handleChangeMode={handleChangeMode}
          handleChangeData={handleChangeData}
        />
      ) : mode === dialogMode.CONFIG ? (
        <ReminderConfiguration
          data={data}
          handleChangeData={handleChangeData}
          handleClose={handleClose}
        />
      ) : (
        ''
      )}
    </Dialog>
  );
};

const useStyles = makeStyles({
  title: {
    padding: '10px'
  },
  closeButton: {
    position: 'absolute',
    right: '5px',
    top: '5px',
    color: 'grey'
  }
});

export default ReminderDialog;
