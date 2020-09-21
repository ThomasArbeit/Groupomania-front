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
    }
}
</script>

<style lang="scss">

</style>