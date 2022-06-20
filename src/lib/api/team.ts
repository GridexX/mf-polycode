import { User } from './user';

export interface Team {
  id: string;
  name: string;
  description: string;
  captain: string;
  polypoints: number;
  members?: User[];
}
