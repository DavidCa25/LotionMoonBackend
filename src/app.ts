
import AppBuilder from './appBuilder';

const appBuilder = new AppBuilder();

appBuilder.withCors();
appBuilder.withJsonBodyParser();

const app = appBuilder.getApp();

export default app;
