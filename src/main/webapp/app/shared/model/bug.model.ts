import { IProject } from '@/shared/model/project.model';

export interface IBug {
  id?: number;
  bugTitle?: string;
  bugInfo?: string;
  priority?: string;
  project?: IProject;
}

export class Bug implements IBug {
  constructor(public id?: number, public bugTitle?: string, public bugInfo?: string, public priority?: string, public project?: IProject) {}
}
