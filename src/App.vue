<template>
  <div id="app">
    <div id="bg-w"></div>
    <canvas id="g1"></canvas>
    <NavBar></NavBar>
    <SvgLibrary></SvgLibrary>
    <router-view/>
  </div>
</template>
<script>
import NavBar from './components/NavBar'
import SvgLibrary from './components/SvgLibrary'
import Featured from './components/Featured'
export default {
  name: 'App',
  components: {
    'NavBar': NavBar,
    'SvgLibrary': SvgLibrary,
    'Featured': Featured
  }
}
</script>
<style>
@import "assets/css/Body.css";
</style>
