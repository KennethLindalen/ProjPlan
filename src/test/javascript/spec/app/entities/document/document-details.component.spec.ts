/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import DocumentDetailComponent from '@/entities/document/document-details.vue';
import DocumentClass from '@/entities/document/document-details.component';
import DocumentService from '@/entities/document/document.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Document Management Detail Component', () => {
    let wrapper: Wrapper<DocumentClass>;
    let comp: DocumentClass;
    let documentServiceStub: SinonStubbedInstance<DocumentService>;

    beforeEach(() => {
      documentServiceStub = sinon.createStubInstance<DocumentService>(DocumentService);

      wrapper = shallowMount<DocumentClass>(DocumentDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { documentService: () => documentServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundDocument = { id: 123 };
        documentServiceStub.find.resolves(foundDocument);

        // WHEN
        comp.retrieveDocument(123);
        await comp.$nextTick();

        // THEN
        expect(comp.document).toBe(foundDocument);
      });
    });
  });
});
