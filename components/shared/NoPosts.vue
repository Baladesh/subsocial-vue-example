<template>
  <div class="no-posts">
    No posts yet
  </div>
</template>

<style scoped lang="scss">
.no-posts {
  color: $color_font_normal;
  line-height: 125%;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 34px $space_normal;
  justify-content: center;
  background-color: $color_white;
  box-shadow: $box_shadow_card;
  border-radius: $border_small;
  margin-top: $space_normal;
  font-size: $font_normal;
}
</style>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NoPosts extends Vue {

}
</script>
