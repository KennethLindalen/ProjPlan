import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import ProjectService from '../project/project.service';
import { IProject } from '@/shared/model/project.model';

import AlertService from '@/shared/alert/alert.service';
import { IDocument, Document } from '@/shared/model/document.model';
import DocumentService from './document.service';

const validations: any = {
  document: {
    title: {
      required,
    },
    text: {},
  },
};

@Component({
  validations,
})
export default class DocumentUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('documentService') private documentService: () => DocumentService;
  public document: IDocument = new Document();

  @Inject('projectService') private projectService: () => ProjectService;

  public projects: IProject[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.documentId) {
        vm.retrieveDocument(to.params.documentId);
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
    if (this.document.id) {
      this.documentService()
        .update(this.document)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('projPlannerApp.document.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.documentService()
        .create(this.document)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('projPlannerApp.document.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveDocument(documentId): void {
    this.documentService()
      .find(documentId)
      .then(res => {
        this.document = res;
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
