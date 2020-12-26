<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="projPlannerApp.document.home.createOrEditLabel" v-text="$t('projPlannerApp.document.home.createOrEditLabel')">Create or edit a Document</h2>
                <div>
                    <div class="form-group" v-if="document.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="document.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('projPlannerApp.document.title')" for="document-title">Title</label>
                        <input type="text" class="form-control" name="title" id="document-title"
                            :class="{'valid': !$v.document.title.$invalid, 'invalid': $v.document.title.$invalid }" v-model="$v.document.title.$model"  required/>
                        <div v-if="$v.document.title.$anyDirty && $v.document.title.$invalid">
                            <small class="form-text text-danger" v-if="!$v.document.title.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('projPlannerApp.document.text')" for="document-text">Text</label>
                        <input type="text" class="form-control" name="text" id="document-text"
                            :class="{'valid': !$v.document.text.$invalid, 'invalid': $v.document.text.$invalid }" v-model="$v.document.text.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('projPlannerApp.document.project')" for="document-project">Project</label>
                        <select class="form-control" id="document-project" name="project" v-model="document.project">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="document.project && projectOption.id === document.project.id ? document.project : projectOption" v-for="projectOption in projects" :key="projectOption.id">{{projectOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.document.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./document-update.component.ts">
</script>
