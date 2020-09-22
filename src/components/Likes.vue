<template>
        <p class="post__like" id="heart" v-on:click="Likes()"><font-awesome-icon icon="heart" /></p>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Likes',
    data(){
        return {
            isLiked: "",
            userId: parseInt(sessionStorage.getItem('userId')),
            token: sessionStorage.getItem('usertoken'),
            heart: document.getElementById("heart")
        }
    },
    mounted() {
        const hashUrl = window.location.hash;
        const post_Id = hashUrl.split('/')[2];
        const token = this.token;
        const heart = document.getElementById("heart");
        axios.get('http://localhost:3000/api/likes/' + post_Id, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            const data = res.data;
            console.log("Les likes", data);
            if (data.length == 0){
                this.isLiked = false;
                heart.classList = "post__like"
            } else {
                for (let i = 0; i < data.length; i++){
                    if (this.userId == data[i].liker_Id){
                        
                        heart.classList = "post__like post__liked";
                        this.isLiked = true;
                        break;
                    } else {
                        heart.classList = "post__like";
                        console.log(this.isLiked);
                        this.isLiked = false;
                    }
                }
            }
            
        })
        .catch(error => console.log({error}));
    },
    methods:{
        Likes(){
            const hashUrl = window.location.hash;
            const post_Id = hashUrl.split('/')[2];
            const token = this.token;
            let heart = document.getElementById('heart');
            let body = {
                userId: this.userId
            }
            const header = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            if (this.isLiked == false){
                console.log("Je suis en train de liker");
                body.likes = 1;
                // Incrémentation des likes du post par 1
                axios.put('http://localhost:3000/api/posts/' + post_Id, body, header)
                .then(res => console.log(res))
                .catch(error => console.log(error));

                // Ajout de l'id de l'utilisateur dans la table Likes
                axios.post('http://localhost:3000/api/likes/' + post_Id, body, header)
                .then(res => console.log(res))
                .catch(error => console.log(error));

                //Changement de la classe du bouton like pour devenir rouge
                heart.classList = "post__like post__liked";
                window.location.reload();

            } else {
                console.log("Je suis en train d'annuler mon like");
                body.likes = 0;
                console.log(body);
                // Décrémentation des likes du post par -1
                axios.put('http://localhost:3000/api/posts/' + post_Id, body, header)
                .then(res => console.log(res))
                .catch(error => console.log(error));

                // Suppression de la ligne Likes correspondant à l'userId et l'id du like
                axios.post('http://localhost:3000/api/likes/delete/' + post_Id, body, header)
                .then(res => console.log(res))
                .catch(error => console.log(error));

                // Changement de la classe du bouton like pour devenir sans couleur
                heart.classList = "post__like";
                window.location.reload();
            }
            this.isLiked = !this.isLiked
        }
    }
}

</script>

<style lang="scss" >
    .post{
        &__like{
        position: absolute;
        top: 10px;
        right: 20px;
        cursor: pointer;
        transition: transform ease-in-out 200ms, opacity 200ms;
        color: rgb(167, 167, 167);
        font-size: 20px;
        opacity: 0.8;
        
        &:hover{
            transform: scale(1.2);
            opacity: 1
        }
    }
    &__liked{
        color: #FD2D01;
    }
}
    
</style>