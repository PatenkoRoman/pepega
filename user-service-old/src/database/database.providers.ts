/* eslint-disable import/prefer-default-export */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-return-await */
import * as mongoose from 'mongoose';
import ConfigService from '../common/config/config.service';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> =>
      await mongoose.connect(configService.get('DATABASE_URL'), options),
    inject: [ConfigService],
  },
];
