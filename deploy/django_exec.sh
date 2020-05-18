uwsgi --socket :8001 --module app.wsgi --py-autoreload 1 --logto /logs/uwsgi.log & daphne --access-log /logs/daphne.log -b 0.0.0.0 -p 3001 --ping-interval 10 --ping-timeout 120 app.asgi:application 
