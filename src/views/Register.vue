<template>
    <div class="row my-5">
        <vue-headful title="Register - Vue Blog" />

        <div class="col-md-5" style="margin: 0 auto;">

            <div class="card">
                <div class="card-body">
                    <div class="card-title text-center">
                        <h3 class="">Register</h3>
                    </div>

                    <div class="card-text">
                        <form @submit.prevent="register()">
                            <div class="form-group">
                                <label for="fullname">Fullname</label>

                                <input v-model="fullname" type="text" id="fullname" class="form-control" v-bind:class="{ 'is-invalid' : errors.name }" autofocus="true">

                                <div class="errors" v-if="errors.name">
                                    <small class="text-danger" v-for="error in errors.name" :key="error">{{  error }}</small>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="email">Email</label>

                                <input v-model="email" type="email" id="email" class="form-control" v-bind:class="{ 'is-invalid' : errors.email }">

                                <div class="errors" v-if="errors.email">
                                    <small class="text-danger" v-for="error in errors.email" :key="error">{{  error }}</small>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="password">Password</label>

                                <div class="input-button-holder">
                                    <input v-model="password" v-bind:type="showHidePasswordType" id="password" class="form-control" v-bind:class="{ 'is-invalid' : errors.password }">

                                    <span @click="showHidePassword" class="toggle-password-visibility">
                                        {{ showPassword ? 'HIDE' : 'SHOW' }}
                                    </span>
                                </div>

                                <div class="errors" v-if="errors.password">
                                    <small class="text-danger" v-for="error in errors.password" :key="error">{{  error }}</small>
                                </div>
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn btn-primary form-control" :disabled="registerButtonLoading">
                                    <span v-if="registerButtonLoading">
                                        <div class="spinner-grow spinner-grow-sm" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                        Submitting
                                    </span>

                                    <span v-else>Register</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import config from '../config';

export default {
    beforeRouteEnter(to, from, next) {
        if (localStorage.getItem('auth')) {
            return next({ path: '/' });
        }
        next();
    },
    data() {
        return {
            fullname: '',
            email: '',
            password: '',

            errors: {},
            registerButtonLoading: false,
            showPassword: false
        }
    },
    methods: {
        register() {
            this.registerButtonLoading = true;

            this.showPassword = false;

            Axios.post(`${ config.apiUrl }/auth/register`, {
                name: this.fullname,
                email: this.email,
                password: this.password
            }).then(response => {
                this.registerButtonLoading = false;

                this.$noty.success('<b>Awesome!</b> Your account was created successfully!');

                this.$router.push('/login');
            }).catch(({ response }) => {
                this.registerButtonLoading = false;
                
                this.errors = response.data;
            });
        },
        showHidePassword() {
            this.showPassword = !this.showPassword;
        }
    },
    computed: {
        showHidePasswordType() {
            if (this.showPassword) {
                return 'text';
            } else {
                return 'password';
            }
        }
    }
}
</script>
