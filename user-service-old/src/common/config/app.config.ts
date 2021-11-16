export class AppConfig {
  readonly DATABASE_URL: string = process.env.DATABASE_URL;

  readonly SECRET: string = process.env.SECRET || 'secret';
}
