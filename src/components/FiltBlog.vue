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
    <NavFilter :tags="tags" :tag="tag" :years="years" :year="year" @tagFilter="tagFilter" @yearFilter="yearFilter"></NavFilter>
  </div>
</template>

<script>
import NavFilter from './NavFilter'
import config from '../assets/js/config'
export default {
  name: 'FiltBlog',
  components: {NavFilter},
  data () {
    return {
      allBlogs: this.$route.params.blogs, // 初始化时传入的所有博客
      blogs: [], // 符合筛选条件的博客，即展示的结果
      tags: '', // 传给NavFilter的tag列表
      tag: this.$route.params.tag, // 初始化时传入被点击的tag
      years: '', // 传给NavFilter的year列表
      year: this.$route.params.year, // 初始化时传入被点击的year
      baseImageUrl: config.PicServer,
      defaultPic: config.DefaultPic
    }
  },
  mounted () {
    // 初始化，第一次进入FiltBlog，如果是点击NavFilter中的tag列表，则运行以下一段代码
    if (this.tag !== undefined) {
      if (this.tag === 'ALL') {
        this.blogs = this.allBlogs
      } else {
        for (let i = 0; i < this.allBlogs.length; i++) {
          if (this.tag === this.allBlogs[i].tag_name) {
            this.blogs.push(this.allBlogs[i])
          }
        }
      }
    }
    // 初始化，第一次进入FiltBlog，如果是点击NavFilter中的year列表，则运行以下一段代码
    if (this.year !== undefined) {
      if (this.year === 'ALL') {
        this.blogs = this.allBlogs
      } else {
        for (let i = 0; i < this.allBlogs.length; i++) {
          if (this.year === this.allBlogs[i].date.substring(0, 4)) {
            this.blogs.push(this.allBlogs[i])
          }
        }
      }
    }
    // 当前路由组件中的博客数组涉及的标签和日期(用Set去重),提供给NavFilter
    this.tags = new Set()
    this.years = new Set()
    for (let i = 0; i < this.allBlogs.length; i++) {
      let tag = this.allBlogs[i].tag_name
      this.tags.add(tag)
      let year = this.allBlogs[i].date.substring(0, 4)
      this.years.add(year)
    }
  },
  methods: {
    // 路由跳转，查看博客
    blogDetail: function (blog) {
      sessionStorage.setItem('blog', JSON.stringify(blog))
      this.$router.push({
        name: 'BlogDetail',
        params: {
          blog: blog
        }
      })
    },
    // 点击tag列表筛选，清空blogs,从allBlogs里匹配到和点击的tag文本相等的blog,push给blogs
    tagFilter: function (tag) {
      this.blogs = []
      if (tag === 'ALL') {
        this.blogs = this.allBlogs
      } else {
        for (let i = 0; i < this.allBlogs.length; i++) {
          if (tag === this.allBlogs[i].tag_name) {
            this.blogs.push(this.allBlogs[i])
          }
        }
      }
    },
    // 点击year列表筛选，清空blogs,从allBlogs里匹配到和点击的year文本相等的blog,push给blogs
    yearFilter: function (year) {
      this.blogs = []
      if (year === 'ALL') {
        this.blogs = this.allBlogs
      } else {
        for (let i = 0; i < this.allBlogs.length; i++) {
          if (year === this.allBlogs[i].date.substring(0, 4)) {
            this.blogs.push(this.allBlogs[i])
          }
        }
      }
    }
  }
}
</script>
<style src="../assets/css/FiltBlog.css" scoped>
</style>
