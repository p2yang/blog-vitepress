<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'
import docsList from './data/docs.json'
import Post from './Post.vue'

const { Layout } = DefaultTheme
const formateDate = date => new Date(date).toLocaleDateString()

</script>

<template>
  <div class="home">
    <Post v-for="item in docsList" :key="item.link" :item="item" />
	</div>
</template>

<style scoped>
.home {
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
}
</style>