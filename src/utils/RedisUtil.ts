import * as redis from 'redis';

const host = "127.0.0.1"; // redis服务地址
const port = '6379' // redis服务端口
// 连接 Redis
const client = redis.createClient({url: 'localhost:6379'});
// 创建连接，是个 promise
client.connect()
  .then(() => {
    client.set('name', 'zhangsan')
      .then((val: any) => {
        console.log(val)
      })
  })
// console.log(client.get('name'))

// const client = redis.createClient();

// client.on('error', (err) => console.log('Redis Client Error', err));

// await client.connect();

// await client.set('key', 'value');
// const value = await client.get('key');



