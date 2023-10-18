# Use the official MySQL image
FROM mysql:latest

# Set root password and create a database
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=app1_db

# Expose the MySQL port
EXPOSE 3306

# You can add any necessary initialization scripts
# COPY init.sql /docker-entrypoint-initdb.d/

# You can also customize other MySQL configurations here
# COPY my.cnf /etc/mysql/my.cnf
