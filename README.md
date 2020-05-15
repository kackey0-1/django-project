# TRUST_idealASP

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
```
docker-compose run python python manage.py migrate
docker-compose run python python manage.py shell -c "from django.contrib.auth import get_user_model; get_user_model().objects.create_superuser('admin', 'admin@example.com', 'adminpass');"
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

今回はdockerの設定上、下記のローカルIP, portでサーバーが立ち上がるようになっている。

```
127.0.0.1:8000
```

アクセスすると、初期画面からlogin機能のついたページへリダイレクトされる

## Docker上のDjango開発用shellの起動方法
履歴表示や自動補完等を利用するためshell_plusとipythonを利用する。
下記のコマンドで起動が可能

```
docker-compose run python python manage.py shell_plus --print-sql
```

## コンテナ内でのコマンド実行方法
コンテナ内でのコマンド実行は下記で行うことができます。

```
$ docker-compose run python 実行したいコマンド
```

一つ目の引数である"python"は、docker-cimpose.ymlファイルのサービス名である"python"内での実行を意味しています。 下記が具体例です。

例：make migrations方法

```
$ docker-compose run python python manage.py makemigrations
```

例：migrate方法

```
$ docker-compose run python python manage.py migrate
```

## モデルに初期値を入れる方法
モデルに初期値を入れるには、下記の手順をふみます

1. アプリケーションフォルダの中にfixturesフォルダを作る
2. fixturesフォルダの中に"{テーブル名}.json"を作成する
3. 下記コマンドを実行する

```
$ docker-compose run python python manage.py loaddata {テーブル名ファイル}.json
```

## 初期データを入れるファイルを作成したため、開発前にこちちらのコマンドを実行

```
docker-compose run python python manage.py loaddata address_regions.json
docker-compose run python python manage.py loaddata address_states.json
docker-compose run python python manage.py loaddata employee_groups.json
docker-compose run python python manage.py loaddata users.json
docker-compose run python python manage.py loaddata clients.json
docker-compose run python python manage.py loaddata constructions.json
docker-compose run python python manage.py loaddata invoices.json
docker-compose run python python manage.py loaddata invoice_details.json
docker-compose run python python manage.py loaddata estimates.json
docker-compose run python python manage.py loaddata estimation_entries.json
docker-compose run python python manage.py loaddata choices_code_data.json
docker-compose run python python manage.py loaddata partner_companies_temp.json
docker-compose run python python manage.py loaddata partner_company_bank_information.json
docker-compose run python python manage.py loaddata estimate_mst.json
docker-compose run python python manage.py loaddata estimate_mst_details.json
docker-compose run python python manage.py loaddata merchandise_orders.json
docker-compose run python python manage.py loaddata merchandise_details.json
docker-compose run python python manage.py loaddata outsource_orders_temp.json
docker-compose run python python manage.py loaddata outsource_details_temp.json
docker-compose run python python manage.py loaddata contracts.json
docker-compose run python python manage.py loaddata sales_results.json
docker-compose run python python manage.py loaddata sales_targets.json
docker-compose run python python manage.py loaddata salling_general_administrations.json
```

または下記コマンド
```
$ sh deploy/all_batch.sh 
```

このコマンドを実行することで、テストデータが入る

## テストデータを入れた後

テストデータ挿入後
ログイン画面にて（/auth/login）

```
メールアドレス: test@gmail.com
パスワード: 11223344
```

こちらを入力して、ログインする。

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

## コードマスタのfixtureダンプ生成について
```
docker-compose run python python manage.py dumpdata --indent=2 --format=json constructions_app.choices | echo -e "$(cat)") > ./constructions_app/fixtures/choices_code_data.json
```