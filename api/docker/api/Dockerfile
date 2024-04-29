FROM python:3.12-slim

WORKDIR /usr/src/app
ENV FLASK_APP=app FLASK_RUN_HOST=0.0.0.0 FLASK_DEBUG=1

COPY /app/requirements.txt ./

RUN pip install -r requirements.txt

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD ["flask", "run"]

