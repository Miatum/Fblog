<template>
    <div>
      <nav id="nav" class="nav">
        <div class="nav-l">
        </div>
        <div class="nav-t">
          <a id="nav-t-logo" href="/">
            <svg viewBox="0 0 58 58">
              <polygon
                points="29,30.2 26.4,21.2 19.6,21.2 19.6,36.9 23.8,36.9 23.8,25.5 27.2,36.9 30.7,36.9 34.2,25.5 34.2,36.9 38.3,36.9 38.3,21.2 31.8,21.2"
                style="opacity: 1;"></polygon>
              <path d="M29,0C13,0,0,13,0,29c0,16,13,29,29,29c16,0,29-13,29-29C58,13,45,0,29,0z M29.1,53.4c-13.4,0-24.3-10.9-24.3-24.3c0-13.4,10.9-24.3,24.3-24.3c13.4,0,24.3,10.9,24.3,24.3C53.4,42.5,42.5,53.4,29.1,53.4z"
                    style="opacity: 1;"></path>
            </svg>
          </a>
          <ul id="nav-t-l-w">
            <li v-for="(type,index) in types" :key="type.id">
              <a class="nav-line-wrap" @click="toTypeBlog(type.id)" :class="{on : (type.id === selectedTypeId)}">
                <span class="nav-t-l">
                  <span>
                    <span class="nav-t-l-no">{{'0'+(index+1)+'.'}}</span>
                  </span>
                  <span>
                    <span class="nav-t-l-name">{{type.type_name_en}}</span>
                  </span>
                  <span class="nav-line-w" style="transform: scaleX(1);">
                    <span class="nav-line nav-line-x"></span>
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div id="nav-border" class="nav">
        <div class="nav-t">
          <div id="nav-border-t-t"></div>
          <div id="nav-border-t-b"></div>
          <div id="nav-border-t-l"></div>
        </div>
        <div class="nav-l">
          <div id="nav-border-l-l"></div>
          <div id="nav-border-l-r"></div>
          <div id="nav-border-l-b"></div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'NavBar',
  data () {
    return {
      types: '',
      svgs: [
        '15.8 6 15.3 5.5 15.3 5.5 9.9 0.1 9.2 0.8 13.9 5.5 0.5 5.5 0.5 6.5 13.9 6.5 9.2 11.2 9.9 11.9 15.3 6.5 15.3 6.5',
        '13.3 0.7 12.9 0.3 8 5.3 3.1 0.3 2.3 1.1 7.3 6 2.3 10.9 3.1 11.7 8 6.7 12.9 11.7 13.7 10.9 8.7 6 13.7 1.1'
      ],
      isContact: 0,
      selectedTypeId: -1
    }
  },
  mounted () {
    axios.get('/api/type/selctAllType')
      .then(response => {
        this.types = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    toTypeBlog: function (typeId) {
      this.selectedTypeId = typeId
      this.$router.push({
        name: 'TypeBlog',
        params: {
          typeId: typeId
        }
      })
    },
    toContact: function () {
      if (this.isContact === 0) {
        this.$router.push({
          name: 'ContactOption'
        })
        this.isContact = 1
      } else {
        this.isContact = 0
        this.$router.go(-1)
      }
    },
    videoPlay: function () {
      this.$router.push({
        name: 'VideoPlay'
      })
    }
  }
}
</script>

<style src="../assets/css/NavBar.css" scoped>
</style>
