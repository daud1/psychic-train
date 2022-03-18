# Tuzimbe

keep track of your workers' attendance and building materials at the construction sites.

Visit the demo [here](https://daud1.github.io/psychic-train/).

> Built with Django + ReactJS

## SetUp

#### Pre-requisites

- python
- postgresql
- nodejs

#### Steps

1. Set up your local database

   See [env.sample](./env.sample) on how to update any env variables or db credentials.

```bash
# db_name: tuzimbe_dev, db_password: set in .env, owner: postgres

psql -U postgres -h 127.0.0.1 -f create_dev_db.sql
```

2. create a new virtual environment, activate it and install dependencies

```bash
python3 -m venv ./.venv && source ./.venv/bin/activate
pip install -r requirements.txt
```

3. run database migrations with:

```bash
python manage.py migrate
```

4. Run the API server. It listens on localhost port:8000 by default

```bash
python manage.py runserver
```

5. In a new terminal, change your working directory to `./front`.
   Install frontend dependencies and start the ReactJS client on port 3000

```bash
yarn install
yarn run start
```
