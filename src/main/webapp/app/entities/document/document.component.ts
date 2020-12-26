import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IDocument } from '@/shared/model/document.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import DocumentService from './document.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Document extends mixins(AlertMixin) {
  @Inject('documentService') private documentService: () => DocumentService;
  private removeId: number = null;

  public documents: IDocument[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllDocuments();
  }

  public clear(): void {
    this.retrieveAllDocuments();
  }

  public retrieveAllDocuments(): void {
    this.isFetching = true;

    this.documentService()
      .retrieve()
      .then(
        res => {
          this.documents = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IDocument): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeDocument(): void {
    this.documentService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('projPlannerApp.document.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllDocuments();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
