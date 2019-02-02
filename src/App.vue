<template>
  <div id="app">
    <Heads :title="$route.meta.title" />
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
      title: '恩の金库'
    }
  },
  created() {
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
