import { BaseEntity } from './base-entity';
import { Room } from './room';
import { User } from './user';

type CallStatus = 'missed' | 'rejected' | 'outgoing';

export type Call = {
  caller: User;
  room: Room;
  status: CallStatus;
} & BaseEntity;