<template>
    <div class="row my-5">
        <vue-headful title="Login - Vue Blog" />

        <div class="col-md-5" style="margin: 0 auto;">

            <div class="card">
                <div class="card-body">
                    <div class="card-title text-center">
                        <h3 class="">Login</h3>
                    </div>

                    <div class="card-text">
                        <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="errors.errors">
                            <span v-for="error in errors.errors" :key="error">{{ error }}</span>
                        </div>

                        <form @submit.prevent="login">
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
                                <button type="submit" class="btn btn-primary form-control" :disabled="loginButtonLoading">
                                    <span v-if="loginButtonLoading">
                                        <div class="spinner-grow spinner-grow-sm" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                        Authenticating
                                    </span>

                                    <span v-else>Login</span>
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
            email: '',
            password: '',
            errors: {},
            loginButtonLoading: false,
            showPassword: false
        }
    },
    methods: {
        login() {
            this.loginButtonLoading = true;

            this.showPassword = false;

            Axios.post(`${ config.apiUrl }/auth/login`, {
                email: this.email,
                password: this.password
            }).then(response => {
                this.$root.auth = response.data.data;
                localStorage.setItem('auth', JSON.stringify(response.data.data));

                this.loginButtonLoading = true;
                
                this.$router.push('/');
            }).catch(({ response }) => {
                if (response.status === 401) {
                    this.errors = {
                        errors: ['Incorrect Email or Password'],
                        email: '',
                        password: ''
                    }
                } else {
                    this.errors = response.data;
                }

                this.loginButtonLoading = false;
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
