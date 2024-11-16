const Kafka = require('node-rdkafka');
const path = require("path");
const { setCustomerDataInDatabase } = require('../controllers/customer.controller');
const { setOrderDataInDatabase } = require('../controllers/order.controller');
const { updateDeliveryReport } = require('../controllers/campaign.controller');

const consumer = new Kafka.KafkaConsumer({
    'metadata.broker.list': 'kafka-2bb606d5-bhalotiaraunak1234-c136.g.aivencloud.com:21708',
    'group.id': 'test-group',
    'security.protocol': 'ssl',
    "ssl.key.location": path.join(__dirname, "../", "service.key"),
    "ssl.certificate.location": path.join(__dirname, "../", "service.cert"),
    "ssl.ca.location": path.join(__dirname, "../", "ca.pem"),
    'auto.offset.reset': 'earliest',
}, {});

consumer.connect();

consumer.on('ready', () => {
    console.log('Test Consumer ready');
    consumer.subscribe(['add-user', 'add-order', 'create-report']);
    consumer.consume();
});

consumer.on('data', async (data) => {
    if(data.topic == 'add-order')
        await setOrderDataInDatabase(data.value.toString());
    else if(data.topic === 'add-user')
        await setCustomerDataInDatabase(data.value.toString());
    else if(data.topic == 'create-report')
        await updateDeliveryReport(data.value.toString());
    else
        console.log("INVALID TOPIC ", data.topic);
});

consumer.on('event.error', (err) => {
    console.error('Error:', err);
});

consumer.on('disconnected', (arg) => {
    console.log('Consumer disconnected. ', arg);
});

consumer.on('event.log', (log) => {
    console.log('Log:', log);
});

consumer.on('event.stats', (stats) => {
    console.log('Stats:', stats);
});
