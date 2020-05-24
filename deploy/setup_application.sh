docker-compose run python python manage.py makemigrations
docker-compose run python python manage.py migrate
# docker-compose run python python manage.py shell -c "from django.contrib.auth import get_user_model; get_user_model().objects.create_superuser('admin', 'admin@example.com', 'adminpass');"
# データ作成
# fixtures Timezone問題: https://docs.djangoproject.com/en/dev/topics/i18n/timezones/#fixtures
docker-compose run python python manage.py shell -c "from django.contrib.auth import get_user_model; get_user_model().objects.create_superuser('admin', 'admin@example.com', 'adminpass');"
docker-compose run python python manage.py loaddata clients.json
docker-compose run python python manage.py loaddata partners.json
docker-compose run python python manage.py loaddata custom_user.json
docker-compose run python python manage.py loaddata skills.json
docker-compose run python python manage.py loaddata projects.json
