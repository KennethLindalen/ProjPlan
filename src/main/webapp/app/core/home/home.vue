<template>
    <div class="home row" style="margin: 0px;">
        <div class="col-sm jumbotron" v-if="!authenticated">
            <h1 class="display-5">Need help organizing your project?</h1>
            <p>A place to plan and orgranize your projects!</p>
            <p class="lead" v-text="$t('home.subtitle')">This is your homepage</p>
        </div>
        <div class="col-sm col-md jumbotron" v-if="authenticated">
            <h1 v-if="username">Welcome, {{ username }}!</h1>
            <p>A place to plan and orgranize your projects!</p>
            <p class="lead" v-text="$t('home.subtitle')">This is your homepage</p>
        </div>

        <div class="col-sm col-md mhide" v-if="!authenticated">
            <h2 class="display-5">Login</h2>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                       placeholder="Enter email" v-model="login"
                       style="background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                    else.</small>

                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                       v-model="password"
                       style="background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;">

                <div class="alert alert-warning mt-3" v-if="!authenticated">
                    <span v-text="$t('global.messages.info.register.noaccount')">You don't have an account yet?</span>&nbsp;
                    <router-link class="alert-link" to="/register" v-text="$t('global.messages.info.register.link')">
                        Register a new account
                    </router-link>
                </div>
                <button id="login-btn" type="submit" class="btn btn-dark" v-on:click="doLogin">Submit</button>
                <b-form-checkbox id="rememberMe" name="rememberMe" v-model="rememberMe" size="lg" class="mt-1">
                    <span>Remember me</span>
                </b-form-checkbox>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./home.component.ts"></script>
<style>
#login-btn {
    width: 100%;
}

.row {
    display: flex;
    width: 100%;
}

/* If the browser window is smaller than 600px, make the columns stack on top of each other */
@media only screen and (max-width: 600px) {
    .col-sm {
        display: block;
        width: 100%;
        grid-template-columns: 1fr;
    }

    .mhide {
        display: none;
    }
}
</style>
