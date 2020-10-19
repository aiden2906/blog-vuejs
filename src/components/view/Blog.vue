<template>
  <div>
    <el-main>
      <el-row v-for="(article, index) in articles" :key="index" class="card">
        <div @click="chooseArticle(article.id)">
          <el-col :span="20">
            <el-row class="title">{{ article.title }}</el-row>
            <el-row class="content">{{ article.short_content }}</el-row>
          </el-col>
          <el-col :span="4">
            <el-row>{{ article.created_at }}</el-row>
            <el-row><Tag :data="{ ...getTagByArticle(article), height: '40px' }"></Tag></el-row>
          </el-col>
        </div>
      </el-row>
    </el-main>
  </div>
</template>
<script>
import Tag from '../UIComponent/Tag.vue';
import tags from '../../mockup/tag.json';
import articles from '../../mockup/article.json';
export default {
  components: {
    Tag,
  },
  data() {
    return {
      tags,
      articles,
    };
  },
  mounted() {
    console.log('---- Params: ',this.$route.params);
  },
  methods: {
    getTagByArticle(article) {
      return this.tags.find((t) => t.name === article.tag);
    },
    chooseArticle(id) {
      this.$router.push(`/${id}`);
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 30px;
  padding-top: 5px;
  padding-bottom: 10px;
  line-height: 1.2;
  font-weight: 900;
  color: #424242;
}

.content {
  font-size: 1.2rem;
  color: #424242;
}

.card {
  padding: 30px;
  font-family: 'Commissioner', sans-serif;
  border-bottom: 2px dotted black;
  cursor: pointer;

}
</style>
