import { IKanban } from '@/shared/model/kanban.model';
import { IUser } from '@/shared/model/user.model';

export interface IProject {
  id?: number;
  projectName?: string;
  kanban?: IKanban;
  user?: IUser;
}

export class Project implements IProject {
  constructor(public id?: number, public projectName?: string, public kanban?: IKanban, public user?: IUser) {}
}
