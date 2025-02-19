FROM quay.io/naveeddogar/kingmd
RUN git clone https://github.com/Qadeer-bhai/TOFAN-MD /root/Qadeer-bhai
WORKDIR /root/Qadeer-bhai/
RUN npm install npm@latest
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]
