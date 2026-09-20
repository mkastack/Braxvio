/**
 * Redis connection configuration for BullMQ and general cache.
 * Note: BullMQ requires `maxRetriesPerRequest: null`.
 */
function getRedisConnectionOptions() {
  const redisUrl = process.env.REDIS_URL;

  let host = process.env.REDIS_HOST || '127.0.0.1';
  let port = parseInt(process.env.REDIS_PORT || '6379', 10);
  let username = process.env.REDIS_USERNAME || undefined;
  let password = process.env.REDIS_PASSWORD || undefined;
  let useTls = process.env.REDIS_TLS === 'true';

  if (redisUrl) {
    try {
      const parsed = new URL(redisUrl);
      host = parsed.hostname;
      port = parseInt(parsed.port || '6379', 10);
      username = parsed.username || undefined;
      password = parsed.password || undefined;
      if (parsed.protocol === 'rediss:' || parsed.hostname.includes('upstash.io')) {
        useTls = true;
      }
    } catch (err) {
      console.warn(`[Redis Warning] Failed to parse REDIS_URL (${redisUrl}): ${err.message}. Falling back to default params.`);
    }
  }

  const options = {
    host,
    port,
    username,
    password,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    retryStrategy(times) {
      const delay = Math.min(times * 100, 3000);
      return delay;
    },
  };

  if (useTls) {
    options.tls = {
      rejectUnauthorized: false,
    };
  }

  return options;
}

module.exports = {
  getRedisConnectionOptions,
};
