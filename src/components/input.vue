<template lang="html">
  <div>
    <input class="input-view" style="position: relative; line-height: 0; width: 308px; font-size: 25px; margin-top: 103%; background: none; border: none; color:white;" type="text" v-model="text" placeholder="Domain or Url Here"></input>
    <div class="ping" @click="pingUrl(text)"> Ping </div> <br>
  </div>

</template>

<script>
export default {
  name: 'input',
  data () {
    return {
      text: ''
    }
  },
  props: ['pingUrl']
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);

body{
  background: #f2f2f2;
  font-family: 'Open Sans', sans-serif;
}

/*input[type="text"]{ padding: 20px 10px; line-height: 28px; }*/*/
.input-view {
position: relative;
line-height: 2;
width: 308px;
font-size: 25px;
font-weight: bold;
margin-top: 103%;
background: none;
border: none;
}
.ping {
  display: inline-block;
      background-color: #191226;
      border-bottom: 9px #1a1d22 solid;
      border-radius: 0px;
      padding: 55px;
      color: white;
      font-size: 28px;
          cursor: pointer;
}
</style>
