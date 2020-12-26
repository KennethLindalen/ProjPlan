<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('projPlannerApp.bug.home.title')" id="bug-heading">Bugs</span>
            <router-link :to="{name: 'BugCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-bug">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('projPlannerApp.bug.home.createLabel')">
                    Create a new Bug
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
        <div class="alert alert-warning" v-if="!isFetching && bugs && bugs.length === 0">
            <span v-text="$t('projPlannerApp.bug.home.notFound')">No bugs found</span>
        </div>
        <div class="table-responsive" v-if="bugs && bugs.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('projPlannerApp.bug.bugTitle')">Bug Title</span></th>
                    <th><span v-text="$t('projPlannerApp.bug.bugInfo')">Bug Info</span></th>
                    <th><span v-text="$t('projPlannerApp.bug.priority')">Priority</span></th>
                    <th><span v-text="$t('projPlannerApp.bug.project')">Project</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="bug in bugs"
                    :key="bug.id">
                    <td>
                        <router-link :to="{name: 'BugView', params: {bugId: bug.id}}">{{bug.id}}</router-link>
                    </td>
                    <td>{{bug.bugTitle}}</td>
                    <td>{{bug.bugInfo}}</td>
                    <td>{{bug.priority}}</td>
                    <td>
                        <div v-if="bug.project">
                            <router-link :to="{name: 'ProjectView', params: {projectId: bug.project.id}}">{{bug.project.projectName}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'BugView', params: {bugId: bug.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'BugEdit', params: {bugId: bug.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(bug)"
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
            <span slot="modal-title"><span id="projPlannerApp.bug.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-bug-heading" v-text="$t('projPlannerApp.bug.delete.question', {'id': removeId})">Are you sure you want to delete this Bug?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-bug" v-text="$t('entity.action.delete')" v-on:click="removeBug()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./bug.component.ts">
</script>
