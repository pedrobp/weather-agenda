import React, { useState } from 'react';
import {
  addDays,
  addMonths,
  format,
  isSameDay,
  isWeekend,
  startOfWeek
} from 'date-fns';
import {
  IconButton,
  makeStyles,
  Typography,
  Snackbar,
  Tooltip,
  Button
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import ArrowBack from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForward from '@material-ui/icons/ArrowForwardIosRounded';
import Add from '@material-ui/icons/Add';
import { useSelector, useDispatch } from 'react-redux';
import { selectReminders } from '../reducers/remindersSlice';
import ReminderChip from '../components/ReminderChip';
import ReminderDialog, { dialogMode } from '../components/ReminderDialog';
import clsx from 'clsx';
import {
  selectSnackBar,
  hide as hideSnackbar
} from '../reducers/snackbarSlice';

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const rows = [...Array(6).keys()];
const columns = [...Array(7).keys()];

const buildDateMatrix = (year, month) => {
  const matrix = [];
  const date = new Date(year, month);

  let currentDate = startOfWeek(date);

  rows.forEach(() => {
    const week = [];

    columns.forEach(() => {
      week.push(currentDate);
      currentDate = addDays(currentDate, 1);
    });

    matrix.push(week);
  });

  return matrix;
};

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [currentReminder, setCurrentReminder] = useState({
    id: '',
    date: '',
    description: '',
    city: ''
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState(dialogMode.PREVIEW);

  const reminders = useSelector(selectReminders);
  const snackbar = useSelector(selectSnackBar);
  const dispatch = useDispatch();
  const classes = useStyles();
  const dateMatrix = buildDateMatrix(date.getFullYear(), date.getMonth());

  const handleOpenDialog = (day) => {
    setMode(dialogMode.CONFIG);
    setDialogOpen(true);
    if (day) {
      setCurrentReminder({
        id: '',
        description: '',
        city: '',
        date: format(day.setHours(12, 0), "yyyy-MM-dd'T'HH:mm")
      });
    }
  };

  const handleOpenReminder = (reminder) => {
    setMode(dialogMode.PREVIEW);
    setDialogOpen(true);
    setCurrentReminder(reminder);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const getDayColor = (day) => {
    if (day.getMonth() !== date.getMonth()) return themeColors.grey;
    else if (isWeekend(day)) return themeColors.blue;
    else return themeColors.darkGrey;
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h1 className={classes.title}>Calendar</h1>

        <div className={classes.monthSelector}>
          <IconButton onClick={() => setDate(addMonths(date, -1))}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="label">
            {format(date, 'MMM yyyy')}
          </Typography>
          <IconButton onClick={() => setDate(addMonths(date, 1))}>
            <ArrowForward />
          </IconButton>
        </div>

        <div className={clsx(classes.dayOfWeekRow, classes.border)}>
          {daysOfWeek.map((dayOfWeek, index) => (
            <Typography key={index} className={classes.dayOfWeek}>
              {dayOfWeek}
            </Typography>
          ))}
        </div>

        <div className={clsx(classes.gridContainer, classes.border)}>
          {dateMatrix?.map((week, weekIndex) => (
            <div key={weekIndex} className={classes.weekRow}>
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={clsx(
                    classes.dayContainer,
                    classes.border,
                    isWeekend(day) ? classes.weekendContainer : ''
                  )}
                >
                  <div
                    className={classes.dayHeader}
                    style={{ '&:hover > *': { display: 'block' } }}
                  >
                    <Typography
                      className={classes.dayOfMonth}
                      style={{ color: getDayColor(day) }}
                    >
                      {day.getDate()}
                    </Typography>
                    <Tooltip arrow enterDelay={300} title="Add a new reminder">
                      <IconButton
                        id="icon"
                        className={classes.addIcon}
                        onClick={() => handleOpenDialog(day)}
                      >
                        <Add />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div className={classes.chipList}>
                    {reminders
                      ?.filter((r) => isSameDay(r.date, day))
                      .sort((a, b) => (a.date < b.date ? -1 : 1))
                      .map((r, chipIndex) => (
                        <ReminderChip
                          key={chipIndex}
                          data={r}
                          handleOpenReminder={() => handleOpenReminder(r)}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <ReminderDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        data={currentReminder}
        handleChangeData={setCurrentReminder}
        mode={mode}
        handleChangeMode={setMode}
      />

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbar.open}
        onClose={() => {
          dispatch(hideSnackbar());
        }}
        autoHideDuration={3000}
      >
        <Alert variant="filled" severity={snackbar.status}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Button
        color="primary"
        variant="contained"
        className={classes.addButton}
        onClick={() => handleOpenDialog(new Date())}
      >
        <AddIcon />
        New Reminder
      </Button>
    </div>
  );
};

const themeColors = {
  blue: '#3f51b5',
  grey: 'darkgrey',
  darkGrey: '#555'
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    marginTop: '25px'
  },
  container: {
    width: '80%'
  },
  monthSelector: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gridContainer: {
    display: 'grid',
    height: '80vh',
    gridAutoRows: '1fr',
    minHeight: '550px'
  },
  dayOfWeekRow: {
    display: 'flex'
  },
  weekRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)'
  },
  dayOfWeek: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    backgroundColor: themeColors.blue,
    fontWeight: 'bold',
    lineHeight: '30px'
  },
  dayContainer: {
    padding: '5px',
    position: 'relative',
    '&:hover > * #icon': {
      display: 'block'
    }
  },
  weekendContainer: {
    backgroundColor: '#f7f3f3'
  },
  border: {
    border: '1px solid lightgrey'
  },
  dayOfMonth: {
    fontWeight: 'bold',
    flex: 1
  },
  chipList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    position: 'absolute',
    maxHeight: '70%',
    width: '95%',
    paddingRight: '3px',
    overflowY: 'auto'
  },
  dayHeader: {
    display: 'flex'
  },
  addIcon: {
    padding: 0,
    display: 'none'
  },
  addButton: {
    position: 'absolute',
    top: '25px',
    right: '10%',
    fontWeight: 'bold'
  }
});

export default Calendar;