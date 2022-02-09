<template>
  <div class="page">
    <ul class="work-w">
      <li v-for="blog in blogs" :key="blog.id" class="work work-s work-s-s">
        <a class="work-img" @click="blogDetail(blog)">
          <img :src="(blog.cover === '') ? defaultPic : blog.cover">
        </a>
        <div class="work-txt" @click="blogDetail(blog)">
          <h2>
            <a>{{blog.title}}</a>
          </h2>
          <a>
            <span>{{blog.intro}}</span>
          </a>
          <a class="work-a underline-w" @click="blogDetail(blog)">
            Read this one
            <span class="underline underline-l"></span>
          </a>
        </div>
      </li>
    </ul>
    <NavFilter :tags="tags" :years="years" @tagFilter="tagFilter" @yearFilter="yearFilter"></NavFilter>
  </div>
</template>

<script>
import axios from 'axios'
import NavFilter from './NavFilter'
import config from '../assets/js/config'
export default {
  name: 'TypeBlog',
  components: {NavFilter},
  data () {
    return {
      typeId: '',
      blogs: '',
      tags: '',
      years: '',
      defaultPic: config.DefaultPic
    }
  },
  mounted () {
    this.fetchBlogs()
  },
  watch: {
    '$route' (to, from) {
      this.fetchBlogs()
    }
  },
  methods: {
    blogDetail: function (blog) {
      sessionStorage.setItem('blog', JSON.stringify(blog))
      this.$router.push({
        name: 'BlogDetail',
        params: {
          blog: blog
        }
      })
    },
    tagFilter: function (tag) {
      this.$router.push({
        name: 'FiltBlog',
        params: {
          blogs: this.blogs,
          tag: tag
        }
      })
    },
    yearFilter: function (year) {
      this.$router.push({
        name: 'FiltBlog',
        params: {
          blogs: this.blogs,
          year: year
        }
      })
    },
    fetchBlogs: function () {
      axios.get('/api/blog/selectPublicBlogByTypeId', {
        params: {
          typeId: this.$route.params.typeId
        }
      })
        .then(response => {
          this.blogs = response.data
          this.tags = new Set()
          this.years = new Set()
          for (let i = 0; i < this.blogs.length; i++) {
            let tag = this.blogs[i].tag_name
            this.tags.add(tag)
            let year = this.blogs[i].date.substring(0, 4)
            this.years.add(year)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style src="../assets/css/TypeBlog.css" scoped>
</style>
