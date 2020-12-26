<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="projPlannerApp.kanban.home.createOrEditLabel" v-text="$t('projPlannerApp.kanban.home.createOrEditLabel')">Create or edit a Kanban</h2>
                <div>
                    <div class="form-group" v-if="kanban.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="kanban.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('projPlannerApp.kanban.data')" for="kanban-data">Data</label>
                        <input type="text" class="form-control" name="data" id="kanban-data"
                            :class="{'valid': !$v.kanban.data.$invalid, 'invalid': $v.kanban.data.$invalid }" v-model="$v.kanban.data.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.kanban.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./kanban-update.component.ts">
</script>
