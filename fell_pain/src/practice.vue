<style lang="less">
</style>
<template>
  <div id="practice-id">
    

     
    <ul v-infinite-scroll="loadMore" infinite-scroll-distance="10" infinite-scroll-disbaled="loading">

        </ul>
      
    
  </div>
</template>

<script>
export default {
  name: 'Practice',
  data() {
    return {};
  },

  methods: {
    loadMore() {},
  },
  mounted() {},
};
</script>


