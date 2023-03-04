<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const formateDate = date => new Date(date).toLocaleDateString()

</script>

<template>
  <Layout>
    <template #doc-before>
      <h1 class="content-title">{{ $frontmatter.title }}</h1>

      <p class="content-meta">
      	<span>{{ formateDate($frontmatter.date) }}</span>
      </p>
    </template>
  </Layout>
</template>

<style scoped>
.content-title {
	font-size: 24px;
}

.content-meta {
	margin: 5px 0;
	font-size: 12px;
	color: #999;
}
</style>