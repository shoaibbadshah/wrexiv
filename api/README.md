## Environment Variables
Copy `.env.example` to `.env` and update the values.
```
cp .env.example .env
```

## Credentials
Add `credentials.json` to `app\config\` directory.

## DB

docker-compose run db bash
psql -U app_user -h db -d app_db


## DB tables

docker-compose run api bash
flask db migrate -m "Create tenant table"
flask db upgrade
flask db downgrade

### Add this to migration files
import sqlalchemy_utils

## vscode postgreSQL
- If you have postgresql client installed, you can connect to the database using the following command:
```
psql -h localhost -p 5432 -U app_user -d app_db
```
- If you don't have the client installed, you can use psql inside the docker container:
```
docker exec -it globaltalentdb-db /bin/bash 
```
then inside the container:
```
psql -U app_user -d app_db
```


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

