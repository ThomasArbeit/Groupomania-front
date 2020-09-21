<template>
    <div class="home">
        <div class="leftBar">
            <NavBar/>
        </div>
        <div class="middleBar">
            <Post/>
        </div>
        <div class="rightBar">
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Post from '../components/Post'

export default {
    name: 'Home',
    components:{
        NavBar,
        Post
    },
}
</script>

<style lang="scss">

</style>