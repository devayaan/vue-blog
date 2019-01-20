<script>
export default {
    mounted() {
        if (localStorage.getItem('auth')) {
            localStorage.removeItem('auth');

            this.$root.auth = {};
            this.$router.push({ path: '/login' });
        } else {
            this.$router.push({ path: '/register' });
        }
    }
}
</script>
