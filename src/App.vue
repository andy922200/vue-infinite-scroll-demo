<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Scroll-view>
      <template slot-scope="{}">
        <my-component v-for="i in items" :source="i.url" :key="i.id"></my-component>
      </template>
    </Scroll-view>
  </div>
</template>

<script>
import ComponentA from '@/components/ComponentA.vue'
import axios from 'axios'
import { $scrollview } from 'vue-scrollview'

export default {
  name: 'App',
  components: {
    'my-component': ComponentA
  },
  data () {
    return {
      page: 1,
      items: [],
      loading: false
    }
  },
  async created () {
    this.fetchMore()
  },
  mounted () {
    $scrollview.onLastEntered = () => {
      console.log('trigger scroll')
      console.log('current page', this.page)
      if (this.page < 3) {
        this.page++
      }
      console.log('after page', this.page)
    } // last component entered, increment the page
  },
  watch: {
    page: {
      handler: async function () {
        try {
          // get some more items every time the page changes
          this.fetchMore()
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  methods: {
    async fetchMore () {
      try {
        this.loading = true
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/albums/${this.page}/photos?_limit=5`)
        this.items = this.items.concat(data)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
