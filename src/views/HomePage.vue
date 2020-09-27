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
    },
}
</script>

<style lang="scss">

    .home{
        display:flex;
        flex-direction: column;
    }

    .leftBar{
        position: fixed;
        order:1;
        z-index: 2;
        background-color: #004367;
        height: 80px;
        width:100%;
        padding: 20px;

        @media (max-width: 556px){
            height: 120px;
        }

    }

    .middleBar{
        order:3;
        width: 100%;
        max-width: 800px;
        margin: auto;
    }

    .rightBar{
        order:2;
        width: 100%;
        max-width: 800px;
        margin: auto;
        padding: 20px;
    }
</style>