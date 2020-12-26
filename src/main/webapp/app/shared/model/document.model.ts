import { IProject } from '@/shared/model/project.model';

export interface IDocument {
  id?: number;
  title?: string;
  text?: string;
  project?: IProject;
}

export class Document implements IDocument {
  constructor(public id?: number, public title?: string, public text?: string, public project?: IProject) {}
}
