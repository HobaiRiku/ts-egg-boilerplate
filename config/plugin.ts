import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
    mongoose : {
        enable: true,
        package: 'egg-mongoose',
    },
    io : {
        enable: true,
        package: 'egg-socket.io',
    },
    cors : {
        enable: true,
        package: 'egg-cors',
    },
};
export default plugin;
