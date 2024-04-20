## DB

docker-compose run db bash
psql -U app_user -h db -d app_db


## 作成

docker-compose run api bash
flask db migrate -m "Create tenant table"
flask db upgrade
flask db downgrade

なぜか以下を migration ファイルに置かないとエラーになる
import sqlalchemy_utils

## vscode の postgreSQL 接続
psql -h localhost -p 5432 -U app_user -d app_db

### うまくいかない場合
ps aux | grep postgres
brew services list
launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.postgresql@14.plist

## Firebase の認証で Token used too early が出るとき
```
sntp ntp.nict.jp
sudo rm /var/db/timed/com.apple.timed.plist
sudo sntp -sS ntp.nict.jp
ps -ef | grep timed
sudo kill </usr/libexec/timedのPID>
sudo sntp -sS ntp.nict.jp
```


## その他

- enum はハマったので一旦 DB で使わない
- repositories も一旦使わない
- services も一旦使わない

