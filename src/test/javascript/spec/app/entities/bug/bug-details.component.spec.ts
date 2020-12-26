/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import BugDetailComponent from '@/entities/bug/bug-details.vue';
import BugClass from '@/entities/bug/bug-details.component';
import BugService from '@/entities/bug/bug.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Bug Management Detail Component', () => {
    let wrapper: Wrapper<BugClass>;
    let comp: BugClass;
    let bugServiceStub: SinonStubbedInstance<BugService>;

    beforeEach(() => {
      bugServiceStub = sinon.createStubInstance<BugService>(BugService);

      wrapper = shallowMount<BugClass>(BugDetailComponent, { store, i18n, localVue, provide: { bugService: () => bugServiceStub } });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundBug = { id: 123 };
        bugServiceStub.find.resolves(foundBug);

        // WHEN
        comp.retrieveBug(123);
        await comp.$nextTick();

        // THEN
        expect(comp.bug).toBe(foundBug);
      });
    });
  });
});
