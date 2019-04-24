<template>
  <div id="app" class="container level">
    <main class="is-vcentered hero">
      <div class="hero-body">
        <div class="container">
          <br />
          <router-link to="/">Home</router-link> |
          <router-link to="/reports">Reports</router-link>
          <h1 class="title">
            Expenses?
          </h1>
          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  /*font-family: 'Roboto', sans-serif;*/
  /*font-family: 'Open Sans', sans-serif;*/
  font-family: 'Ubuntu', sans-serif;
  /*font-family: 'Poppins', sans-serif;*/
  /*font-family: 'Baloo Chettan', cursive;*/
  /*font-family: 'Indie Flower', cursive;*/
}
</style>
