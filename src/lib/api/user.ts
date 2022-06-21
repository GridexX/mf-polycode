import { Email } from './email';

export interface User {
  id: string;
  username: string;
  rank: number;
  points: number;
  emails: Email[];
}
