import { User } from './user';

export interface Team {
  id: string;
  name: string;
  description: string;
  rank: number;
  points: number;
  members: User[];
  captain: User;
}
