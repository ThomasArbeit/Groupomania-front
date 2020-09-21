<template>
    <div class="profile">
        <div class="profile__box" v-for="user in profile" :key="user.userId">
            <h1 class="profile__title">Bonjour <span>{{ user.firstName }}</span> ravi de vous revoir !</h1>
            <h2 class="profile__subtitle">Voici vos informations : </h2>
            <p class="profile__firstName"><strong>Votre Prénom :</strong> {{ user.firstName }}</p>
            <p class="profile__lastName"><strong>Votre Nom :</strong> {{ user.lastName }}</p>
            <p class="profile__email"><strong>Votre e-mail :</strong> {{ user.email }}</p>
            <p class="profile__createdAt"><strong>Date de création :</strong> {{ user.createdAt }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Profile',
    data(){
        return {
            profile:""
        }
    },
    mounted(){
        const token = sessionStorage.getItem('usertoken');
        const user_Id = parseInt(sessionStorage.getItem('userId'));
        axios.get("http://localhost:3000/api/users/" + user_Id, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            const data = res.data;
            console.log(data);
            this.profile = data;

        })
        .catch(error => console.log({error}));
    }
}
</script>

<style lang="scss">
    .profile{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto;

        p{
            margin-bottom: 15px;
        }

        &__box{
            margin-top: 150px;
        }

        &__title{
            margin-bottom: 25px;
            span{
                color:#0075b4;
            }
        }
        &__subtitle{
            margin-bottom:40px;
        }

    }
</style>