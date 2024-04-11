# React Project - Weather Agenda

## Introduction

The application consists on a calendar enhanced with the following features:

- View any month/year the user would like
- Add one or more reminders (with a max. 30-character description and a city) to any date
- Edit reminders
- Delete reminders
- View a reminder content
- Check the weather forecast for the reminder's location and day

The state management was handled with `Redux Toolkit`, which helped with the creation of practical state and reducer slices. The library chosen for date and time handling was `date-fns`. The UI was developed with the help of the `Material UI` library, along with the use of `CSS` for styling and organization of the components. The api key used for the openWeather requests is stored inside the `src/config` folder. A group of unit tests were created to ensure the components are working properly, located in `src/components/tests`.

To access the deployed application, click [here](https://weather-agenda.netlify.app/).

## How to run

**You need to use Node 14!**

- Run `npm install` | `yarn install` to install all dependencies
- Run `npm start` | `yarn run` to run the app locally
- You can find the project running on `localhost:3000`
- Enjoy!
