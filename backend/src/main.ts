import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import {
    ExpressAdapter,
    NestExpressApplication,
} from '@nestjs/platform-express';
import * as compression from 'compression';
import * as Express from 'express';
import * as RateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';
import { setupSwagger } from './swagger';

/*
 * Google Cloud additional endpoints
 */
const server = Express();
server.get('/', (req, res) => res.send('ok'));
server.get('/_ah/health', (req, res) => res.send('ok'));

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(server),
        { cors: true },
    );

    app.use(helmet()); // protect http headers
    app.use(
        new RateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        }),
    );
    app.use(compression()); // for less size of response
    app.use(morgan('combined')); // http requests logger

    // getting access to config service
    const configService = app.select(SharedModule).get(ConfigService);
    const port = configService.getNumber('PORT');

    // setup swagger
    if (['development', 'staging'].includes(configService.nodeEnv)) {
        setupSwagger(app);
    }

    app.setGlobalPrefix('api');
    await app.listen(port);

    console.info(`server running on port ${port}`);
}
bootstrap();
