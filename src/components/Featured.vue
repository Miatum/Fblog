<template>
    <div id="main">
      <div class="page">
        <FeaturedHeader></FeaturedHeader>
        <ul class="work-w" id="ul-1">
          <li class="work" v-for="(blog, index) in blogs" :key="index" :class="randomClass(index)">
            <div v-if="index % 10 === 0">
              <a class="work-img" @click="blogDetail(blog)">
                <img :src="(blog.cover === '') ? defaultPic : blog.cover">
              </a>
              <div class="work-txt">
                <div class="line line-l"></div>
                <h2 class="work-tag">
                  <a @click="blogDetail(blog)">{{blog.tag_name}}</a>
                </h2>
                <a class="work-p" @click="blogDetail(blog)">
                  <span class="work-p-title">{{blog.title}}</span>
                  <span class="work-p-intro">{{blog.intro}}</span>
                </a>
                <a class="work-a underline-w" @click="blogDetail(blog)">
                  Read this one
                  <span class="underline underline-l"></span>
                </a>
                <div class="work-txt-cover"></div>
              </div>
            </div>
            <div v-else>
              <a class="work-img" @click="blogDetail(blog)">
                <img :src="(blog.cover === '') ? defaultPic : blog.cover">
              </a>
              <div class="work-txt" @click="blogDetail(blog)">
                <h2 class="work-title">
                  <a>{{blog.title}}</a>
                </h2>
                <a class="work-p">
                  <span>{{blog.intro}}</span>
                </a>
                <a class="work-a underline-w" @click="blogDetail(blog)">
                  Read this one
                  <span class="underline underline-l"></span>
                </a>
                <div class="work-txt-cover"></div>
              </div>
            </div>
          </li>
        </ul>
        <Footer></Footer>
      </div>
      <NavFilter class="filter" :tags="tags" :years="years" @tagFilter="tagFilter" @yearFilter="yearFilter"></NavFilter>
    </div>
</template>

<script>
import axios from 'axios'
import FeaturedHeader from '../components/FeaturedHeader'
import NavFilter from './NavFilter'
import Footer from './Footer'
import config from '../assets/js/config'
let sml = ['work-s-s', 'work-s-l']
export default {
  name: 'Featured',
  components: {
    'Footer': Footer,
    'NavFilter': NavFilter,
    'FeaturedHeader': FeaturedHeader
  },
  data () {
    return {
      blogs: '',
      blogs_copy: '',
      tags: '',
      years: '',
      baseImageUrl: config.PicServer,
      defaultPic: config.DefaultPic
    }
  },
  mounted () {
    axios.get('/api/blog/selectAllBlog').then(response => {
      this.blogs = response.data
      this.blogs_copy = this.blogs
      this.tags = new Set()
      this.years = new Set()
      for (let i = 0; i < this.blogs.length; i++) {
        let tag = this.blogs[i].tag_name
        this.tags.add(tag)
        let year = this.blogs[i].date.substring(0, 4)
        this.years.add(year)
      }
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    // 随机样式
    randomClass: function (index) {
      let className = ''
      if (index === 0) {
        className = 'work-l work-l-r'
      } else if (index % 10 === 0) {
        className = 'work-l work-l-l'
      } else if (index % 10 === 1 || index % 10 === 4 || index % 10 === 7) {
        className = 'work-s work-s-m'
      } else if (index % 10 === 2 || index % 10 === 5 || index % 10 === 8) {
        let smlIndex = Math.floor(Math.random() * sml.length)
        className = 'work-s ' + sml[smlIndex]
        sml.splice(smlIndex, 1)
      } else {
        className = sml[0]
        sml = ['work-s-s', 'work-s-l']
      }
      return className
    },
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
    }
  }
}
</script>
<style src="../assets/css/Featured.css" scoped>
</style>
