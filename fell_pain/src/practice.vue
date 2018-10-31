<style lang="less">
</style>
<template>
  <div id="practice-id">
    

     
    <ul style="height:150px;overflow:scroll;" v-infinite-scroll="loadMore" infinite-scroll-distance="10" infinite-scroll-disabled="loading">

        <li :key="index" v-for="(item,index) in list">{{ item }}</li>
    </ul>
      
    
  </div>
</template>

<script>
export default {
  name: 'Practice',
  data() {
    return {
      list: [1, 2, 3, 4],
    };
  },

  methods: {
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 500);
    },
  },
  mounted() {},
};
</script>


