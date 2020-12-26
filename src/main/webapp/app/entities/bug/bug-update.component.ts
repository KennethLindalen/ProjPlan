import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import ProjectService from '../project/project.service';
import { IProject } from '@/shared/model/project.model';

import AlertService from '@/shared/alert/alert.service';
import { IBug, Bug } from '@/shared/model/bug.model';
import BugService from './bug.service';

const validations: any = {
  bug: {
    bugTitle: {
      required,
    },
    bugInfo: {
      required,
    },
    priority: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class BugUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('bugService') private bugService: () => BugService;
  public bug: IBug = new Bug();

  @Inject('projectService') private projectService: () => ProjectService;

  public projects: IProject[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.bugId) {
        vm.retrieveBug(to.params.bugId);
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
    if (this.bug.id) {
      this.bugService()
        .update(this.bug)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('projPlannerApp.bug.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.bugService()
        .create(this.bug)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('projPlannerApp.bug.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveBug(bugId): void {
    this.bugService()
      .find(bugId)
      .then(res => {
        this.bug = res;
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
