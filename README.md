# Fullstack Technical Assessment

-Instructions:

-Clone the repo

-Create a psql database called fullstack-dp

-npm install

-npm run seed

-npm run start

-Open your browser of choice to localhost:3000

  
## Assumptions:

-I assume various forms of security would not be a concern, as the program sounds as if it would be personal use only.

-The project may need to be added to in the future, and simplicity is key; so force synchronizing the database allows you to worry only about what is in the csv file, as it completely resets the database each time.

-There is some logic included for a possible Heroku deployment, which might be a useful way of sharing it.

-I also assumed the restaurant labeled "click to register domain name" was a mistake, and did not spend time attempting to filter for it.


## Notes:

-There is currently a bug wherein an extra relational table called cuisineid is added, but it does not affect functionality.

-The program currently does not throw an error consistently when an invalid character is input.

-Sequelize was chosen because of its readability.  SQL is apparently more popular but I find that the syntax of Sequelize is easier to grasp at a glance, and suited such a simple project well.