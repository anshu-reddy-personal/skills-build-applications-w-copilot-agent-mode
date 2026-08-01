import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database.js';
import apiRouter from './routes/index.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    baseUrl,
  });
});

app.get('/api/', (_req, res) => {
  res.json({
    message: 'Welcome to the OctoFit Tracker API',
    baseUrl,
    endpoints: {
      health: `${baseUrl}/api/health`,
      users: `${baseUrl}/api/users/`,
      teams: `${baseUrl}/api/teams/`,
      activities: `${baseUrl}/api/activities/`,
      leaderboard: `${baseUrl}/api/leaderboard/`,
      workouts: `${baseUrl}/api/workouts/`,
    },
  });
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`OctoFit Tracker API listening on port ${PORT}`);
  console.log(`Base URL: ${baseUrl}`);
});
