<template>
  <div>
    <SpaceEdit v-if="havePermission" :is-edit="isEdit" :profile-item="profile" :is-profile="true" />
    <div v-if="!havePermission && profile" class="error">
      You do not have permission to edit this profile
    </div>
    <BounceSpinner v-if="!havePermission && !profile" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ProfileItemModel } from '~/models/profile/profile-item.model'

@Component
export default class ProfilePage extends Vue {
  isEdit: boolean = false
  profile: ProfileItemModel | null = null
  userId: string | null = null
  havePermission: boolean = false

  created () {
    this.userId = this.$route.query.id as string

    if (this.$store.state.loading.isLoading) {
      this.profile = this.userId ? this.$store.getters['profiles/selectProfileData'](this.userId) : null
      this.isUserCanEdit()
    } else {
      const unsubscribe = this.$store.subscribe((mutation) => {
        if (mutation.type === 'profiles/SET_CURRENT_USER' && this.profile === null && this.userId) {
          this.$store.dispatch('profiles/getProfile', { id: this.userId }).then(() => {
            this.getAccount().then((data) => {
              this.profile = data
              this.profile?.name ? this.isEdit = true : this.isEdit = false
              this.isUserCanEdit()
              unsubscribe()
            })
          })
        }
      })
    }

    if (this.$route.query.id) {
      this.isEdit = true
    } else {
      this.havePermission = !this.havePermission
    }
  }

  isUserCanEdit () {
    const user = this.$store.state.profiles.currentUser
    if (user.id === this.profile?.id) {
      this.havePermission = !this.havePermission
    }
  }

  async getAccount () {
    return await this.$store.getters['profiles/selectProfileData'](this.userId)
  }
}
</script>
