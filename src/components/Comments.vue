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
                <button class="comments__modify" v-if="(comment.commentor_Id == userId || userRole == 1) && comment.modify == false" v-on:click="modifyPrompt(comment)">
                    Modifier
                    <font-awesome-icon icon="pen" />
                </button>
            </div>
            <p class="comments__content" v-if="comment.modify == false">{{ comment.content }} </p>
            <form class="comments__form" method="POST" v-on:submit.prevent="modifyComm(comment.commentId, comment)" v-if="comment.modify == true">
                <div class="modale__button" v-on:click="modifyPrompt(comment)">X</div>
                <input type="text" class="comment__input"  v-model="comment.content">
            </form>
            
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
            userId: sessionStorage.getItem('userId'),
        }
    },
    methods:{
        toggleModify(id, comment){
            const index = this.comments.indexOf(comment);
            this.comments[index].modify = !this.comments[index].modify;
        },
        modifyPrompt(comment){
            const index = this.comments.indexOf(comment);
            this.comments[index].modify = !this.comments[index].modify;
        },
        modifyComm(id, comment){
            const commentId = id;
            const token = sessionStorage.getItem('usertoken');
            const index = this.comments.indexOf(comment);
            const body = {
                content: this.comments[index].content
            }
            const header = {
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            axios.post('http://localhost:3000/api/comments/' + commentId, body, header )
            .then(res => {
                console.log(res);
                this.comments[index].modify = !this.comments[index].modify;
            })
            .catch(error => console.log(error));
        },
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
                let data = res.data;
                console.log("les commentaires", data);
                for (let i = 0; i<data.length; i++){
                    data[i].modify = false;
                }
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
        &__modify{
            position: absolute;
            top: 35px;
            right: 5px;
            z-index: 2;
            border: none;
            padding: 5px 8px;
            border-radius: 30px;
            color: white;
            background-color: #02096b;
            cursor: pointer;
        }

        &__form{
            position: relative;
        }
    }
</style>