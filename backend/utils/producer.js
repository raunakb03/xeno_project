const Kafka = require('node-rdkafka');
const path = require('path');

const producer = new Kafka.Producer({
    'metadata.broker.list': "kafka-2bb606d5-bhalotiaraunak1234-c136.g.aivencloud.com:21708",
    "security.protocol": "ssl",
    "ssl.key.location": path.join(__dirname,"../", "service.key"),
    "ssl.certificate.location": path.join(__dirname,"../", "service.cert"),
    "ssl.ca.location": path.join(__dirname,"../", "ca.pem"),
    dr_cb: true,
});

producer.connect();
producer.on('ready', () => console.log('Kafka Producer is ready.'));
producer.on('event.error', (err) => console.error('Producer error:', err));

const sendToKafka = (topic, data) => {
    try {
        producer.produce(
            topic,
            null,
            Buffer.from(JSON.stringify(data)),
            null,
            Date.now()
        );
    } catch (err) {
        console.error('Failed to send message to Kafka:', err);
    }
};

module.exports = { sendToKafka };
