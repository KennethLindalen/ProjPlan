import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import ProjectService from '../project/project.service';
import { IProject } from '@/shared/model/project.model';

import AlertService from '@/shared/alert/alert.service';
import { IKanban, Kanban } from '@/shared/model/kanban.model';
import KanbanService from './kanban.service';

const validations: any = {
  kanban: {
    data: {},
  },
};

@Component({
  validations,
})
export default class KanbanUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('kanbanService') private kanbanService: () => KanbanService;
  public kanban: IKanban = new Kanban();

  @Inject('projectService') private projectService: () => ProjectService;

  public projects: IProject[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.kanbanId) {
        vm.retrieveKanban(to.params.kanbanId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.kanban.id) {
      this.kanbanService()
        .update(this.kanban)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('projPlannerApp.kanban.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.kanbanService()
        .create(this.kanban)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('projPlannerApp.kanban.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveKanban(kanbanId): void {
    this.kanbanService()
      .find(kanbanId)
      .then(res => {
        this.kanban = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.projectService()
      .retrieve()
      .then(res => {
        this.projects = res.data;
      });
  }
}
