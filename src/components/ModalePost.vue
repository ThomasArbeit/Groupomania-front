<template>
    <div class="modale" v-if="revele" >
        <div class="modale__overlay" v-on:click="toggleModale"></div>
        <div class="modale__card">
            <div v-on:click='toggleModale' class="modale__button">X</div>
            <h2 class="modale__title">Modifiez votre Post</h2>
            <form method="POST" class="modale__form" v-on:submit.prevent="modifyPost()">
                <div class="modale__formbox">
                    <label for="title" class="modale__label">Changez le titre</label>
                    <input type="text" id="title" class="modale__input" placeholder="Changez votre nom" v-model="post.content">
                </div>
                <div class="modale__formbox">
                    <label for="image" class="modale__label" >Modifiez l'image</label>
                    <input type="file" id="image" class="modale__input" @change="onFileSelected">
                </div>
                <button type="submit" class="modale__submit">VALIDER</button>
                <div v-show="success" >
                    <div id='response'>
                        <p>{{ message }}</p>
                    </div>
                </div>
                
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ModalePost',
    props: ['revele', 'toggleModale', 'post', 'printPost', 'isLiked'],
    data(){
        return{
            userId: sessionStorage.getItem("userId"),
            success:"",
            message:"",
            selectedFile: null
        }
    },
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile);
        },
        modifyPost(){
            if (this.post.content === ""){
                this.success = true;
                this.message = "Veuillez renseigner un titre !"
                document.getElementById('response').classList = 'modale__error'
            } else {
                const token = sessionStorage.getItem('usertoken');
                let fd = new FormData();
                fd.append('userId', this.userId);
                fd.append('content', this.post.content);
                if (this.selectedFile != null){
                    fd.append('image', this.selectedFile, this.selectedFile.name);
                }
                axios.post('http://localhost:3000/api/posts/' + this.post.postId, fd,
                {
                    headers:{ 
                        'Content-type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    console.log(res);
                    this.success = true;
                    this.message = "Votre Post a bien été modifié";
                    document.getElementById('response').classList = 'modale__success'
                    this.printPost();
                    this.toggleModale();
                    this.success = !this.success;
                })
                .catch(error => console.log(error));
            }
        }
    }
}
</script>