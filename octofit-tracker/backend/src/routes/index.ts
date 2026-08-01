import { Router } from 'express';
import usersRouter from './users.js';
import teamsRouter from './teams.js';
import activitiesRouter from './activities.js';
import leaderboardRouter from './leaderboard.js';
import workoutsRouter from './workouts.js';

const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/teams', teamsRouter);
apiRouter.use('/activities', activitiesRouter);
apiRouter.use('/leaderboard', leaderboardRouter);
apiRouter.use('/workouts', workoutsRouter);

export default apiRouter;
