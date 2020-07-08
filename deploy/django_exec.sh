uwsgi --socket :8001 --module app.wsgi --py-autoreload 1 --logto /logs/uwsgi.log &
