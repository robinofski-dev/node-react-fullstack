import type { User } from '@node-react-fullstack/shared';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends import('@node-react-fullstack/shared').User {}
  }
}

export {};
