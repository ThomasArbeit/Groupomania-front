
<template>
	<div id="app">
    <router-view/>
  </div>

</template>

<script>
export default {
  name: 'App',
  beforeMount(){
    const token = sessionStorage.getItem('usertoken');
    const pageurl = window.location.href;
    const url = pageurl.split('#')[1];
    if((url != "/Login" && url != "/Signup") && (token == null)){
      window.location = "http://localhost:8080/#/Login";
    }
  }
}
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: Montserrat, Avenir, Helvetica, Arial, sans-serif;
}
#app {
  font-family: Montserrat, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

