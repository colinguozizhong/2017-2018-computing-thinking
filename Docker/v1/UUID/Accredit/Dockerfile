FROM java:8
VOLUME /tmp
WORKDIR /accredit
ADD build/libs/Accredit-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8095
RUN bash -c "touch /app.jar"
ENTRYPOINT ["java","-Dspring.data.mongodb.uri=mongodb://mongodb/toyhouse", "-Djava.security.egd=file:/dev/./urandom","-Dmqtt.brokerUrl=tcp://activemq:1883","-Dchain.baseUrl=http://v1_vp0_1:7050","-jar","/app.jar"]