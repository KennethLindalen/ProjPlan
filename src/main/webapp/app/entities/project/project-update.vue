<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="projPlannerApp.project.home.createOrEditLabel" v-text="$t('projPlannerApp.project.home.createOrEditLabel')">Create or edit a Project</h2>
                <div>
                    <div class="form-group" v-if="project.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="project.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('projPlannerApp.project.projectName')" for="project-projectName">Project Name</label>
                        <input type="text" class="form-control" name="projectName" id="project-projectName"
                            :class="{'valid': !$v.project.projectName.$invalid, 'invalid': $v.project.projectName.$invalid }" v-model="$v.project.projectName.$model"  required/>
                        <div v-if="$v.project.projectName.$anyDirty && $v.project.projectName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.project.projectName.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.project.projectName.minLength" v-text="$t('entity.validation.minlength', {min: 3})">
                                This field is required to be at least 3 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('projPlannerApp.project.user')" for="project-user">User</label>
                        <select class="form-control" id="project-user" name="user" v-model="project.user">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="project.user && userOption.id === project.user.id ? project.user : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.login}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.project.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./project-update.component.ts">
</script>
