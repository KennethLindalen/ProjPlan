/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ProjectComponent from '@/entities/project/project.vue';
import ProjectClass from '@/entities/project/project.component';
import ProjectService from '@/entities/project/project.service';

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
  describe('Project Management Component', () => {
    let wrapper: Wrapper<ProjectClass>;
    let comp: ProjectClass;
    let projectServiceStub: SinonStubbedInstance<ProjectService>;

    beforeEach(() => {
      projectServiceStub = sinon.createStubInstance<ProjectService>(ProjectService);
      projectServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ProjectClass>(ProjectComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          projectService: () => projectServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      projectServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllProjects();
      await comp.$nextTick();

      // THEN
      expect(projectServiceStub.retrieve.called).toBeTruthy();
      expect(comp.projects[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      projectServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeProject();
      await comp.$nextTick();

      // THEN
      expect(projectServiceStub.delete.called).toBeTruthy();
      expect(projectServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
