<template>
    <div>
        <div class="projects">
            <div id="projectOverview">
                <h3 class="width-100">Your projects
                    <button type="button" class="btn btn-outline-secondary pt-1 pb-1 p-1 float-right mb-1"
                            style="border-radius: 5px">New project
                    </button>
                </h3>
                <table class="table table-striped table-hover table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Project name</th>
                        <th scope="col">Reported bugs</th>
                        <th scope="col">Comments</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>2</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Mark1</td>
                        <td>33</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <hr>
            <div class="row">
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

                <div class=" mt-1 col-sm col-md ml-md-3 ml-sm-3">
                    <h3>Latest updates</h3>
                    <a href="#" class="list-group-item list-group-item-action">
                        <div class="d-flex justify-content-between">
                            <h5 class="mb-1">%% PROJECT NAME %%</h5>
                        </div>
                        <p class="mb-1">%% UPDATE TEXT %%</p>
                        <small>Created by: %% NAME OF CREATOR %% at %% TIME CREATED %%</small>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./dashboard.component.ts"></script>
<style>
.width-100 {
    width: 100%;
}

.float-right {
    float: right;
}
</style>
