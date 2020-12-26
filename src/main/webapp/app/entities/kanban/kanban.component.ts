import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IKanban } from '@/shared/model/kanban.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import KanbanService from './kanban.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Kanban extends mixins(AlertMixin) {
  @Inject('kanbanService') private kanbanService: () => KanbanService;
  private removeId: number = null;

  public kanbans: IKanban[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllKanbans();
  }

  public clear(): void {
    this.retrieveAllKanbans();
  }

  public retrieveAllKanbans(): void {
    this.isFetching = true;

    this.kanbanService()
      .retrieve()
      .then(
        res => {
          this.kanbans = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IKanban): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeKanban(): void {
    this.kanbanService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('projPlannerApp.kanban.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllKanbans();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
