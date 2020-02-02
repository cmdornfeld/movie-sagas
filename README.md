# Movies-Saga

## Description
For this weekend project (#6), we were given the task of creating an application that allows the user to view all of the movies stored in our database.  The user can select a movie (click on the movie poster) for more details, including the genre(s) that it falls under, as well as edit the title and/or description of a selected movie.  If the user does edit a movie title or description, the information is saved to our database.

## Prerequisites

-   node.js
-   express.js
-   PG
-   database (Postico or equivalent)
-   React
-   Redux
-   Saga


## Installation

1. In your editor of choice, navigate to the main project directory, open your terminal and type `npm install` in the command line, in order to install the dependencies for this project
2. Database setup -
    -   a.  Create a database named `saga_movies_weekend`
    -   b.  Execute all of the scripts from `database.sql` in the `saga_movies_weekend` database
3. Run `npm run server` in your terminal (to spin up server; this has been set up for you)
4. Open an additional terminal (clicking the + in your open terminal), and run `npm run client` (localhost will automatically open in your default browser)

## Usage

1. Localhost will begin on our homepage, which will render all movies currently in the database
2. Click on a movie poster of your choosing, which will move you to the details page
3. On the details page, review the movie description and genre(s) the movie falls in. Click the `Back to List` button to return to the homepage, or click the `Edit` button to move to the edit page
4. If `Edit` was clicked, you now have the option to enter a new movie title and description!  If there are no desired changes, click the    `Cancel` button to return to the details page
5. If you wish to save the changes to the movie, click the `Save` button, and you will be returned to the details page with the updated movie details

## Built With
-   node.js
-   express.js
-   React
-   CSS
-   Material-UI
-   Redux
-   Saga
-   PG

## Acknowledgement
Huge thanks to Prime Digital Academy(Minneapolis), my instructor, Mary, and my cohort, Trifid!

## Support
No longer being supported... designed for learning purposes
