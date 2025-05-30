import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errorMiddleware } from '@middlewares/error.middleware';
import authRoutes from '@routes/auth.routers';
import githubRoutes from '@routes/github.routers';

const app = express();
const PORT = process.env.PORT || 3333;
const VERSION = 'v1';

app.use(cors());

app.use(bodyParser.json());
app.use(`/${VERSION}/api`, authRoutes);
app.use(`/${VERSION}/api/github`, githubRoutes);

// handle error
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
