<template lang="pug">
  div(id="app")
    router-view
</template>

<script>

export default {
  name: 'App',
  data: () => ({
  })
}
</script>
<style lang="scss">
html, body {
  margin: 0px;
  padding: 0px;
  height: 100%;
}
#app {
  height: 100%;
  color: black;
}
</style>
