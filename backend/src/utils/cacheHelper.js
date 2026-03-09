const { redisClient } = require('../config/redisClient');

const DEFAULT_TTL = 60 * 5;

const getCache = async (key) => {
    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Lỗi khi lấy cache:", error);
        return null;
    }
};

const setCache = async (key, data, ttl = DEFAULT_TTL) => {
    try {
        await redisClient.setEx(key, ttl, JSON.stringify(data));
    } catch (error) {
        console.error("Lỗi khi set cache:", error);
    }
};

const deleteCacheByPattern = async (pattern) => {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
        await redisClient.del(keys);
        console.log(` Đã xóa ${keys.length} cache key: ${pattern}`);
    }
};

module.exports = { getCache, setCache, deleteCacheByPattern };