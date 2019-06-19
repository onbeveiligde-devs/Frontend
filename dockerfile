FROM archlinux/base
RUN pacman -Sy --noconfirm reflector
RUN reflector --verbose --latest 25 --sort rate --save /etc/pacman.d/mirrorlist
RUN pacman -Syu --noconfirm nginx nodejs node-gyp npm git openssh python base-devel
RUN ln -s /usr/bin/node /usr/bin/nodejs
RUN mkdir /root/build
WORKDIR /root/build
RUN npm install --global @angular/cli
COPY ./install.data/nginx.conf /etc/nginx/nginx.conf
COPY ./install.data/keys/cm_rsa /root/.ssh/id_rsa
RUN chmod 700 /root/.ssh/id_rsa
RUN eval $(ssh-agent -s) && ssh-add /root/.ssh/id_rsa && ssh-keyscan vs-ssh.visualstudio.com >> ~/.ssh/known_hosts && git clone AvansIVT@vs-ssh.visualstudio.com:v3/AvansIVT/A1/CheckCreator
WORKDIR /root/build/CheckCreator
RUN npm set registry https://registry.npmjs.org/
RUN npm install
RUN ng build
RUN cp -r -v /root/build/CheckCreator/dist/CheckCreator/* /srv/http
RUN pacman -Runcd --noconfirm nodejs node-gyp npm git openssh python
RUN rm -fr /root/build
WORKDIR /srv/http
EXPOSE 80/tcp
EXPOSE 80/udp
STOPSIGNAL SIGTERM
CMD nginx -g 'daemon off;'
