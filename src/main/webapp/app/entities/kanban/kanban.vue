<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('projPlannerApp.kanban.home.title')" id="kanban-heading">Kanbans</span>
            <router-link :to="{name: 'KanbanCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-kanban">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('projPlannerApp.kanban.home.createLabel')">
                    Create a new Kanban
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
        <div class="alert alert-warning" v-if="!isFetching && kanbans && kanbans.length === 0">
            <span v-text="$t('projPlannerApp.kanban.home.notFound')">No kanbans found</span>
        </div>
        <div class="table-responsive" v-if="kanbans && kanbans.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('projPlannerApp.kanban.data')">Data</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="kanban in kanbans"
                    :key="kanban.id">
                    <td>
                        <router-link :to="{name: 'KanbanView', params: {kanbanId: kanban.id}}">{{kanban.id}}</router-link>
                    </td>
                    <td>{{kanban.data}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'KanbanView', params: {kanbanId: kanban.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'KanbanEdit', params: {kanbanId: kanban.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(kanban)"
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
            <span slot="modal-title"><span id="projPlannerApp.kanban.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-kanban-heading" v-text="$t('projPlannerApp.kanban.delete.question', {'id': removeId})">Are you sure you want to delete this Kanban?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-kanban" v-text="$t('entity.action.delete')" v-on:click="removeKanban()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./kanban.component.ts">
</script>
