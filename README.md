# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

To generate graphs and data, first:
- Put all bender addresses in hosts.txt separated by a newline
- Put correct addresses in BENDER_DIR and BENDER_USER in metrics.sh. BENDER_DIR is the directory on the bender which the shell scripts will reside. BENDER_USER is username to login into bender
- Put correct addresses in PROJECT_LOCATION in metric-collector.sh. PROJECT_LOCATION is the location of metrics-{bender_hostname}.csv file on the current device

Then cd to project directory then run:
### `./metrics.sh`

To launch web app, cd to project directory then run:
### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.