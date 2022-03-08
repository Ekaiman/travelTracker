# Travel Tracker

Travel tracker is an application that shows a users past, pending and current trips taken. They can select a new trip see the calculated estimated cost and submit a new trip which will then appear in pending for an agent to approve.

![Gif 1](http://g.recordit.co/vfFvdwEx7a.gif)

# Contributors
- [Emili Kaiman](https://github.com/Ekaiman)

# Technologies Used 
- Javascript
- HTML
- CSS
- Mocha/Chai
- Webpack
- SCSS

# Getting Started
To get a local copy up and running follow these simple steps.

## Installation

1. In your terminal, clone the repo
   ```sh
   git@github.com:Ekaiman/travelTracker.git
   ```
2. `cd` into that directory
3. Install NPM packages
   ```sh
   npm install
   ```
4. Start the server
   ```sh
   npm start
   ``` 
   
## Local Server
1. In your terminal, clone the repo
   ```sh
   git@github.com:turingschool-examples/travel-tracker-api.git
   ```
2. `cd` into that directory
3. Install NPM packages
   ```sh
   npm install
   ```
4. Start the server
   ```sh
   npm start
   ```
   
## View Site
After starting both servers, project will run at http://localhost:8080/  
   
## Run Test

1. In your terminal, to run a test
   ```sh
   npm test
   ```


# Code Architecture 
If you want to know more about our code architecture, [click here](https://gist.github.com/Ekaiman/f0c6022e295921a810e7531a4d38f9b0).

# Challenges and Wins
Asynchronous JavaScript was a challenge in this project. A win was sorting the the trips by their dates and learning more about new Date

# Future Additions
- Agent side to approve or deny pending trips.
- Error handling for input field, empty or past dates. 
- Ability to click on a card and see more information about the trip.
- Sad path testing.
- Remove god class.


