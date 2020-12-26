/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import KanbanDetailComponent from '@/entities/kanban/kanban-details.vue';
import KanbanClass from '@/entities/kanban/kanban-details.component';
import KanbanService from '@/entities/kanban/kanban.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Kanban Management Detail Component', () => {
    let wrapper: Wrapper<KanbanClass>;
    let comp: KanbanClass;
    let kanbanServiceStub: SinonStubbedInstance<KanbanService>;

    beforeEach(() => {
      kanbanServiceStub = sinon.createStubInstance<KanbanService>(KanbanService);

      wrapper = shallowMount<KanbanClass>(KanbanDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { kanbanService: () => kanbanServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundKanban = { id: 123 };
        kanbanServiceStub.find.resolves(foundKanban);

        // WHEN
        comp.retrieveKanban(123);
        await comp.$nextTick();

        // THEN
        expect(comp.kanban).toBe(foundKanban);
      });
    });
  });
});
