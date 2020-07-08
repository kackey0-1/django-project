FROM python:3.7
RUN apt-get update
RUN apt-get -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
RUN apt-get install -y libgraphviz-dev graphviz pkg-config
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
ADD . /code/
CMD uwsgi --socket :8001 --module app.wsgi --logto /logs/uwsgi.log & daphne --access-log /logs/daphne.log -b 0.0.0.0 -p 3001 --ping-interval 10 --ping-timeout 120 app.asgi:application
