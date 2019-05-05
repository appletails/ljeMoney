<template>
  <div id="app">
    <Heads :title="$route.meta.title"  v-if="$route.name != '404'"/>
    <transition :name="fade">
      <router-view />
    </transition>
    <Footer v-if="$route.name == 'home' || $route.name == 'koudai'" />
  </div>
</template>

<script>
import Heads from '@/components/Head'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    Heads,
    Footer
  },
  data() {
    return {
      fade: 'fadeIn',
      title: '恩の宝库'
    }
  },
  watch: {
    $route(to, from) {
      this.fade = to.meta.index < from.meta.index ? "fadeOut" : "fadeIn"
    }
  }
}
</script>

<style>

</style>
