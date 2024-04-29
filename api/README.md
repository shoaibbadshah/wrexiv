## Initial Setup

#### Environment Variables
Copy `.env.example` to `.env` and update the values.
```
cp .env.example .env
```

#### Credentials
Add Firebase `credentials.json` to `app\config\` directory.

#### Running the app
You can run the app using the docker-compose command.
```
docker-compose up
```
#### Setup DB Tables
Go to the `api` container (the name of the container may be different. you can check it using `docker ps` command).
```
docker exec -it globaltalentdb-api bash
```

Then, run the following commands in the container

```
flask db upgrade
```

### How to go to the database
You can go to the database using psql inside the `db` container.
```
docker exec -it globaltalentdb-db psql -U app_user -d app_db
```
Or if you have psql installed on your local machine, you can connect to the database using the following command.
```
psql -h localhost -p 5432 -U app_user -d app_db
```


### How to add or update the database schema
Create or update the models in the `app\models` directory. Then, go to the `api` container.
```
docker exec -it globaltalentdb-api /bin/bash
```

Then, run the following commands in the container
```
flask db migrate -m <migration message>
flask db upgrade
```

### How to add or update the graphql schema
Create or update the mutations on the `app\graph\mutations` directory or resolvers on the `app\graph\resolvers` directory. Then, update the schema in the `app\graph\schema.py` file.


### might need these
ps aux | grep postgres
brew services list
launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.postgresql@14.plist

## When you get the Token used too early error on Firebase Authentication
```
sntp ntp.nict.jp
sudo rm /var/db/timed/com.apple.timed.plist
sudo sntp -sS ntp.nict.jp
ps -ef | grep timed
sudo kill </usr/libexec/timedのPID>
sudo sntp -sS ntp.nict.jp
```

## Test

```
docker-compose run api bash
python -m pytest
python -m pytest -s
python -m pytest tests/services/test_facilities_service.py -vv
python -m pytest tests/services/test_facilities_service.py::test_specific_function
```

## Others

- enum はハマったので一旦 DB で使わない
- repositories も一旦使わない
- services も一旦使わない

