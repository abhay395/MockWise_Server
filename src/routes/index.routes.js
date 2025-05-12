import express from 'express';
import authRoutes from './auth.routes.js';
import openAiRoutes from './openAi.routes.js';
// import userRoutes from './user.routes.js';

const router = express.Router();

const routes = [
  { path: '/auth', route: authRoutes },
  { path: '/openAi', route: openAiRoutes },
  //   { path: '/users', route: userRoutes }
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
