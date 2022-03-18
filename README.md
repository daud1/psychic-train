
# Tuzimbe 
a construction site app to keep track of worker-attendance and building materials at construction sites.
Visit the site [here](https://daud1.github.io/psychic-train/)

## SetUp

#### Pre-requisites
- python
- postgresql
- nodejs


#### Steps

1. See [env.sample](./env.sample) for an example of what your .env file should look like.

2. create a new virtual environment, activate it and install dependencies

  ```bash
  python3 -m venv ./.venv && source ./.venv/bin/activate
  pip install -r requirements.txt
  ```

3. run database migrations with:

  ```bash
  python manage.py migrate
  ```

4. run the server with the command below and visit http://localhost:8000 in your browser.
  ```bash
  python manage.py runserver
  ```

5. Switch to /front and run the following command to start the React frontend
  ```bash
  yarn run start
  ```