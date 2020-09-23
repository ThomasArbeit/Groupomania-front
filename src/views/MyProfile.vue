<template>
    <div class="home">
        <div class="leftBar">
            <NavBar/>
        </div>
        <div class="middleBar">
            <Profile/>
            <ModaleProfile v-bind:revele="revele" v-bind:toggleModale="toggleModale" />
            <button v-on:click='toggleModale'  class="home__button">Modifier mes informations</button>
        </div>
        <div class="rightBar">
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Profile from '../components/Profile.vue'
import ModaleProfile from '../components/ModaleProfile'

export default {
    name: 'Home',
    data(){
        return{
            revele: false
        }
    },
    components:{
        NavBar,
        Profile,
        ModaleProfile
    },
    methods:{
        toggleModale(){
            this.revele = !this.revele;
        }
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
    .home__button{
        padding: 5px 10px;
        border-radius: 5px;
        border: none;
        color: white;
        background-color:#004367;
        margin-top: 25px;

        cursor: pointer;
    }
</style>