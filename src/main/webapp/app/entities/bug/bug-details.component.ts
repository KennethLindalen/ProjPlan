import { Component, Vue, Inject } from 'vue-property-decorator';

import { IBug } from '@/shared/model/bug.model';
import BugService from './bug.service';

@Component
export default class BugDetails extends Vue {
  @Inject('bugService') private bugService: () => BugService;
  public bug: IBug = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.bugId) {
        vm.retrieveBug(to.params.bugId);
      }
    });
  }

  public retrieveBug(bugId) {
    this.bugService()
      .find(bugId)
      .then(res => {
        this.bug = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
