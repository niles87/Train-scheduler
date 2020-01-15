# Train-scheduler

## Overview

This project uses firebase database to store data from a users input. When the data is saved in the database use jquery to populate the page with stored data.

## How it works

A user inputs information for the train they would like to schedule like the name, destination, frequency, and its starting time. After the user submits the form a call to the database, where the data is stored, is made. The starting time and frequency are used with moment.js to figure out the time of the next train arrival and the time in minutes of arrival.
