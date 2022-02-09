<template>
    <div>
      <ul class="nav-filter">
        <li>
          <div class="nav-filter-title">
            <div>Tag</div>
            <div>
              <svg>
                <use xlink:href="#svg-filters-plus"></use>
              </svg>
            </div>
          </div>
          <ul class="nav-filter-list">
            <li class="nav-filter-li" v-for="(tag,index) in tagsArray" :key="tag.id" @click="tagFilter(tag, index)" v-bind:class="{on : index === tagOn}"><a>{{tag}}</a></li>
          </ul>
        </li>
        <li>
          <div class="nav-filter-title">
            <div>Year</div>
            <div>
              <svg>
                <use xlink:href="#svg-filters-plus"></use>
              </svg>
            </div>
          </div>
          <ul class="nav-filter-list">
            <li class="nav-filter-li" v-for="(year,index) in yearsArray" :key="year" @click="yearFilter(year, index)" v-bind:class="{on : index === yearOn}"><a>{{year}}</a></li>
          </ul>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
  name: 'NavFilter',
  props: [
    'tags',
    'tag',
    'years',
    'year'
  ],
  data () {
    return {
      tagsArray: [],
      yearsArray: [],
      tagOn: 0,
      yearOn: 0
    }
  },
  mounted () {
  },
  methods: {
    tagFilter: function (tag, index) {
      this.tagOn = index
      this.yearOn = 0
      this.$emit('tagFilter', tag)
    },
    yearFilter: function (year, index) {
      this.yearOn = index
      this.tagOn = 0
      this.$emit('yearFilter', year)
    }
  },
  watch: {
    tags (newValue, oldValue) {
      this.tagsArray = ['ALL'].concat(Array.from(newValue))
      for (let i = 0; i < this.tagsArray.length; i++) {
        if (this.tag === this.tagsArray[i]) {
          this.tagOn = i
        }
      }
    },
    years (newValue, oldValue) {
      this.yearsArray = ['ALL'].concat(Array.from(newValue))
      for (let i = 0; i < this.yearsArray.length; i++) {
        if (this.year === this.yearsArray[i]) {
          this.yearOn = i
        }
      }
    }
  }
}
</script>
<style src="../assets/css/NavFilter.css" scoped>
</style>
