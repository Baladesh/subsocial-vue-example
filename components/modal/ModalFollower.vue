<template>
  <v-dialog
    v-model="openModal"
    max-width="500px"
  >
    <v-card v-if="usersIds" class="v-modal-container">
      <v-card-title>
        {{ usersIds.length }} Followers

        <v-icon medium class="close-icon" @click="onClick">
          mdi-close
        </v-icon>
      </v-card-title>

      <v-card flat>
        <v-card-text>
          <ModalInfinityScrollContainer :user-ids="usersIds" />
        </v-card-text>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
.v-modal-container {
  .v-card__title {
    display: flex;
    justify-content: space-between;
  }

  .v-card {
    overflow: hidden;
    height: 550px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: none;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.12);;
      width: 6px;
    }

    .user-item-wp {
      border-bottom: 1px solid rgba(33, 33, 33, 0.08);
    }
  }
}

</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class ModalFollower extends Vue {
  @Prop({
    type: Boolean,
    default: false
  }) isModal!: boolean

  @Prop({
    type: String
  }) spaceId!: string

  openModal: boolean = false
  usersIds: [] = []
  tabs: string[] = ['upvotes', 'downvotes']
  activeTab: string = ''

  @Watch('isModal')
  isModalHandler () {
    this.onClick()
  }

  created (): void {
    this.activeTab = this.tabs[0]

    this.$store.dispatch('accountFollower/getSpaceFollowers', this.spaceId).then((ids) => {
      this.usersIds = ids
    })
  }

  onClick (): void {
    this.openModal = !this.openModal
  }
}
</script>
