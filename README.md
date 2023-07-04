# URL Shortener
Organization: Code 4 Commmunity 

Developer: Ananya Radhakrishnan

## Project Overview
This is a `React` web application that shortens long URLs into more manageable and shareable links. Users will be able to input any URL they would like, and the app will produce a shorter URL that redirects to the original URL. The back-end for this web application is through `Express` using REST routing and `SQLite` for persistent data storage. Front end and back end components were combined using the `axios` library. `Chakra UI` was used as the library for styling the front end user interface. 

## Structure
- `client`: React app providing the user interface. Contains the components used throughout the application, as well as styling and main pages with features. 
- `client2e`: Cypress project for end-to-end testing. 
- `server`: Provides the backend code for the application.

## Testing 
The express routes were initally tested using `Postman`, while the front end was tested using `Cypress`, an E2E testing framework. React components were also tested using `Jest` and the `React Testing Library`. Finally, the API was thoroughly tested using `supertest`, emulating HTTP requests to the Express router.
