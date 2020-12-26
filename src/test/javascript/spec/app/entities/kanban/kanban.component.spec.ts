/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import KanbanComponent from '@/entities/kanban/kanban.vue';
import KanbanClass from '@/entities/kanban/kanban.component';
import KanbanService from '@/entities/kanban/kanban.service';

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
  describe('Kanban Management Component', () => {
    let wrapper: Wrapper<KanbanClass>;
    let comp: KanbanClass;
    let kanbanServiceStub: SinonStubbedInstance<KanbanService>;

    beforeEach(() => {
      kanbanServiceStub = sinon.createStubInstance<KanbanService>(KanbanService);
      kanbanServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<KanbanClass>(KanbanComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          kanbanService: () => kanbanServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      kanbanServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllKanbans();
      await comp.$nextTick();

      // THEN
      expect(kanbanServiceStub.retrieve.called).toBeTruthy();
      expect(comp.kanbans[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      kanbanServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeKanban();
      await comp.$nextTick();

      // THEN
      expect(kanbanServiceStub.delete.called).toBeTruthy();
      expect(kanbanServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
