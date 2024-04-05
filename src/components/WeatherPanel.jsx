import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

export const weatherPanelMode = {
  NOT_AVAILABLE: 0,
  CITY_NOT_FOUND: 1,
  AVAILABLE: 2
}

const WeatherPanel = ({ mode, forecast }) => {
  const classes = useStyles()

  const notAvailable = () => <div>The weather forecast is only available within a 5-day range starting from the current day!</div>

  const cityNotFound = () => <div>The specified city was not found, therefore no forecast could be fetched.</div>

  const forecastAvailable = () => (
    <div className={classes.forecastContainer}>
      <Typography variant="h5">{`${parseInt(forecast.main.temp)}°C`}</Typography>

      <img
        className={classes.image}
        width={150}
        height={150}
        alt="clear"
        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`}
      />
    </div>
  )

  const getPanel = (panel) => {
    switch (panel) {
      case weatherPanelMode.NOT_AVAILABLE:
        return notAvailable()
      case weatherPanelMode.CITY_NOT_FOUND:
        return cityNotFound()
      case weatherPanelMode.AVAILABLE:
        return forecastAvailable()
      default:
        return notAvailable()
    }
  }

  return <div className={classes.weatherPanel}>{getPanel(mode)}</div>
}

const useStyles = makeStyles({
  weatherPanel: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  forecastContainer: {
    width: '100%',
    textAlign: 'center'
  },
  image: {
    margin: 0
  }
})

export default WeatherPanel
