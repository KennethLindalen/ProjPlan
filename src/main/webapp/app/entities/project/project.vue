<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('projPlannerApp.project.home.title')" id="project-heading">Projects</span>
            <router-link :to="{name: 'ProjectCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-project">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('projPlannerApp.project.home.createLabel')">
                    Create a new Project
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && projects && projects.length === 0">
            <span v-text="$t('projPlannerApp.project.home.notFound')">No projects found</span>
        </div>
        <div class="table-responsive" v-if="projects && projects.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('projPlannerApp.project.projectName')">Project Name</span></th>
                    <th><span v-text="$t('projPlannerApp.project.kanban')">Kanban</span></th>
                    <th><span v-text="$t('projPlannerApp.project.user')">User</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="project in projects"
                    :key="project.id">
                    <td>
                        <router-link :to="{name: 'ProjectView', params: {projectId: project.id}}">{{project.id}}</router-link>
                    </td>
                    <td>{{project.projectName}}</td>
                    <td>
                        <div v-if="project.kanban">
                            <router-link :to="{name: 'KanbanView', params: {kanbanId: project.kanban.id}}">{{project.kanban.id}}</router-link>
                        </div>
                    </td>
                    <td>
                        {{project.user ? project.user.login : ''}}
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ProjectView', params: {projectId: project.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ProjectEdit', params: {projectId: project.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(project)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="projPlannerApp.project.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-project-heading" v-text="$t('projPlannerApp.project.delete.question', {'id': removeId})">Are you sure you want to delete this Project?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-project" v-text="$t('entity.action.delete')" v-on:click="removeProject()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./project.component.ts">
</script>
