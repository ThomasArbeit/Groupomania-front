<template>
    <main>
        <div class="left">
            <div class="form">
                <form method="post" class="login__form" v-on:submit.prevent="login()">
                    <img src="../assets/black_logo.png" alt="Groupomania logo" class="login__logo">
                    <h1 class="login__title">Bonjour, ravi de vous revoir !</h1>
                    <div class="login__box">
                        <label for="email" class="login__label">E-mail</label>
                        <input type="email" name="email" id="email" value="" class="login__input" v-model="email" placeholder="exemple@hotmail.com" >
                    </div>
                    <div class="login__box">
                        <label for="password" class="login__label">Mot de passe</label>
                        <input type="password" name="password" id="password" value="" class="login__input" v-model="password" placeholder="mon-mot-de-passe" >
                    </div>
                    <button class="login__button" type="submit">SE CONNECTER</button>
                    <div class="separation">
                        <div class="separation__line"></div>
                        <p class="separation__text">ou</p>
                        <div class="separation__line"></div>
                    </div>
                    <router-link class="login__button login__button--inactive" to="/Signup">S'INSCRIRE</router-link>
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
    name: 'Login',
    data(){
        return{
            email:"",
            password:"",
        }
    },
    methods: {
        login(){
            if (this.email === "" || this.password === ""){
                alert("Veuillez entrer votre email ainsi que votre mot de passe !")
            } else {
                axios.post('http://localhost:3000/api/login',{
                    email: this.email,
                    password: this.password
                },
                {
                    headers:{ 'Content-type': 'application/json'}
                })
                .then(res => {
                    sessionStorage.setItem('usertoken', res.data.token);
                    sessionStorage.setItem('userId', parseInt(res.data.userId));
                    window.location.href="/#/Home";
                    
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
    .login{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__form{
            height: 640px;
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
        &__button{
            width: 100%;
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
                margin-top: 0;
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