import { IProject } from '@/shared/model/project.model';

export interface IKanban {
  id?: number;
  data?: string;
  project?: IProject;
}

export class Kanban implements IKanban {
  constructor(public id?: number, public data?: string, public project?: IProject) {}
}
