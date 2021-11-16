import { Static, Type } from '@sinclair/typebox';

export const User = Type.Object({
  id: Type.String(),
  name: Type.Optional(Type.String()),
  email: Type.Optional(Type.String({ format: 'email' })),
  balance: Type.Optional(Type.Number({ default: 0 })),
});

export type UserType = Static<typeof User>;
