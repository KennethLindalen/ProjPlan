<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="project">
                <h2 class="jh-entity-heading"><span v-text="$t('projPlannerApp.project.detail.title')">Project</span> {{project.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('projPlannerApp.project.projectName')">Project Name</span>
                    </dt>
                    <dd>
                        <span>{{project.projectName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('projPlannerApp.project.kanban')">Kanban</span>
                    </dt>
                    <dd>
                        <div v-if="project.kanban">
                            <router-link :to="{name: 'KanbanView', params: {kanbanId: project.kanban.id}}">{{project.kanban.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('projPlannerApp.project.user')">User</span>
                    </dt>
                    <dd>
                        {{project.user ? project.user.login : ''}}
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="project.id" :to="{name: 'ProjectEdit', params: {projectId: project.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./project-details.component.ts">
</script>
