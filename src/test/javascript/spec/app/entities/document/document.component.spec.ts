/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import DocumentComponent from '@/entities/document/document.vue';
import DocumentClass from '@/entities/document/document.component';
import DocumentService from '@/entities/document/document.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Document Management Component', () => {
    let wrapper: Wrapper<DocumentClass>;
    let comp: DocumentClass;
    let documentServiceStub: SinonStubbedInstance<DocumentService>;

    beforeEach(() => {
      documentServiceStub = sinon.createStubInstance<DocumentService>(DocumentService);
      documentServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<DocumentClass>(DocumentComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          documentService: () => documentServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      documentServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllDocuments();
      await comp.$nextTick();

      // THEN
      expect(documentServiceStub.retrieve.called).toBeTruthy();
      expect(comp.documents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      documentServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeDocument();
      await comp.$nextTick();

      // THEN
      expect(documentServiceStub.delete.called).toBeTruthy();
      expect(documentServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
