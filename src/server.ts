import express from 'express';
import { serverConfig } from './config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import { appErrorHandler } from './middlewares/error.middleware';
import router from './routers/v1';

//Job queues imports
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { logger } from './config/logger.config';
import { mailerQueue } from './queues/mailer.queue';
import { setupMailerWorker } from './processors/mailer.processor';
import { limiter } from './config/limiter.config';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const { } = createBullBoard({
    queues: [new BullMQAdapter(mailerQueue)],
    serverAdapter
});



const app = express();

app.use(limiter);
app.use(express.json());
app.use("/admin/queues", serverAdapter.getRouter());


const PORT: number = serverConfig.PORT;

app.use(attachCorrelationIdMiddleware);
app.use('/api/v1/notification', router);
app.use(appErrorHandler);

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    logger.info('Project is running perfectly!');
    setupMailerWorker();
    console.log(`For the UI, open http://localhost:${PORT}/admin/queues`);
    console.log("Make sure Redis is running on port 6379 with authentication.");
});