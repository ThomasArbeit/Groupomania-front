<template>
    <div class="modale" v-if="revele" >
        <div class="modale__overlay" v-on:click="toggleModale"></div>
        <div class="modale__card">
            <div v-on:click='toggleModale' class="modale__button">X</div>
            <h2 class="modale__title">Modifiez votre compte</h2>
            <form method="POST" class="modale__form" v-on:submit.prevent="modifyProfile()">
                <div class="modale__formbox">
                    <label for="firstName" class="modale__label">Votre nom</label>
                    <input type="text" id="firstName" class="modale__input" placeholder="Changez votre nom" v-model="firstName">
                    <span class="form__error" v-if="(!$v.firstName.required && $v.firstName.$dirty) && submited">Veuillez ajouter votre nom</span>
                </div>
                <div class="modale__formbox">
                    <label for="lastName" class="modale__label">Votre prénom</label>
                    <input type="text" id="lastName" class="modale__input" placeholder="Changez votre prénom" v-model="lastName">
                    <span class="form__error" v-if="(!$v.lastName.required && $v.lastName.$dirty) && submited">Veuillez ajouter votre nom</span>
                </div>
                <div class="modale__formbox">
                    <label for="email" class="modale__label">Votre E-mail</label>
                    <input type="email" id="email" class="modale__input" placeholder="Changez votre E-mail" v-model="email">
                    <span class="form__error" v-if="((!$v.email.required || !$v.email.email) && $v.email.$dirty) && submited">Veuillez rentrer un email valide</span>
                    <span class="form__error" v-if="responseEmailError">Cette adresse mail n'est pas disponible</span>
                </div>
                <button type="submit" class="modale__submit">VALIDER</button>
                
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { required, email} from 'vuelidate/lib/validators'
export default {
    name: 'ModaleProfile',
    props: ['revele', 'toggleModale'],
    data(){
        return{
            firstName:"",
            lastName:"",
            email:"",
            userId: sessionStorage.getItem("userId"),
            responseEmailError: false,
            submited: false
        }
    },
    validations: {
        firstName:{
            required
        },
        lastName:{
            required
        },
        email:{
            required,
            email
        }
    },
    methods:{
        modifyProfile(){
            this.$v.$touch();
            this.submited = true;
            if (!this.$v.$invalid){
                const token = sessionStorage.getItem("usertoken");
                axios.post('http://localhost:3000/api/users/' + this.userId,{
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    userId: this.userId
                },
                {
                    headers:{ 
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    console.log(res);
                    window.location.reload();
                })
                .catch(error =>{
                    console.log(error);
                    this.responseEmailError = true;
                }) 
            } 
        }
    }
}
</script>

<style lang='scss'>
    .modale{
        position: fixed;
        top:0;
        right:0;
        bottom:0;
        left:0;

        z-index: 2;
        padding: 40px;

        display: flex;
        justify-content: center;
        align-items: center;

        &__overlay{
            position: fixed;
            top:0;
            right:0;
            bottom:0;
            left:0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.4);
        }


        &__card{
            position: relative;
            z-index: 2;
            background-color: rgb(247, 247, 247);
            width: 100%;
            max-width: 800px;
            border-radius: 10px;
            padding: 40px;
        }

        &__title{
            margin-bottom: 20px;
        }

        &__button{
            position: absolute;
            top: 15px;
            right: 15px;

            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgb(184, 21, 21);
            height: 25px;
            width: 25px;

            cursor: pointer;

            border-radius: 5px;

            color: white;

            &:hover{
                background-color: rgb(148, 0, 0);
            }
        }

        &__form{
            position: relative;
        }

        &__formbox{
            display: flex;
            flex-direction: column;
            padding-bottom: 40px;
            position: relative;
        }

        &__label{
            display: block;
            font-size: 20px;
            margin-bottom: 16px;
        }

        &__input{
            height: 50px;
            padding-left: 20px; 
            border-radius: 10px;
            border: 1px solid black;

            font-size: 16px;
        }

        &__submit{
            padding: 10px 30px;
            border-radius: 10px;
            border: none;
            background-color: #004367;
            color: white;
            font-size: 16px;
            margin-top: 20px;
            cursor: pointer;
        }

        &__success{
            background-color: rgba(10, 173, 4, 0.2);
            margin-top: 20px;
            padding: 10px 20px;
            border: 1px solid rgba(0, 0, 0, 0.219);
            border-radius: 10px;
            color:rgb(32, 104, 29);
        }

        &__error{
            background-color: rgba(173, 4, 4, 0.2);
            margin-top: 20px;
            padding: 10px 20px;
            border: 1px solid rgba(0, 0, 0, 0.219);
            border-radius: 10px;
            color:rgb(104, 29, 29);
        }
    }
</style>