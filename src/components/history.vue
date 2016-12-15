<template lang="html">
  <div>
    <h1 style="color: white;">historyPing</h1>
    <br>
    <div v-for="history in historyPing">
      <span style="color: white;"> {{ history.host }}</span>
      <span style="color: white;"> ping {{ history.time }}  m/s</span> <br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'history',
  props: ['historyPing']
}
</script>

<style lang="css">
</style>
