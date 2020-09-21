<template>
    <nav class="navigation">
        <img class="navigation__logo" src="../assets/white-logo.png" alt="logo Groupomania blanc">
        <router-link class="navigation__link" to="/Home">Accueil</router-link>
        <router-link class="navigation__link" to="/Profile">Mon Profil</router-link>
    </nav>
</template>

<script>
export default {
    name:'NavBar',
    data(){
        return {
            userId: sessionStorage.getItem('userId')
        }
    }
}
</script>

<style lang="scss">
    .navigation{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;

        position: relative;

        &__logo{
            position: absolute;
            top: 144px;
        }

        &__link{
            text-decoration: none;
            color: white;
            font-size: 20px;
            margin-bottom: 20px;

            &:active{
                opacity: 0.7;
            }
        }
    }
</style>