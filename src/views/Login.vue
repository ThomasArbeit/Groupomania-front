<template>
    <main>
        <div class="left">
            <div class="form">
                <form method="post" class="form__form" v-on:submit.prevent="login()">
                    <img src="../assets/black_logo.png" alt="Groupomania logo" class="form__logo">
                    <h1 class="form__title">Bonjour, ravi de vous revoir !</h1>
                    
                    <div class="form__box">
                        <span class="form__error form__error--high" v-if="responseError && submited">Votre E-mail ou votre mot de passe est incorrect</span>
                        <label for="email" class="form__label">E-mail</label>
                        <input type="email" name="email" id="email" value="" class="form__input" v-model="email" placeholder="exemple@hotmail.com" v-on:focus="deActivate">
                        <span class="form__error" v-if="((!$v.email.required || !$v.email.email) && $v.email.$dirty) && submited">Veuillez rentrer un email valide</span>
                    </div>

                    <div class="form__box">
                        <label for="password" class="form__label">Mot de passe</label>
                        <input type="password" name="password" id="password" value="" class="form__input" v-model="password" placeholder="mon-mot-de-passe" v-on:focus="deActivate">
                        <span class="form__error" v-if="(!$v.password.required && $v.password.$dirty) && submited" >Veuillez rentrer un mot de passe </span>
                        <span class="form__error" v-if="(!$v.password.minLength || !$v.password.maxLength) && $v.password.$dirty">Le mot de passe doit être entre {{ $v.password.$params.minLength.min }} et {{ $v.password.$params.maxLength.max }} </span>
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
import { required, minLength, maxLength, email} from 'vuelidate/lib/validators'

export default {
    name: 'Login',
    data(){
        return{
            email:"",
            password:"",
            submited: false,
            responseError: false
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(18)
        }
    },
    methods: {
        deActivate() {
            this.responseError = false
        },
        login(){
            this.submited = true;
            this.$v.$touch();
            if (!this.$v.$invalid){
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
                    this.$store.commit("setAuthentication", true);
                    this.$router.push('/Home');
                    console.log(window.isSignedIn);
                    
                })
                .catch(error => {
                    console.log({error});
                    this.responseError = true;
                })
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
            position: relative;
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