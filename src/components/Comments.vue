<template>
    <div class="commentaires">
        <h2 class="comments__title"> Les Commentaires </h2>
        <div class="comments" id="comment" v-for='comment in comments' :key='comment.commentId'>
            <div class="comment__title">
                <p class="comment__user">{{ comment.user_Id.firstName }}  {{ comment.user_Id.lastName }}</p>
                <p class="comment__date">{{ comment.createdAt }}</p>
            </div>
            <p class="comment__content">{{ comment.content }}</p>
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
                console.log(data);
                this.comments = data;

            })
            .catch(error => console.log({error}));
            
        }
    }

</script>