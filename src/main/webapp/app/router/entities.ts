import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Project = () => import('@/entities/project/project.vue');
// prettier-ignore
const ProjectUpdate = () => import('@/entities/project/project-update.vue');
// prettier-ignore
const ProjectDetails = () => import('@/entities/project/project-details.vue');
// prettier-ignore
const Kanban = () => import('@/entities/kanban/kanban.vue');
// prettier-ignore
const KanbanUpdate = () => import('@/entities/kanban/kanban-update.vue');
// prettier-ignore
const KanbanDetails = () => import('@/entities/kanban/kanban-details.vue');
// prettier-ignore
const Document = () => import('@/entities/document/document.vue');
// prettier-ignore
const DocumentUpdate = () => import('@/entities/document/document-update.vue');
// prettier-ignore
const DocumentDetails = () => import('@/entities/document/document-details.vue');
// prettier-ignore
const Bug = () => import('@/entities/bug/bug.vue');
// prettier-ignore
const BugUpdate = () => import('@/entities/bug/bug-update.vue');
// prettier-ignore
const BugDetails = () => import('@/entities/bug/bug-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/project',
    name: 'Project',
    component: Project,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/project/new',
    name: 'ProjectCreate',
    component: ProjectUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/project/:projectId/edit',
    name: 'ProjectEdit',
    component: ProjectUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/project/:projectId/view',
    name: 'ProjectView',
    component: ProjectDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/kanban',
    name: 'Kanban',
    component: Kanban,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/kanban/new',
    name: 'KanbanCreate',
    component: KanbanUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/kanban/:kanbanId/edit',
    name: 'KanbanEdit',
    component: KanbanUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/kanban/:kanbanId/view',
    name: 'KanbanView',
    component: KanbanDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/document',
    name: 'Document',
    component: Document,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/document/new',
    name: 'DocumentCreate',
    component: DocumentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/document/:documentId/edit',
    name: 'DocumentEdit',
    component: DocumentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/document/:documentId/view',
    name: 'DocumentView',
    component: DocumentDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bug',
    name: 'Bug',
    component: Bug,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bug/new',
    name: 'BugCreate',
    component: BugUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bug/:bugId/edit',
    name: 'BugEdit',
    component: BugUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bug/:bugId/view',
    name: 'BugView',
    component: BugDetails,
    meta: { authorities: [Authority.USER] },
  },

  {
    path: '/project',
    name: 'Project',
    component: Project,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/project/new',
    name: 'ProjectCreate',
    component: ProjectUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/project/:projectId/edit',
    name: 'ProjectEdit',
    component: ProjectUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/project/:projectId/view',
    name: 'ProjectView',
    component: ProjectDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/kanban',
    name: 'Kanban',
    component: Kanban,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/kanban/new',
    name: 'KanbanCreate',
    component: KanbanUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/kanban/:kanbanId/edit',
    name: 'KanbanEdit',
    component: KanbanUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/kanban/:kanbanId/view',
    name: 'KanbanView',
    component: KanbanDetails,
    meta: { authorities: [Authority.USER] },
  },

  {
    path: '/project',
    name: 'Project',
    component: Project,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/project/new',
    name: 'ProjectCreate',
    component: ProjectUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/project/:projectId/edit',
    name: 'ProjectEdit',
    component: ProjectUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/project/:projectId/view',
    name: 'ProjectView',
    component: ProjectDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/kanban',
    name: 'Kanban',
    component: Kanban,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/kanban/new',
    name: 'KanbanCreate',
    component: KanbanUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/kanban/:kanbanId/edit',
    name: 'KanbanEdit',
    component: KanbanUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/kanban/:kanbanId/view',
    name: 'KanbanView',
    component: KanbanDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/document',
    name: 'Document',
    component: Document,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/document/new',
    name: 'DocumentCreate',
    component: DocumentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/document/:documentId/edit',
    name: 'DocumentEdit',
    component: DocumentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/document/:documentId/view',
    name: 'DocumentView',
    component: DocumentDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bug',
    name: 'Bug',
    component: Bug,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bug/new',
    name: 'BugCreate',
    component: BugUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bug/:bugId/edit',
    name: 'BugEdit',
    component: BugUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bug/:bugId/view',
    name: 'BugView',
    component: BugDetails,
    meta: { authorities: [Authority.USER] },
  },

  {
    path: '/project',
    name: 'Project',
    component: Project,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/project/new',
    name: 'ProjectCreate',
    component: ProjectUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/project/:projectId/edit',
    name: 'ProjectEdit',
    component: ProjectUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/project/:projectId/view',
    name: 'ProjectView',
    component: ProjectDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/kanban',
    name: 'Kanban',
    component: Kanban,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/kanban/new',
    name: 'KanbanCreate',
    component: KanbanUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/kanban/:kanbanId/edit',
    name: 'KanbanEdit',
    component: KanbanUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/kanban/:kanbanId/view',
    name: 'KanbanView',
    component: KanbanDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/document',
    name: 'Document',
    component: Document,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/document/new',
    name: 'DocumentCreate',
    component: DocumentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/document/:documentId/edit',
    name: 'DocumentEdit',
    component: DocumentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/document/:documentId/view',
    name: 'DocumentView',
    component: DocumentDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bug',
    name: 'Bug',
    component: Bug,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bug/new',
    name: 'BugCreate',
    component: BugUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bug/:bugId/edit',
    name: 'BugEdit',
    component: BugUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bug/:bugId/view',
    name: 'BugView',
    component: BugDetails,
    meta: { authorities: [Authority.USER] },
  },

  {
    path: '/project',
    name: 'Project',
    component: Project,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/project/new',
    name: 'ProjectCreate',
    component: ProjectUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/project/:projectId/edit',
    name: 'ProjectEdit',
    component: ProjectUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/project/:projectId/view',
    name: 'ProjectView',
    component: ProjectDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bug',
    name: 'Bug',
    component: Bug,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bug/new',
    name: 'BugCreate',
    component: BugUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bug/:bugId/edit',
    name: 'BugEdit',
    component: BugUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bug/:bugId/view',
    name: 'BugView',
    component: BugDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
