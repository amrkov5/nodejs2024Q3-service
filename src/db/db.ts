import { Artist } from 'src/author/author.interface';
import { User } from 'src/user/user.interface';

export const userDb: Map<string, User> = new Map();

export const artistDb: Map<string, Artist> = new Map()
