import {sveltekit} from '@sveltejs/kit/vite';
import type {UserConfig} from 'vite';

import * as dotenv from 'dotenv';

dotenv.config({path: `.env.local`});

const env: any = process.env;
const aoss_server = env.AOSS_SERVICE_URL;


const getAossServer = () => {
    let proxyServer: any = {
        target: aoss_server,
        changeOrigin: true,
        rewrite: (path: any): string => {
            console.log("请求路径", `${path}`);
            return `${path}`
        }
    }
    proxyServer.headers = {
        "user": "%7B%22accountCode%22%3A%22admin%40aoss%22%2C%22name%22%3A%22%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86%E5%91%98%22%2C%22tenant%22%3A%7B%22code%22%3A%2200000000%22%2C%22name%22%3A%22SAAS%E5%B9%B3%E5%8F%B0%E5%BC%80%E5%8F%91%E5%95%86%22%7D%7D"
    }
    console.log('跳转地址：', proxyServer)
    return proxyServer;
}

const config: UserConfig = {
    plugins: [
        sveltekit()
    ],
    server: {
        port: 3000,       // 可以根据需要修改端口号,
        proxy: {
            '/webservice': getAossServer()
        }
    }
};

export default config;
