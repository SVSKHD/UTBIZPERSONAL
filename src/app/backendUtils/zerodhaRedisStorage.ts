import Redis from "ioredis";

const redis = new Redis("redis://default:fyJ2dumlI9w7CIZrrLrpVzUQVoO2K9hZ@redis-15849.c10.us-east-1-2.ec2.redns.redis-cloud.com:15849");

export const zerodhaRedisStorage = {
    set: async (key: string, value: string) => {
        await redis.set(`ZERODHA_${key}`, value);
    },
    get: async (key: string) => {
        return await redis.get(`ZERODHA_${key}`);
    },
    delete: async (key: string) => {
        await redis.del(`ZERODHA_${key}`);
    }
};