<template>
    <div class="createPost">
        <h2 class="createPost__title">Partagez un post !</h2>
        <form method="POST" class="createPost__form" v-on:submit.prevent="create()" id="formElem">
            <div class="createPost__formbox">
                <label for="title" class="createPost__formlabel">Titre de votre post</label>
                <input type="text" name="title" id="title" value="" v-model="content" class="createPost__forminput" placeholder="Ecrivez votre titre ici">
            </div>
            <div class="createPost__formbox">
                <label for="file" class="createPost__formlabel createPost__formlabel--file">Choix de l'image / GIF</label>
                <input type="file" name="image" id="file" @change="onFileSelected"  hidden>
            </div>
            <button type="submit" class="createPost__formsubmit">Créer</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'CreatePosts',
    data(){
        return{
            content: '',
            selectedFile: null
        }
    },
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile);
        },
        create(){
            const userId = parseInt(sessionStorage.getItem('userId'));
            const token = sessionStorage.getItem('usertoken');
            let fd = new FormData();
            fd.append('userId', userId);
            fd.append('content', this.content);
            fd.append('image', this.selectedFile, this.selectedFile.name);
            axios.post('http://localhost:3000/api/posts/create', fd, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            })
        }
    }
}
</script>

<style lang="scss">
    .createPost {
        margin: auto;
        margin-top: 100px;
        width: 80%;

        &__title{
            font-size: 26px;
            margin-bottom: 54px;
        }

        &__formbox{
            display: flex;
            flex-direction: column;
        }

        &__formlabel{
            display: block;
            font-size: 20px;
            font-weight: 400;
            margin-bottom: 12px;

            &--file{
                text-decoration: underline;
                cursor: pointer;
            }
        }

        &__forminput{
            display: block;
            width: 100%;
            height: 56px;
            border-radius: 10px;
            border: 1px solid #545454;
            margin-bottom: 30px;
            padding-left: 21px;
            font-size: 20px;
            color: #AFAFAF;
        }

        &__formsubmit{
            width: 45%;
            height: 56px;
            background-color: #004367;
            color: white;
            border: none;
            border-radius: 10px;
            margin-top: 18px; 
            cursor: pointer;
            font-size: 20px;
        }
    }


</style>