import { Component, Vue, Inject } from 'vue-property-decorator';

import { IDocument } from '@/shared/model/document.model';
import DocumentService from './document.service';

@Component
export default class DocumentDetails extends Vue {
  @Inject('documentService') private documentService: () => DocumentService;
  public document: IDocument = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.documentId) {
        vm.retrieveDocument(to.params.documentId);
      }
    });
  }

  public retrieveDocument(documentId) {
    this.documentService()
      .find(documentId)
      .then(res => {
        this.document = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
