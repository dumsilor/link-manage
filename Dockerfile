FROM  ubuntu:plucky

RUN apt update && apt upgrade -y

RUN apt install git -y

RUN mkdir library && cd library

WORKDIR ~/library/

RUN git init

RUN git remote add origin https://github.com/dumsilor/library.git

RUN git pull origin master

RUN apt install npm

RUN npm i

CMD ["ng","serve"]
