<template>
  <div class="footer-w footer-dark">
    <div class="footer">
      <ul class="footer-r">
        <li v-for="type in types" v-bind:key="type.id">
          <a class="title-xl"><span>{{type.type_name_en}}</span></a>
        </li>
      </ul>
      <div class="footer-l">
        <form class="footer-form">
          <label class="footer-label">Sign up for our newsletter</label>
          <div class="footer-input-w">
            <div class="footer-line"></div>
            <input class="footer-input" placeholder="Your email address" v-model="email.address">
            <a class="footer-submit" @click="submitEmail">
              <span>
                <svg>
                  <use xlink:href="#svg-arrow-right"></use>
                </svg>
              </span>
              <span>
                <svg>
                  <use xlink:href="#svg-arrow-right"></use>
                </svg>
              </span>
            </a>
          </div>
        </form>
        <div class="footer-l-address">
          <div>观东二街 59号</div>
          <div>四川省   成都市  高新区</div>
          <a>
            Get directions
            <span class="underline underline-l"></span>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-c">
      <div>
        <div>
          © Miatum 2021.
          <a href="https://weare.tm/">Thanks For TM</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MainFooter',
  data () {
    return {
      types: '',
      email: {id: '', address: ''}
    }
  },
  mounted () {
    axios
      .get('/api/type/selctAllType')
      .then(response => {
        this.types = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    submitEmail () {
      axios.post('/api/email/insertEmail', this.email)
        .then(response => {
          this.email.address = ''
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style src="../assets/css/Footer.css" scoped>
</style>
