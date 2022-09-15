# Interview Scheduler

An SPA that allows users to schedule and keep track of appointments.

## Setup

Install dependencies with `npm install`.

Dependencies include:
* An older version of react(16.9.0) (Can `npm run build` to deploy it)
* axios
* react-scripts
* classnames

Dev Dependencies:
* Storybook
* Jest
* @testing-library/react
* Cypress once those tests work :)

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

# Features

* Users can view appointments for the days of the week, and get updates in real time for spots remaining and which spots are open.
* Not yet implemented: Implement web socket so these updates happen for all users
* Users can create appointments, edit them, or delete them, with confirmation on destructive actions
* Communicates with a postgreSQL server API,  which is independent. You can find instructions to run your own [here](https://github.com/lighthouse-labs/scheduler-api)

## Screenshots
![main view](https://imgur.com/GaH4aLf)
![main view2](https://imgur.com/1jJ1MnX)
![Editing or creating appointments](https://imgur.com/l6uOBit)
![Delete confirmation](https://imgur.com/cfV6LMJ)

Made by [Sachieko](https://github.com/sachieko)