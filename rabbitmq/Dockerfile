# Use the official RabbitMQ image
FROM rabbitmq:latest

# Customize configurations if needed
# COPY rabbitmq.config /etc/rabbitmq/rabbitmq.config
RUN rabbitmq-plugins enable rabbitmq_management

# Expose the RabbitMQ ports
EXPOSE 5672 15672

# You can add any necessary initialization scripts
# COPY init.sh /init.sh
# RUN chmod +x /init.sh
# CMD ["/init.sh"]