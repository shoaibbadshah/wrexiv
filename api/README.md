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
psql -h localhost -p 5432 -U app_user -d app_db

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


## Others

- enum はハマったので一旦 DB で使わない
- repositories も一旦使わない
- services も一旦使わない
