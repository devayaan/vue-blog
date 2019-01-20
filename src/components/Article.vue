<template>
    <div class="card my-3">
        <div class="card-header">
            <h3>{{ article.title }}</h3>
        </div>

        <div class="card-body">
            <p v-html="article.content.substring(0, 200)"></p>

            <router-link :to="{ path: `/${ article.id }/${ article.slug }` }" class="btn btn-default">Read More</router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'article'
    ]
}
</script>

<style scoped>
.card-header > h3 {
    text-transform: capitalize;
}
</style>