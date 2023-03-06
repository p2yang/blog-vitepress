<script>
import { ref, computed, onBeforeMount } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRouter } from 'vitepress'
import docsList from './data/docs.json'
import Post from './Post.vue'

const { Layout } = DefaultTheme
const formateDate = date => new Date(date).toLocaleDateString()

export default {
  components: {
    Layout,
    Post
  },
  setup () {
    const router = useRouter()
    const page = ref(1)
    const pageSize = 10
    const total = docsList.length
    const maxPage = Math.ceil(total / pageSize)
    const postList = computed(() => docsList.slice((page.value - 1) * pageSize, page.value * pageSize))

    const scrollToTop = () => {
      document.scrollingElement.scroll({ top: 0, behavior: 'smooth' })
      if (page.value <= 1) {
        router.go('/')
      } else {
        router.go('/?page=' + page.value)
      }
    }

    const handlePrev = () => {
      page.value--
      scrollToTop()
    }

    const handleNext = () => {
      page.value++
      scrollToTop()
    }

    onBeforeMount(() => {
      const matchedPage = location.search.match(/page=(\d+)/i)
      if (matchedPage) {
        const defaultPage = +matchedPage[1]
        if (defaultPage > 0 && defaultPage <= maxPage) {
          page.value = defaultPage
        }
      }
    })

    return {
      formateDate,
      page,
      pageSize,
      maxPage,
      total,
      postList,
      handlePrev,
      handleNext
    }
  }
}

</script>

<template>
  <div class="home">
    <section class="posts">
      <Post v-for="item in postList" :key="item.link" :item="item" />
    </section>
    <section class="pages">
      <div><button v-if="page > 1" class="btn-page" @click="handlePrev">Prev</button></div>
      <div><button v-if="total > pageSize && page < maxPage" class="btn-page" @click="handleNext">Next</button></div>
    </section>
	</div>
</template>

<style scoped>
.home {
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
}

.pages {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-page {
  margin: 0 10px;
}

.btn-page:hover {
  opacity: 0.6;
}
</style>