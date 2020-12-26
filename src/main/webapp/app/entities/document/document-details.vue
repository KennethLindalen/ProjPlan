<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="document">
                <h2 class="jh-entity-heading"><span v-text="$t('projPlannerApp.document.detail.title')">Document</span> {{document.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('projPlannerApp.document.title')">Title</span>
                    </dt>
                    <dd>
                        <span>{{document.title}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('projPlannerApp.document.text')">Text</span>
                    </dt>
                    <dd>
                        <span>{{document.text}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('projPlannerApp.document.project')">Project</span>
                    </dt>
                    <dd>
                        <div v-if="document.project">
                            <router-link :to="{name: 'ProjectView', params: {projectId: document.project.id}}">{{document.project.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="document.id" :to="{name: 'DocumentEdit', params: {documentId: document.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./document-details.component.ts">
</script>
