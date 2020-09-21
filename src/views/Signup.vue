<template>
    <main>
        <div class="left">
            <div class="form">
                <form method="POST" class="form__form" v-on:submit.prevent="signup()">
                    <img src="../assets/black_logo.png" alt="Groupomania logo" class="form__logo">
                    <h1 class="form__title">Bonjour, bienvenue parmi nous !</h1>

                    <div class="form__box">
                        <label for="firstName" class="form__label">Votre nom</label>
                        <input type="text" name="firstName" id="firstName" value="" class="form__input" placeholder="mon-mot-de-passe" v-model="firstName">
                    </div>

                    <div class="form__box">
                        <label for="lastName" class="form__label">Votre prénom</label>
                        <input type="text" name="lastName" id="lastName" value="" class="form__input" placeholder="mon-mot-de-passe" v-model="lastName">
                    </div>

                    <div class="form__box">
                        <label for="email" class="form__label">E-mail</label>
                        <input type="email" name="email" id="email" value="" class="form__input" placeholder="exemple@hotmail.com" v-model="email">
                    </div>

                    <div class="form__box">
                        <label for="password" class="form__label">Mot de passe</label>
                        <input type="password" name="password" id="password" value="" class="form__input" placeholder="mon-mot-de-passe" v-model="password">
                    </div>
                    
                    
                    <div class="form__nav">
                        <router-link to="/Login" class="form__button form__button--inactive" >SE CONNECTER</router-link>
                        <button class="form__button" type="submit" >S'INSCRIRE</button>
                    </div>
                    
                </form>
            </div>
        </div>

        <div class="image">
            <img src="../assets/Groupomania-logo.jpg" alt="Logo et image de fond pour Groupomania" class="image__img">
        </div>
    </main>
</template>

<script>

import axios from 'axios'

export default {
    name: 'Signup',
    data(){
        return{
            firstName: "",
            lastName: "",
            email:"",
            password:""
            
        }
    },
    methods: {
        signup(){
            if (this.firstName === "" || this.lastName === "" || this.email === "" || this.password === "" ){
                alert("Veuillez renseigner tous les champs !")
            } else {
                axios.post('http://localhost:3000/api/signup',{
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                },
                {
                    headers:{ 'Content-type': 'application/json'}
                })
                .then(res => {
                    console.log(res);
                })
                .catch(error => console.log({error}));
            }
        }
    }
}
</script>

<style lang="scss">

    main{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .left{
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    // FORMULAIRE
    .form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__form{
            height: 800px;
            width: 480px;
            align-items: baseline;
        }
        &__title{
            font-size: 26px;
            margin-bottom: 54px;
        }
        &__box{
            display: flex;
            flex-direction: column;
        }
        &__label{
            display: block;
            font-size: 20px;
            font-weight: 400;
            margin-bottom: 12px;
        }
        &__input{
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
        &__nav{
            display: flex;
            justify-content: space-between;
        }
        &__button{
            width: 45%;
            height: 56px;
            background-color: #004367;
            color: white;
            border: none;
            border-radius: 10px;
            margin: 54px 0 16px; 
            cursor: pointer;
            font-size: 20px;

            &--inactive{
                display: flex;
                justify-content: center;
                align-items: center;
                text-decoration: none;
                background-color: white;
                color: #00497A;
                border: 1px solid #00497A;
            }
        }
    }

    // IMAGE

    .image{
        max-width: 50%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        &__img{
            height: auto;
        }
    }

    // SEPARATION

    .separation{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 20px;
        &__line{
            width: 25%;
            height: 1px;
            background-color: #C2C2C2;
        }
        &__text{
            font-size: 20px;
            color: #707070;
        }
    }

</style>