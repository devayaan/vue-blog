<template>
    <div class="my-3">
        <vue-headful
            title="Home"
            description="Description from vue-headful"
        />

        <div class="row" v-if="articles.data && !loading">
            <div class="col-6" v-for="article in articles.data" :key="article.id">
                <Article :article="article" />
            </div>
        </div>

        <div class="loader my-5" v-else>
            <div class="d-flex justify-content-center">
                <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>

        <div class="d-flex mb-3 justify-content-between">
            <button :disabled="articles.prev_page_url === null" @click="getArticles(articles.prev_page_url)" class="btn btn-info">Prev</button>
            <button :disabled="articles.next_page_url === null" @click="getArticles(articles.next_page_url)" class="btn btn-primary">Next</button>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import config from '../config';
import Article from '../components/Article';

export default {
    mounted() {
        this.getArticles();
    },
    components: {
        Article
    },
    data() {
        return {
            articles: {},
            loading: true
        }
    },
    methods: {
        getArticles(url = `${ config.apiUrl }/articles`) {
            this.loading = true;

            Axios.get(url).then(
                response => {
                    this.articles = response.data.data;
                    this.loading = false;
                }
            );
        }
    }
}
</script>
