const { createClient } = require('redis');
require("dotenv").config()

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});
const connectRedis=async()=>{
    try {
        await redisClient.connect();
        console.log("Connected to Redis");
    }   catch (error) {
        console.error("Could not connect to Redis", error);
    }
}
module.exports={redisClient,connectRedis}
