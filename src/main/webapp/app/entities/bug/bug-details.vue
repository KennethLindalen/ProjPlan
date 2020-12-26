<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="bug">
                <h2 class="jh-entity-heading"><span v-text="$t('projPlannerApp.bug.detail.title')">Bug</span> {{bug.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('projPlannerApp.bug.bugTitle')">Bug Title</span>
                    </dt>
                    <dd>
                        <span>{{bug.bugTitle}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('projPlannerApp.bug.bugInfo')">Bug Info</span>
                    </dt>
                    <dd>
                        <span>{{bug.bugInfo}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('projPlannerApp.bug.priority')">Priority</span>
                    </dt>
                    <dd>
                        <span>{{bug.priority}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('projPlannerApp.bug.project')">Project</span>
                    </dt>
                    <dd>
                        <div v-if="bug.project">
                            <router-link :to="{name: 'ProjectView', params: {projectId: bug.project.id}}">{{bug.project.projectName}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="bug.id" :to="{name: 'BugEdit', params: {bugId: bug.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./bug-details.component.ts">
</script>
