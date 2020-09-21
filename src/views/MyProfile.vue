<template>
    <div class="home">
        <div class="leftBar">
            <NavBar/>
        </div>
        <div class="middleBar">
            <Profile/>
        </div>
        <div class="rightBar">
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Profile from '../components/Profile.vue'

export default {
    name: 'Home',
    components:{
        NavBar,
        Profile
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

</style>