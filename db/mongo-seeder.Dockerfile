FROM mongo

COPY seed-data/customers.json /seed-data/customers.json
COPY seed-data/usage.json /seed-data/usage.json

ADD seed-data.sh /seed-data.sh
RUN chmod +x /seed-data.sh

CMD ["/seed-data.sh"]
