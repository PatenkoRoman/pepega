export default () => ({
  SERVER_PORT: parseInt(process.env.SERVER_PORT, 10) || 3000,
  SECRET: process.env.SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
});
