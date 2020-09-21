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
    beforeMount(){
    console.log("Avant l'affichage");
    const token = sessionStorage.getItem('usertoken');
    const pageurl = window.location.href;
    const url = pageurl.split('#')[1];
    if((url != "/Login" && url != "/Signup") && (token == null)){
      window.location = "http://localhost:8080/#/Login";
    }
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
    }

    .middleBar{
        order:3;
        width: 100%;
        max-width: 800px;
        margin: auto;
        padding: 20px;
    }

    .rightBar{
        order:2;
        width: 100%;
        max-width: 800px;
        margin: auto;
        padding: 20px;
    }
</style>