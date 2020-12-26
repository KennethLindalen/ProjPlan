/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import KanbanUpdateComponent from '@/entities/kanban/kanban-update.vue';
import KanbanClass from '@/entities/kanban/kanban-update.component';
import KanbanService from '@/entities/kanban/kanban.service';

import ProjectService from '@/entities/project/project.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Kanban Management Update Component', () => {
    let wrapper: Wrapper<KanbanClass>;
    let comp: KanbanClass;
    let kanbanServiceStub: SinonStubbedInstance<KanbanService>;

    beforeEach(() => {
      kanbanServiceStub = sinon.createStubInstance<KanbanService>(KanbanService);

      wrapper = shallowMount<KanbanClass>(KanbanUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          kanbanService: () => kanbanServiceStub,

          projectService: () => new ProjectService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.kanban = entity;
        kanbanServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(kanbanServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.kanban = entity;
        kanbanServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(kanbanServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
