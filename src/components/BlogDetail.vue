<template>
  <div id="main">
    <div class="page">
      <header class="singleBlogHeader">
        <!-- 封面-->
        <img class="cover" :src="(blog.cover === '') ? defaultPic : blog.cover">
        <div class="blog-txt">
          <!-- 博客标签-->
          <div class="blog-tag"><a class="words">{{blog.tag_name}}</a></div>
          <!-- 博客标题-->
          <h1 class="title-xl title-xl-sp">
            <span class="words">{{blog.title}}</span>
          </h1>
        </div>
      </header>
      <!--markdown插件详情展示-->
      <mavon-editor v-model="blog.content" :subfield="false" :defaultOpen="preview" :toolbarsFlag="false" :navigation = "false" class="mavon-editor"></mavon-editor>
    </div>
  </div>
</template>
<script>
import config from '../assets/js/config'
export default {
  name: 'BlogDeatil',
  data () {
    return {
      blog: JSON.parse(sessionStorage.getItem('blog')),
      preview: 'preview',
      defaultPic: config.DefaultPic,
      videoServer: config.VideoServer
    }
  },
  mounted () {
    // 解决视口位置不在页面顶端
    let page = document.getElementsByClassName('page')
    page[0].scrollIntoView()
  }
}
</script>
<style src="../assets/css/BlogDetail.css" scoped>
</style>
