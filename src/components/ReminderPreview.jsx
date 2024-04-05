import React, { useEffect, useState } from 'react'
import { makeStyles, DialogContent, DialogActions, Typography, CircularProgress } from '@material-ui/core'
import Delete from '@material-ui/icons/DeleteForeverRounded'
import Edit from '@material-ui/icons/EditRounded'
import { deleteReminder } from '../reducers/remindersSlice'
import { useDispatch } from 'react-redux'
import { addDays, format, isSameDay } from 'date-fns'
import { IconButton } from '@material-ui/core'
import WeatherPanel, { weatherPanelMode } from './WeatherPanel'
import { dialogMode } from './ReminderDialog'
import apiKey from '../config/openWeatherApi'

const ReminderPreview = ({ data, handleClose, handleChangeMode, handleChangeData }) => {
  const [forecast, setForecast] = useState(null)
  const [weatherPanel, setWeatherPanel] = useState(weatherPanelMode.NOT_AVAILABLE)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    const today = new Date().setHours(0, 0)
    if (data.date > addDays(today, 8) || data.date < today) return setWeatherPanel(weatherPanelMode.NOT_AVAILABLE)

    setLoading(true)

    // gets city geolocation info
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${data.city}&limit=1&appid=${apiKey}`)
      .then((response) => response.json())
      .then((json) => {
        const cityData = json.shift ? json?.shift() : null

        if (!cityData) {
          setLoading(false)
          return setWeatherPanel(weatherPanelMode.CITY_NOT_FOUND)
        }

        // gets weather forecast for the location for the next 7 days
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&appid=${apiKey}`)
          .then((response) => response.json())
          .then((json) => {
            const forecastData = json?.list?.find((d) => {
              const date = new Date(d.dt * 1000)
              return isSameDay(date, data.date) && date.getHours() >= (data.date.getHours() > 18 ? 18 : data.date.getHours())
            })

            if (forecastData) {
              setWeatherPanel(weatherPanelMode.AVAILABLE)
              setForecast(forecastData)
            }

            setLoading(false)
          })
      })
  }, [data, setWeatherPanel])

  const handleDeleteReminder = () => {
    dispatch(deleteReminder(data.id))
    handleClose()
  }

  const handleEditReminder = () => {
    handleChangeMode(dialogMode.CONFIG)
    handleChangeData({
      ...data,
      date: format(data.date, "yyyy-MM-dd'T'HH:mm")
    })
  }

  return (
    <div className={classes.container}>
      <DialogContent className={classes.content}>
        <div className={classes.details}>
          <Typography color="primary" gutterBottom variant="h5">
            {data.description}
          </Typography>

          <div className={classes.contentRow}>
            <Typography className={classes.bold}>City: </Typography>
            <Typography>{data.city}</Typography>
          </div>

          <div className={classes.contentRow}>
            <Typography className={classes.bold}>Date and time: </Typography>
            <Typography>{format(data.date, 'yyyy-MM-dd HH:mm')}</Typography>
          </div>

          {forecast && (
            <div className={classes.contentRow}>
              <Typography className={classes.bold}>Weather forecast:</Typography>
              <Typography>{forecast.weather[0].description}</Typography>
            </div>
          )}
        </div>

        {loading ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
            <div>Getting weather data...</div>
          </div>
        ) : (
          <WeatherPanel mode={weatherPanel} forecast={forecast} />
        )}
      </DialogContent>

      <DialogActions>
        <IconButton className={classes.icon} onClick={handleEditReminder}>
          <Edit />
        </IconButton>
        <IconButton className={classes.icon} onClick={handleDeleteReminder}>
          <Delete />
        </IconButton>
      </DialogActions>
    </div>
  )
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '40vw',
    minHeight: '30vh'
  },
  content: {
    display: 'flex',
    flexDirection: 'row'
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
    alignItems: 'center',
    textTransform: 'capitalize'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: '15px'
  },
  icon: {
    color: '#555'
  },
  bold: {
    fontWeight: 'bold'
  },
  loadingContainer: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center'
  }
})

export default ReminderPreview
