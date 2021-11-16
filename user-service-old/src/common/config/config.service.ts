export default class ConfigService {
  DATABASE_URL: string = process.env.DATABASE_URL;

  SECRET: string = process.env.SECRET || 'secret';

  private readonly envConfig: { [key: string]: string };

  get(key: string): string {
    return this.envConfig[key];
  }
}
