<template>
    <div class="comment">
        <h2 class="comment__title">
            Ajoutez un commentaire :
        </h2>
        <form method="POST" class="comment__form" v-on:submit.prevent='submit()'>
            <div class="comment__formbox" >
                <label for="comment" class="comment__label">Votre commentaire :</label>
                <input type="text" id="comment" class="comment__input" v-model="comment" placeholder="Entrez votre commentaire">
            </div>
            <button class="comment__button" type="submit">VALIDER</button>
        </form>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Comment',
    data(){
        return{
            comment: "",
        }
    },
    methods:{
        submit(){
            const hashUrl = window.location.hash;
            const post_Id = hashUrl.split('/')[2];
            const token = sessionStorage.getItem('usertoken');
            const userId = sessionStorage.getItem('userId');
            console.log(userId);
            const body = {
                userId: userId,
                content: this.comment
            };
            const header = {
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            };
            console.log(post_Id);
            axios.post('http://localhost:3000/api/comments/create/' + post_Id, body, header )
            .then(res => {
                console.log(res);
                this.comment = "";
                window.location.reload();
            })
            .catch(error => console.log({error}));
        }
    }
}
</script>

<style lang="scss" scoped>
    .comment{
        padding: 10px;
        &__title{
            margin-bottom: 18px;
        }
        &__form{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
        &__formbox{
            width: 100%;
            margin-bottom: 18px;
        }
        &__label{
            display: block;
            margin-bottom: 10px;
        }
        &__input{
            width: 100%;
            height: 50px;
            border-radius: 10px;
            border: 1px solid black;
            padding-left: 16px;
            font-size: 16px;
        }
        &__button{
            width: 20%;
            background-color: #004367;
            border-radius: 10px;
            padding: 12px 30px;
            border: none;
            color: white;
            font-size: 16px;
        }
    }
</style>