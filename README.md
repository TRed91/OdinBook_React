# Odin Book - Front End

[Link](https://odinbook-react.pages.dev/)

![Screenshot of the app interface](public/OdinBook_SC_small.jpg)

## Implementastion
The frontend for the Odin Bool application is implemented using Vite + React and Javascript.
It is designed as an SPA using React Router.

It communicates with the [Odin Book Rest Api](https://github.com/TRed91/OdinBook_API "Odin Book API Github") for any CRUD operations.
User authentication and validation is performed on the API Server.

### Authentication
On successful Signup or Login a JWS Token is returned by the API. 
The front end then stores the token in the users local storage.
