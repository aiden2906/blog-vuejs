<template>
  <div class="tag" :style="style" @click="handleChooseTag(data.name)">
    {{ data.name }}
  </div>
</template>
<script>
export default {
  props: ['data'],
  computed: {
    style() {
      const { backgroundColor, color, width, height } = this.data;
      const style = {
        backgroundColor,
        color,
      };
      if (width) {
        style.width = width;
      }
      if (height) {
        style.height = height;
        style.minWidth = '60px';
      }
      if (width || height) {
        style.display = 'flex';
        style.alignItems = 'center';
        style.justifyContent = 'center';
      }
      return style;
    },
  },
  methods: {
    handleChooseTag(name) {
      this.$emit('choose', name);
    },
  },
};
</script>

<style scoped>
.tag {
  padding: 5px 10px;
  border-radius: 3px;
  width: max-content;
  margin: 10px 3px;
  cursor: pointer;
  font-family: 'Commissioner', sans-serif;
}
</style>
