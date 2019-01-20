<template>
    <div class="container my-5">
        <vue-headful :title="title + ' - Vue Blog'" />

        <div class="row">
            <div class="col-md-8" style="margin: 0 auto;">
                
                <div class="card" v-if="!loading">
                    <img :src="article.imageUrl">

                    <div class="card-body">
                        <div class="card-title">
                            <h2>{{ article.title }}</h2>
                        </div>

                        <div class="card-text">
                            <p v-html="article.content"></p>
                        </div>
                    </div>
                </div>

                <div class="loader" v-else>
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
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
    mounted() {
        this.getArticle();
    },
    data() {
        return {
            title: 'Loading...',
            article: {},
            loading: true
        }
    },
    methods: {
        getArticle() {
            Axios.get(`${ config.apiUrl }/article/${this.$route.params.id}`).then(
                response => {
                    this.article = response.data.data;
                    this.title = this.article.title;
                    this.loading = false; 
                }
            );
        }
    }
}
</script>

<style scoped>
.card-title > h2 {
    text-transform: capitalize;
}
</style>

