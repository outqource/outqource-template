import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import { createAdapter, RedisAdapter } from 'socket.io-redis';

import Prisma from 'database';
import config from 'config';

export interface Socket<OnData, EmitData> {
  on(event: string, callback: (data: OnData) => void): void;
  emit(event: string, data: EmitData): void;
}

export default (server: Server) => {
  const io = new SocketServer(server, {
    cors: {
      origin: '*',
      credentials: true,
    },
  });
  try {
    // io.adapter(
    //   createAdapter(config.REDIS, {
    //     requestsTimeout: 30000,
    //   })
    // );
    io.on('connection', async (socket) => {
      const userId = socket.handshake.query.userId as string;

      socket.on('disconnect', () => {});

      socket.on('error', () => {
        console.log('error!');
        socket.disconnect();
      });
    });
    return io;
  } catch (err) {
    return err;
  }
};
