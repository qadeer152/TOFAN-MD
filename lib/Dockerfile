FROM quay.io/naveeddogar/kingmd
RUN git clone https://github.com/chhaseeb47/HASI-MD /root/chhaseeb47
WORKDIR /root/chhaseeb47/
RUN npm install npm@latest
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]
