<template>
  <div id="app">
    <div id="nav">
      <a @click="homeLinkClicked">Home</a> |
      <a @click="aboutLinkClicked">About</a>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
export default {
  name:"App",
  methods: {
    homeLinkClicked() {
      this.$router.push({
        path: "/",
      });
    },
    aboutLinkClicked() {
      this.$router.push({
        path: "/about",
      });
    },
  },
};
</script>
