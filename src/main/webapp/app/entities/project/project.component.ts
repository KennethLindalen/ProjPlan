import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IProject } from '@/shared/model/project.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import ProjectService from './project.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Project extends mixins(AlertMixin) {
  @Inject('projectService') private projectService: () => ProjectService;
  private removeId: number = null;

  public projects: IProject[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllProjects();
  }

  public clear(): void {
    this.retrieveAllProjects();
  }

  public retrieveAllProjects(): void {
    this.isFetching = true;

    this.projectService()
      .retrieve()
      .then(
        res => {
          this.projects = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IProject): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeProject(): void {
    this.projectService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('projPlannerApp.project.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllProjects();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
