<template>
    <div class="commentaires">
        <h2 class="commentaires__title"> Les Commentaires </h2>
        <div class="comments" id="comment" v-for='comment in comments' :key='comment.commentId'>
            <div class="comments__title">
                <p class="comments__user">{{ comment.User.firstName }}  {{ comment.User.lastName }}</p>
                <p class="comments__date">{{ comment.createdAt }}</p>
                <button class="comments__delete" v-if="comment.commentor_Id == userId || userRole == 1" v-on:click="deleteComment(comment.commentId)">
                    Supprimer 
                    <font-awesome-icon icon="trash" />
                </button>
            </div>
            <p class="comments__content">{{ comment.content }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Comments',
    data(){
        return {
            comments: "",
            userRole: "",
            userId: sessionStorage.getItem('userId')
        }
    },
    methods:{
        deleteComment(id){
            const commentId = id;
            const token = sessionStorage.getItem('usertoken');
            const header = {
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            axios.delete('http://localhost:3000/api/comments/' + commentId, header )
            .then(res => {
                    console.log(res); 
                    window.location.reload();
                })
            .catch(error => console.log(error));
        }
    },
    mounted() {
            const hashUrl = window.location.hash;
            const post_Id = hashUrl.split('/')[2];
            const token = sessionStorage.getItem('usertoken');
            axios.get('http://localhost:3000/api/comments/' + post_Id, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                const data = res.data;
                console.log("les commentaires", data);
                this.comments = data;
            })
            .catch(error => console.log({error}));
            
        }
    }

</script>

<style lang="scss">
    .commentaires {
        padding: 10px;

        
        &__title{
            margin-bottom: 18px;
        }
    }

    .comments{
        padding: 10px;
        background-color: rgba(206, 206, 206, 0);
        border-bottom: 1px solid rgba(238, 238, 238, 1);
        &:hover{
            background-color: rgba(238, 238, 238, 1);
        }
        &__title{
            display: flex;
            margin-bottom: 16px;
            position: relative;
        }
        &__user{
            font-weight: 600;
            margin-right: 20px;
        }
        &__date{
            color: rgba(88, 88, 88, 0.651);
        }
        &__content{
            margin-bottom: 15px;
        }
        &__delete{
            position: absolute;
            top: 0px;
            right: 5px;
            z-index: 2;
            border: none;
            padding: 5px 8px;
            border-radius: 30px;
            color: white;
            background-color: #FD2D01;
            cursor: pointer;
            &:hover{
                box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.199);
            }
        }
    }
</style>