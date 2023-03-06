<template>
	<article class="post">
    <header class="post-header">
      <h1 class="post-title">
        <a class="post-link" :href="item.link">{{ item.title }}</a>
      </h1>

      <div class="post-meta">
        <span class="post-time">
          {{ formateDate(item.date) }}
        </span>
      </div>
    </header>

    <div class="post-content">
      <p class="post-summary" v-html="item.summary" v-if="item.summary" />
      <div class="read-more">
        <a :href="item.link" class="read-more-link">Read more..</a>
      </div>
    </div>
  </article>
</template>

<script>
export default {
	props: {
		item: Object
	},
	setup () {
		const formateDate = date => new Date(date).toLocaleDateString()
		return {
			formateDate
		}
	}
}
</script>

<style scoped>
.post {
	padding: 1.5em 0;
	line-height: 1.5;
	font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post + .post {
/*  border-top: 1px solid var(--vp-c-divider);*/
}

.post-header {
	margin-bottom: 20px
}

.post-link {
	display: inline-block;
  vertical-align: middle;
  transform: translateZ(0);
  backface-visibility: hidden;
  box-shadow: 0 0 1px transparent;
  position: relative;
  overflow: hidden;
}

.post-link::before {
	content: '';
  position: absolute;
  z-index: -1;
  height: 2px;
  bottom: 0;
  left: 51%;
  right: 51%;
  background: #c05b4d;
  transition-duration: 0.2s;
  transition-property: right, left;
  transition-timing-function: ease-out
}

.post-link:hover {
	outline: 0;
}

.post-link:hover::before {
	left: 0;
	right: 0;
}

.post-time {
	font-size: 15px;
  color: var(--vp-c-text-2);
}

.post-summary {
  font-size: 13px;
}

.read-more-link {
	color: var(--vp-c-brand);
  font-size: 1.1em;
  font-family: Athelas, STHeiti, Microsoft Yahei, serif;
}
</style>