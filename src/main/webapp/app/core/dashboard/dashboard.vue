<template>
    <div>
        <div class="projects">
            <div class="row">
                <div id="projectOverview" class="col-sm col-md">
                    <h3 class="width-100">Your projects <button type="button" class="btn btn-outline-secondary pt-1 pb-1 p-1 float-right mb-1" style="border-radius: 5px">New project</button></h3>
                    <ul class="list-group width-100">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            %% PROJECT NAME %%
                            <div class="row-cols-2">
                                <span class="badge bg-dark-gray rounded-pill col-sm col-md ">Comments: %% CCOUNT %%</span>
                                <span class="badge bg-dark-gray rounded-pill col-sm col-md ">Bugs: %% BUG COUNT %%</span>
                            </div>

                        </li>
                    </ul>
                </div>
                <div id="bugOverview" class="col-sm col-md mt-1">
                    <h3>Active bugs</h3>
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            %% BUG NAME %%
                            <span class="badge bg-dark-gray rounded-pill">%% PRIORITY %%</span>
                            <small class="ml-2">%% PROJECT NAME %%</small>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="list-group mt-5">
                <h3>Latest updates</h3>
                <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">%% PROJECT NAME %%</h5>
                    </div>
                    <p class="mb-1">%% UPDATE TEXT %%</p>
                    <small>Created by: %% NAME OF CREATOR %% at %% TIME CREATED %%</small>
                </a>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./dashboard.component.ts"></script>
<style>
    .width-100{
        width: 100%;
    }
    .float-right{
        float:right;
    }
</style>
