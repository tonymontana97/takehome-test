import * as dotenv from 'dotenv';

export class ConfigService {
    public get nodeEnv(): string {
        return this.get('NODE_ENV') || 'development';
    }

    constructor() {
        const nodeEnv = this.nodeEnv;
        dotenv.config({
            path: `./environments/.${nodeEnv}.env`,
        });

        console.info(`Run app in mode: ${nodeEnv}`);
    }

    public get(key: string): string {
        return process.env[key];
    }

    public getNumber(key: string): number {
        return Number(this.get(key));
    }
}
