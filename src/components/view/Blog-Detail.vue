<template>
  <div :style="{ width: '100%', padding: '60px' }" class="markdown-body">
    <vue-markdown :source="article" :html="true"></vue-markdown>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown';
export default {
  components: {
    VueMarkdown,
  },
  data() {
    return {
      id: '',
      article: '',
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.article = require(`../../markdown/${this.id}.md`);
  },
};
</script>

<style scoped>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
