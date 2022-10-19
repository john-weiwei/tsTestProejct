const redis = require("redis")
const host = "127.0.0.1"; // redis服务地址
const port = '6379' // redis服务端口

export class Redis {
  redisClient: any;
  constructor() {
    this.redisClient = redis.createClient({
      url: `redis://${host}:${port}`,
      legacyMode: true
    });

    // 配置redis的监听事件
    this.redisClient.on('ready', () => {
      console.log('Redis Client: ready')
    })

    // 连接到redis-server回调事件
    this.redisClient.on('connect', () => {
      console.log(new Date(), 'redis is now connected!');
    });

    // 判断redis是否连接
    if (this.redisClient.isOpen) {
      console.log('rredis is now connected!')
    } else {
      this.redisClient.connect().catch((error: any) => console.log(error));
    }
  }

  async createConnect() {
    await this.redisClient.connect().catch((error: any) => console.log(error));
  }

  quit() {
    this.redisClient.quit();
  }

  async exists(key: any) {
    return new Promise((resolve, reject) => {
      this.redisClient.exists(key, (err: any, result: any) => {
        if (err) {
          console.log(err);
          reject(false);
        }
        resolve(result);
      })
    })
  }

  async set(key: any, value: any, exprires?: number) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    return new Promise((resolve, reject) => {
      this.redisClient.set(key, value, (err: any, result: any) => {
        if (err) {
          reject(false);
        }
        if (exprires != undefined && !isNaN(exprires)) {
          this.redisClient.expire(key, exprires);
        }
        resolve(result);
      })
    })
  }

  async get(key: any) {
    return new Promise((resolve, reject) => {
      this.redisClient.get(key, (err: any, result: any) => {
        if (err) {
          reject(false);
        }
        resolve(result);
      })
    })
  }

  async remove(key: any) {
    return new Promise((resolve, reject) => {
      this.redisClient.del(key, (err: any, result: any) => {
        if (err) {
          reject(false);
        }
        resolve(result);
      })
    });
  }

  // push 将给定值推入列表的右端 返回值 当前列表长度
  async rPush(key: any, list: any, exprires: number) {
    return new Promise((resolve, reject) => {
      this.redisClient.rPush(key, list, (err: any, length: any) => {
        if (err) {
          reject(false);
        }
        if (!isNaN(exprires)) {
          this.redisClient.exports(key, exprires);
        }
        resolve(length);
      })
    })
  }

  // 查询list的值
  async lrange(key: any, startIndex = 0, stopIndex = -1) {
    return new Promise((resolve, reject) => {
      this.redisClient.lRange(key, startIndex, stopIndex, (err: any, result: any) => {
        if (err) {
          reject(false);
        }
        resolve(result)
      })
    })
  }

  // 清除list中n个值为value的项
  async lrem(key: any, n = 1, value: any) {
    return new Promise((resolve, reject) => {
      this.redisClient.lrem(key, n, value, (err: any, result: any) => {
        if (err) {
          return false
        }
        resolve(result);
      })
    });
  }
}



