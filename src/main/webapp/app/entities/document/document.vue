<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('projPlannerApp.document.home.title')" id="document-heading">Documents</span>
            <router-link :to="{name: 'DocumentCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-document">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('projPlannerApp.document.home.createLabel')">
                    Create a new Document
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
        <div class="alert alert-warning" v-if="!isFetching && documents && documents.length === 0">
            <span v-text="$t('projPlannerApp.document.home.notFound')">No documents found</span>
        </div>
        <div class="table-responsive" v-if="documents && documents.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('projPlannerApp.document.title')">Title</span></th>
                    <th><span v-text="$t('projPlannerApp.document.text')">Text</span></th>
                    <th><span v-text="$t('projPlannerApp.document.project')">Project</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="document in documents"
                    :key="document.id">
                    <td>
                        <router-link :to="{name: 'DocumentView', params: {documentId: document.id}}">{{document.id}}</router-link>
                    </td>
                    <td>{{document.title}}</td>
                    <td>{{document.text}}</td>
                    <td>
                        <div v-if="document.project">
                            <router-link :to="{name: 'ProjectView', params: {projectId: document.project.id}}">{{document.project.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'DocumentView', params: {documentId: document.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'DocumentEdit', params: {documentId: document.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(document)"
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
            <span slot="modal-title"><span id="projPlannerApp.document.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-document-heading" v-text="$t('projPlannerApp.document.delete.question', {'id': removeId})">Are you sure you want to delete this Document?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-document" v-text="$t('entity.action.delete')" v-on:click="removeDocument()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./document.component.ts">
</script>
