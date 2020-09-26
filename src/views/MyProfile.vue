<template>
    <div class="home">
        <div class="leftBar">
            <NavBar/>
        </div>
        <div class="middleBar">
            <Profile v-bind:userId="userId" v-bind:token="token"/>
            <ModaleProfile v-bind:revele="revele" v-bind:toggleModale="toggleModale" />
            <button v-on:click='toggleModale'  class="home__button">Modifier mes informations</button>
            <button v-on:click='deleteAccount'  class="home__button home__button--delete">Supprimer mon compte</button>
        </div>
        <div class="rightBar">
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Profile from '../components/Profile.vue'
import ModaleProfile from '../components/ModaleProfile'
import axios from 'axios'

export default {
    name: 'Home',
    data(){
        return{
            revele: false,
            userId: sessionStorage.getItem('userId'),
            token: sessionStorage.getItem('usertoken')
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
        },
        deleteAccount(){
            axios.delete('http://localhost:3000/api/users/' + this.userId, {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(() => {
                console.log("Profil supprimé");
                sessionStorage.clear();
                this.$router.push('/Login');
            })
        }
    },
}
</script>

<style lang="scss">
    .home__button{
        display: block;
        padding: 5px 10px;
        border-radius: 5px;
        border: none;
        color: white;
        background-color:#004367;
        margin-top: 25px;

        cursor: pointer;

        &--delete{
            background-color: red;
        }
    }
</style>