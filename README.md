## ディレクトリ説明
基本的にソースコードはsrc配下の物を編集する。
※ 他ファイルはDockerのコンテナを立ち上げるに必要なものになるので、基本的に編集は行わない

# .envの準備
その後src/.envの内容を編集する
### developmentの場合
```
DJANGO_SETTINGS_MODULE=config.settings.local
```
### productionの場合
```
DJANGO_SETTINGS_MODULE=config.settings.production
```

# dbの準備
```bash
docker-compose run python python manage.py migrate
docker-compose run python python manage.py shell -c "from django.contrib.auth import get_user_model; get_user_model().objects.create_superuser('admin', 'admin@example.com', 'adminpass');"
# データ作成
# fixtures Timezone問題: https://docs.djangoproject.com/en/dev/topics/i18n/timezones/#fixtures
docker-compose run python python manage.py loaddata custom_user.json
docker-compose run python python manage.py loaddata clients.json
docker-compose run python python manage.py loaddata projects.json
```

# Django-Docker
DockerでDjangoを作る時に使うレポジトリです。

## Docker起動方法
コマンドはdockerコマンドを使う。
ファーストステップとして、dockerファイルからコンテナを立ち上げる。
Docker起動は、作業中のディレクトリにはいり、下記を実行致します。

```
$ docker-compose up -d --build
```

## モデルに初期値を入れる方法
モデルに初期値を入れるには、下記の手順をふみます

1. アプリケーションフォルダの中にfixturesフォルダを作る
2. fixturesフォルダの中に"{テーブル名}.json"を作成する
3. 下記コマンドを実行する

```
$ docker-compose run python python manage.py loaddata {テーブル名ファイル}.json
```

# Prepare database

```
docker-compose run python python manage.py migrate
docker-compose run python python manage.py shell -c "from django.contrib.auth import get_user_model; get_user_model().objects.create_superuser('admin', 'admin@example.com', 'adminpass');"
```

## Docker利用時のTips
Ctrl-pの2度押し問題を解決するため設定を追加する。
下記ファイルに
```
~/.docker/config.json
```
下記の設定を追加する
```
{
  "detachKeys": "ctrl-\\"
}
```

## Docker上のDjango開発用shellの起動方法
履歴表示や自動補完等を利用するためshell_plusとipythonを利用する。
下記のコマンドで起動が可能

```
docker-compose run python python manage.py shell_plus --print-sql
```

## コンテナ内でのコマンド実行方法
コンテナ内でのコマンド実行は下記で行うことができます。
一つ目の引数である"python"は、docker-cimpose.ymlファイルのサービス名である"python"内での実行を意味しています。 下記が具体例です。

```
$ docker-compose run python 実行したいコマンド
```

## コードマスタのfixtureダンプ生成について
```
docker-compose run python python manage.py dumpdata --indent=2 --format=json constructions_app.choices | echo -e "$(cat)") > ./constructions_app/fixtures/choices_code_data.json
```

例：make migrations方法

```
$ docker-compose run python python manage.py makemigrations
```

例：migrate方法

```
$ docker-compose run python python manage.py migrate
```
