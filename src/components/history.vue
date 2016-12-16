<template lang="html">
  <div>
    <h1 style="color: white;">HISTORY</h1> <h1 style="color: red;">PING</h1> <br> <hr>
    <br>
    <div v-for="history in historyPing">
      <span style="color: white; font-size: 23px;"> {{ history.host }}</span>
      <span style="color: white;"> ping <span style="font-size: 50px; color: red;">{{ history.time }}  </span>m/s</span> <br>
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
