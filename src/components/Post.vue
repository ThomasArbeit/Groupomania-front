<template>
    <div class="posts">
        <h1 class="posts__title"> Un seul Post </h1>
        <div class="post" id="post" v-for="post in post" :key="post.postId">
            <div class="post__title">
                <p class="post__user">{{ post.user_Id.firstName }}  {{ post.user_Id.lastName }}</p>
                <p class="post__desc">{{ post.content }}</p>
                <p class="post__date">{{ post.createdAt }}</p>
            </div>

            <div class="post__image">
                <img :src="post.imageUrl" alt="" class="post__img">
            </div>
            <div class="post__commsAndLike">
            </div>
            <CreateComment/>
            <Comments/>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import CreateComment from './CreateComment'
import Comments from './Comments'
export default {
    name: 'Post',
    components:{
        CreateComment,
        Comments
    },
    data(){
        return {
            post: "",
        }
    },
    mounted() {
            const hashUrl = window.location.hash;
            const post_Id = hashUrl.split('/')[2];
            console.log(post_Id)
            const token = sessionStorage.getItem('usertoken');
            axios.get('http://localhost:3000/api/posts/' + post_Id, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                const data = res.data;
                console.log(data);
                this.post = data;

            })
            .catch(error => console.log({error}));
            
        }
    }

</script>

<style lang="scss">

    .posts{
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto;

        &__title{
            margin: 154px 0 34px;;
            font-size: 26px;
            font-weight: 700;
        }
    }

    .post{
        margin-bottom: 30px;
        background-color: white;

        border-radius: 10px;
        box-shadow: 0px 0px 10px hsla(0, 0%, 0%, 0.26);

        &__title{
            font-size: 15px;
            margin-top: 10px;
            padding: 10px;
            position: relative;
            z-index: 1;

            p{
                margin-bottom: 10px;
            }
        }
        &__user{
            font-weight: 600;
        }
        &__desc{
            font-weight: 500;
        }
        &__date{
            color: #9A9A9A;
            font-weight: 300;
        }
        &__image{
            width: 100%;
        }
        &__img{
            width: 100%;
            position: relative;
            z-index: 0;
            
        }
        &__commsAndLike{
            margin-bottom: 20px;
            padding: 10px;
        }
    }
</style>