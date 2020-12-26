<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="projPlannerApp.bug.home.createOrEditLabel" v-text="$t('projPlannerApp.bug.home.createOrEditLabel')">Create or edit a Bug</h2>
                <div>
                    <div class="form-group" v-if="bug.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="bug.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('projPlannerApp.bug.bugTitle')" for="bug-bugTitle">Bug Title</label>
                        <input type="text" class="form-control" name="bugTitle" id="bug-bugTitle"
                            :class="{'valid': !$v.bug.bugTitle.$invalid, 'invalid': $v.bug.bugTitle.$invalid }" v-model="$v.bug.bugTitle.$model"  required/>
                        <div v-if="$v.bug.bugTitle.$anyDirty && $v.bug.bugTitle.$invalid">
                            <small class="form-text text-danger" v-if="!$v.bug.bugTitle.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('projPlannerApp.bug.bugInfo')" for="bug-bugInfo">Bug Info</label>
                        <input type="text" class="form-control" name="bugInfo" id="bug-bugInfo"
                            :class="{'valid': !$v.bug.bugInfo.$invalid, 'invalid': $v.bug.bugInfo.$invalid }" v-model="$v.bug.bugInfo.$model"  required/>
                        <div v-if="$v.bug.bugInfo.$anyDirty && $v.bug.bugInfo.$invalid">
                            <small class="form-text text-danger" v-if="!$v.bug.bugInfo.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('projPlannerApp.bug.priority')" for="bug-priority">Priority</label>
                        <input type="text" class="form-control" name="priority" id="bug-priority"
                            :class="{'valid': !$v.bug.priority.$invalid, 'invalid': $v.bug.priority.$invalid }" v-model="$v.bug.priority.$model"  required/>
                        <div v-if="$v.bug.priority.$anyDirty && $v.bug.priority.$invalid">
                            <small class="form-text text-danger" v-if="!$v.bug.priority.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('projPlannerApp.bug.project')" for="bug-project">Project</label>
                        <select class="form-control" id="bug-project" name="project" v-model="bug.project">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="bug.project && projectOption.id === bug.project.id ? bug.project : projectOption" v-for="projectOption in projects" :key="projectOption.id">{{projectOption.projectName}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.bug.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./bug-update.component.ts">
</script>
