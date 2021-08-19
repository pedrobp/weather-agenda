import React, { useState } from 'react';
import {
  makeStyles,
  Button,
  DialogContent,
  DialogActions,
  TextField
} from '@material-ui/core';
import { addReminder, editReminder } from '../reducers/remindersSlice';
import { show as showSnackbar, changeMessage } from '../reducers/snackbarSlice';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Alert from '@material-ui/lab/Alert';

const ReminderConfiguration = ({ data, handleChangeData, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [alert, setAlert] = useState(false);

  const handleSaveReminder = () => {
    if (data.description === '' || data.city === '' || data.date === '') {
      return setAlert(true);
    }

    let message = '';

    if (data.id !== '') {
      dispatch(
        editReminder({
          id: data.id,
          date: new Date(data.date),
          description: data.description,
          city: data.city
        })
      );

      message = 'Reminder was successfully edited!';
    } else {
      dispatch(
        addReminder({
          id: uuidv4(),
          date: new Date(data.date),
          description: data.description,
          city: data.city
        })
      );

      message = 'Reminder was successfully created!';
    }
    dispatch(changeMessage(message));
    dispatch(showSnackbar());
    handleClose();
  };

  return (
    <div>
      <DialogContent className={classes.content} dividers>
        <TextField
          label="Reminder description"
          placeholder="Max. 30 characters"
          variant="outlined"
          inputProps={{ maxLength: 30, 'data-testid': 'description-input' }}
          value={data.description}
          onChange={(e) =>
            handleChangeData({ ...data, description: e.target.value })
          }
        />

        <TextField
          label="City"
          variant="outlined"
          inputProps={{ 'data-testid': 'city-input' }}
          value={data.city}
          onChange={(e) => handleChangeData({ ...data, city: e.target.value })}
        />

        <TextField
          label="Date and time"
          type="datetime-local"
          variant="outlined"
          inputProps={{ 'data-testid': 'date-input' }}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          value={data.date}
          onChange={(e) => handleChangeData({ ...data, date: e.target.value })}
        />
      </DialogContent>

      <DialogActions>
        {alert && (
          <Alert className={classes.alert} variant="filled" severity="warning">
            Please complete all the blank fields!
          </Alert>
        )}
        <Button
          data-testid="add-reminder"
          onClick={handleSaveReminder}
          color="primary"
          variant="contained"
          className={classes.saveButton}
        >
          Save
        </Button>
      </DialogActions>
    </div>
  );
};

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    width: '25vw'
  },
  alert: {
    flex: 1,
    maxHeight: '20px',
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveButton: {
    fontWeight: 'bold'
  }
});

export default ReminderConfiguration;
