# Todo app

### Description

A simple to-do list with authentication and authorization. An authenticated user should be able to create a to-do list and make its accessibility public or private. If public, there should be no need for authentication to view it. If private, it would require the user to be logged in and be the owner to view it.

### Permissions

It should require a user to get authenticated to have permission to create or update their to-do list. It should allow anyone to view the to-do list.

### Frontend technologies

- [TypeScript](https://www.typescriptlang.org/docs/)
- [React](https://reactjs.org/docs/getting-started.html)
- [ReactRouter](https://reactrouter.com/en/main)
- [Axios](https://axios-http.com/docs/intro)

### Backend technologies

- [Python](https://www.python.org/doc/)
- [Django](https://docs.djangoproject.com/en/4.1/)
- [Django Rest Framework (DRF)](https://www.django-rest-framework.org/)
- [DRF SimpleJWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [pgAdmin4](https://www.pgadmin.org/download/) (optional)

### Starting the app

##### Build frontend

Build the frontend to get the latest version `index.html`:
```bash
$ cd app/frontend
$ npm run build
```

##### Databases

If you are using pgAdmin, start your connection to `PORT=5432`

If you want to use `sqlite`, comment out the active `DATABASE` defaults and uncomment the `sqlite` values

##### Virtual Environment

Create virtual environment inside `app/`:
```bash
$ python3 -m venv ./venv
```

Start the virtual environment:
```bash
$ source ./venv/bin/activate
```

##### Database migrations

Prepare and migrate database tables
```bash
(venv)$ python manage.py makemigrations
(venv)$ python manage.py migrate
```

##### Run the app

Start the application:
```bash
(venv)$ python manage.py runserver
```

Open the browser and view the app:
```bash
$ open -a 'Google Chrome' http://localhost:8000/#/
```
---

# Check games challenge

When given n players, m rounds and the teams for all games played, determine if all players each play all other players in the given games

### Assumptions

 - `n` is an even integer between 1 - 20,000 
 - `m` is an integer between 1 - 30 
 - `games` is an array of number arrays, with the index of each inner array represented by an entry from `1 - (n - 1)`, no entry repeated, all numbers from `1 - (n - 1)` present

### Examples

Read `index.test.ts` for example scenarios

### Running scenarios

To see scenarios tested:
```bash
$ cd challenge

# install dependencies
$ npm install

$ npm test
```