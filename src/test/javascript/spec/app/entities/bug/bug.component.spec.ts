/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import BugComponent from '@/entities/bug/bug.vue';
import BugClass from '@/entities/bug/bug.component';
import BugService from '@/entities/bug/bug.service';

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
  describe('Bug Management Component', () => {
    let wrapper: Wrapper<BugClass>;
    let comp: BugClass;
    let bugServiceStub: SinonStubbedInstance<BugService>;

    beforeEach(() => {
      bugServiceStub = sinon.createStubInstance<BugService>(BugService);
      bugServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<BugClass>(BugComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          bugService: () => bugServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      bugServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllBugs();
      await comp.$nextTick();

      // THEN
      expect(bugServiceStub.retrieve.called).toBeTruthy();
      expect(comp.bugs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      bugServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeBug();
      await comp.$nextTick();

      // THEN
      expect(bugServiceStub.delete.called).toBeTruthy();
      expect(bugServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
