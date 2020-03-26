# HanggMarket

HanggMarket is a project developed as part of a tecnical part of an interview with the next points.

-   It must be made with Laravel.
-   User CRUD:
    -   Must contains: name, lastname, email, password,birthdate, profile image.
-   Category CRUD:
    -   Must contains: name and description.
-   Product CRUD:
    -   Must contains: name, description and barcode (also category and price).
    -   One product can have many categories.
    -   One product can have many prices, but in diferent dates.
-   Must contain a Laravel API where:
    -   Token authentication.
    -   WebSocket query get every categories.
    -   WebSocket query get every product with price (actual price)

Finally the project was decided to be use with Laravel used as an API, and the serving a Nuxt (VueJS) front end for experimenting.

## How to begin?

First of all clone this repository or download it.

Then with the terminal inside the project folder:

---

Install php dependencies:

`composer install`

Once here, copy the .env.example as .env in the same root, and set the basic variables (app name, app url, database connection, etc.)

After, if APP_KEY is not set in .env file, execute the command:

`php artisan key:generate`

Install migrations with seeding (fill the tables):

`php artisan migrate --seed`

Creates the API key:

`php artisan passport:install`

Install node dependendencies:

`npm install`

Generates the frontend:

`npm run build`

## More about it

There are some errors because it was developed in a short period time and as a part of a technical test.
