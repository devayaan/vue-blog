<template>
    <div id="app">
        <Navbar />
        
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
// Styles
import './assets/css/bootstrap.min.css';

// Components
import Navbar from './components/layout/Navbar';

export default {
    name: 'app',
    components: {
        Navbar
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

img {
    max-width: 100%;
}

.input-button-holder {
    position: relative;
}

.input-padded-button {
    padding-right: 55px;
}

.toggle-password-visibility {
    border: 0px;
    background-color: transparent;
    font-size: 9px;
    font-weight: bold;
    color: #2991ff;
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 13px;
    cursor: pointer;
    text-transform: uppercase;
}
</style>
