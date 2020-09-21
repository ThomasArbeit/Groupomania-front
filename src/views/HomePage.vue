<template>
    <div class="home">
        <div class="leftBar">
            <NavBar/>
        </div>
        <div class="middleBar">
            <Posts/>
        </div>
        <div class="rightBar">
            <CreatePosts/>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Posts from '../components/Posts.vue'
import CreatePosts from '../components/CreatePosts.vue'

export default {
    name: 'Home',
    components:{
        NavBar,
        Posts,
        CreatePosts,
    }
}
</script>

<style lang="scss">

    .home{
        display:flex;
    }

    .leftBar{
        position: fixed;
        order:1;
        background-color: #004367;
        height:100vh;
        width:25%;
    }

    .middleBar{
        order:2;
        width:50%;
        margin-left: 25%;
    }

    .rightBar{
        order:3;
        width:25%;
    }
</style>