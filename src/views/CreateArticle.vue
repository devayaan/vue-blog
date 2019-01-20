<template>
    <div class="container my-5">
        <vue-headful title="Create New Article - Vue Blog" />

        <div class="row">
            <div class="col-md-8">
                
                <div class="card">
                    <div class="card-body">
                        <div class="card-title text-center">
                            <h3>Create Article</h3>
                        </div>

                        <div class="card-text">
                            <form @submit.prevent="createArticle()">
                                <div class="form-group">
                                    <picture-input
                                        accept="image/jpeg,image/png" 
                                        size="5" 
                                        button-class="btn btn-danger"
                                        @change="onChange"
                                    />
                                </div>

                                <div class="form-group">
                                    <label for="title">Title</label>

                                    <input v-model="title" type="text" id="title" class="form-control">
                                </div>

                                <div class="form-group">
                                    <label for="categories">Category</label>

                                    <select v-model="categoryId" class="form-control" id="categories">
                                        <option selected>Select a Category</option>
                                        <option :value="category.id" v-for="category in categories" :key="category.id">
                                            {{ category.name }}
                                        </option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label>Content</label>

                                    <wysiwyg v-model="content" />
                                </div>

                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary form-control" :disabled="createButtonLoading">
                                        <span v-if="createButtonLoading">
                                            <div class="spinner-grow spinner-grow-sm" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                            Posting
                                        </span>

                                        <span v-else>Post</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import PictureInput from 'vue-picture-input';
import config from '../config';

export default {
    beforeRouteEnter(to, from, next) {
        if (!localStorage.getItem('auth')) {
            return next({ path: '/' });
        }
        next();
    },
    mounted() {
        this.getCategories()
    },
    data() {
        return {
            title: '',
            content: '',
            image: null,
            categories: [],
            categoryId: "",
            createButtonLoading: false
        }
    },
    components: {
        PictureInput
    },
    methods: {
        createArticle() {
            if (!this.image || !this.title || !this.categoryId || !this.content) {
                this.$noty.error('Please fill in all fields');
                return;
            }

            this.createButtonLoading = true;

            const form = new FormData();
            form.append('file', this.image);

            // process.env let's us use our saved environment variables
            // located in `approot > .env.local`
            form.append('upload_preset', process.env.VUE_APP_CLOUDINARY_PRESET );
            form.append('api_key', process.env.VUE_APP_CLOUDINARY_API_KEY);

            const cloundinaryApiUrl = process.env.VUE_APP_CLOUDINARY_URL;
            Axios.post(cloundinaryApiUrl, form).then(
                response => {
                    Axios.post(`${ config.apiUrl }/articles`, {
                        title: this.title,
                        content: this.content,
                        category_id: this.categoryId,
                        imageUrl: response.data.secure_url
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${ this.$root.auth.token }`
                        }
                    }).then(
                        response => {
                            this.$noty.success('Article created successfully!');
                            this.createButtonLoading = false;
                            
                            this.$router.push("/");
                        }
                    ).catch(
                        error => {
                            this.$noty.error('Oops, looks like something went wrong!');
                            this.createButtonLoading = false;
                        }
                    );
                }
            ).catch(
                error => {
                    this.$noty.error('Unable to save image');
                    this.createButtonLoading = false;
                }
            );
        },
        onChange(image) {
            this.image = image;
        },
        getCategories() {
            if (localStorage.getItem('articleCategories')) {
                this.categories = JSON.parse(localStorage.getItem('articleCategories'));
            } else {
                Axios.get(`${ config.apiUrl }/categories`).then(
                    response => {
                        this.categories = response.data.categories;
                        localStorage.setItem('articleCategories', JSON.stringify(this.categories));
                    }
                );
            }
        }
    }
}
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.row> .col-md-8 {
    margin: 0 auto;
}
</style>
