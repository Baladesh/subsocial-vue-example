<template>
  <section class="edit-space-container">
    <v-card>
      <h2 class="edit-space-title">
        {{ isEdit ? 'Edit' : 'New' }} {{ isProfile ? 'profile' : 'space' }}
      </h2>

      <ImageLoader :avatar="avatar" :type="'round'" @avatar="updateImageCID" />
      <ValidationObserver ref="form" v-slot="{ handleSubmit, handleReset }">
        <form @submit.prevent="handleSubmit(submit)" @reset.prevent="handleReset(clear)">
          <div class="form-row">
            <ValidationProvider v-slot="{ errors }" name="Space name" rules="required">
              <v-text-field
                v-model="name"
                outlined
                :label="'* ' + (isProfile ? 'Profile' : 'Space') + ' name'"
                required
                hide-details="auto"
                :messages="errors[0]"
              />
            </ValidationProvider>
          </div>
          <div class="form-row">
            <mde-editor :show-editor="true" :text="description" :height="'200px'" @contentUpdate="updateDescription" />
          </div>
          <div v-if="!isProfile" class="form-row">
            <v-combobox
              v-model="selectTags"
              multiple
              outlined
              label="Tags"
              append-icon
              chips
              deletable-chips
              class="tag-input"
              :search-input.sync="search"
              placeholder="Press 'Enter' or 'Tab' key to add tags"
              hide-details="auto"
              @keyup.tab="updateTags"
              @paste="updateTags"
            />
          </div>
        </form>
      </ValidationObserver>

      <div class="button-wp">
        <v-btn class="button-third-color" @click="clear">
          {{ isEdit ? 'Cancel' : 'Reset' }}
        </v-btn>
        <v-btn class="button-main-color" @click="submit">
          {{ isEdit ? 'Save' : 'Create' }}
        </v-btn>
      </div>
    </v-card>
  </section>
</template>

<style lang="scss">
.preview {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.edit-space-container {
  max-width: 628px;
  margin: $space_large auto 0;
  min-height: 60vh;
  padding-bottom: $space_normal;

  .v-card {
    padding: $space_huge $space_big $space_big;
  }

  .edit-space-title {
    font-size: $font_large;
    margin: 0 0 15px;
  }

  .v-text-field__details {
    padding: 0!important;
  }

  .form-row {
    width: 100%;
    margin-bottom: $space_big;

    .editor-toolbar, .CodeMirror {
      border-color: $color_border;
    }

    .CodeMirror-placeholder {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.6);
      opacity: 1;
    }

    .v-text-field--outlined fieldset {
      border-color: $color_border;
    }

    .v-text-field--outlined.v-input--is-focused fieldset, .v-text-field--outlined.v-input--has-state fieldset {
      border-width: 1px;
      border-color: $color_font_normal;
    }
  }

  .v-select--chips {
    .v-chip {
      &__content {
        color: $main_text_color;
      }

      .tag-input {
        .v-label--active {
          left: 6px !important;
        }
      }

      .v-icon:before {
        content: "\F0156" !important;
      }
    }

    .v-input__slot {
      margin-bottom: $space_big;
    }

    .v-text-field__details {
      display: none;
    }
  }

  .button-wp {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: $space_normal;
    margin-top: 5px;

    .button-main-color {
      background-color: $color_primary;
    }

    .button-third-color {
      background-color: $color_white
    }

    button {
      min-width: 110px !important;
      font-size: $font_normal;
      border: 1px solid #E0E0E0;
      border-color: #E0E0E0 !important;
      border-radius: $border_small;
      box-shadow: none;
      text-transform: capitalize;

      &:last-child {
        border: none;
        color: $color_white;
      }
    }

    @media (max-width: 768px) {
      & {
        justify-content: space-between;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import { SubmittableResult } from '@polkadot/api'
import { IpfsContent, OptionId, OptionText } from '@subsocial/types/substrate/classes'
import { IpfsCid } from '@subsocial/types'
import { environment } from '~/environments/environment'
import { SpaceListItemData } from '~/models/space/space-list-item.model'
import TransactionButton from '~/components/abstract/TransactionButton.vue'
import { PALLETS, METHODS } from '~/constants/query'
import TransactionService from '~/services/transaction.service'
import { ProfileItemModel } from '~/models/profile/profile-item.model'
import { getNewIdFromEvent } from '~/utils/utils'

extend('required', required)
extend('required', {
  ...required,
  message: 'This field is required'
})

const transactionService = new TransactionService()

@Component({
  components: { ValidationProvider, ValidationObserver }
})
export default class SpaceEdit extends TransactionButton {
  $refs!: {
    form: InstanceType<typeof ValidationObserver>;
  };

  @Prop({
    type: Boolean,
    default: false
  }) isEdit!: boolean

  @Prop({
    type: Boolean,
    default: false
  }) isProfile!: boolean

  @Prop({
    type: Object
  }) spaceItem!: SpaceListItemData

  @Prop({
    type: Object
  }) profileItem!: ProfileItemModel

  space: SpaceListItemData | null = null
  profile: ProfileItemModel | null = null
  name: string = ''
  description: string = ''
  avatar: string = ''
  selectTags: string[] = []
  search: string = ''
  url: string = environment.ipfsUrl

  created () {
    if (this.spaceItem || this.profileItem) {
      this.insertDataInForm()
    }
  }

  insertDataInForm (): void {
    this.name = this.isProfile ? this.profileItem?.name || '' : this.spaceItem.content.name
    this.description = this.isProfile ? this.profileItem?.summary || '' : this.spaceItem.content.summary
    this.selectTags = this.isProfile ? [] : this.spaceItem.content.tags
    this.avatar = this.isProfile ? this.profileItem?.avatar || '' : this.spaceItem.content.image ? this.spaceItem.content.image : ''
  }

  updateImageCID (cid: string): void {
    this.avatar = cid
  }

  updateDescription (content: string): void {
    this.description = content
  }

  updateTags (): void {
    this.$nextTick(() => {
      if (this.search) { this.selectTags.push(...this.search.split(',')) }
      this.$nextTick(() => {
        this.search = ''
      })
    })
  }

  submit () {
    this.$refs.form.validate().then((result) => {
      if (result) {
        this.OnCreateOrUpdateSpace()
      }
    })
  }

  clear () {
    this.$refs.form.reset()
    this.name = ''
    this.description = ''
    this.selectTags = []
  }

  onFailed (result: SubmittableResult | null): void {
  }

  onSuccess (result: SubmittableResult): void {
    const id = this.spaceItem?.struct?.id || getNewIdFromEvent(result)?.toString()
    if (id) {
      this.$store.dispatch('space/getSpacesByIds', [id]).then(() => {
        this.$router.push('/' + id)
      })
    }
  }

  validate (): boolean {
    return true
  }

  async OnCreateOrUpdateSpace () {
    const pallet = this.isProfile ? PALLETS.profiles : PALLETS.spaces
    const method = this.getMethods()

    const cid: IpfsCid | undefined = await transactionService.saveIpfsContent({
      about: this.description,
      image: this.avatar,
      name: this.name,
      tags: this.selectTags,
      links: [],
      avatar: this.avatar
    })

    if (!cid) { return }

    const params = this.getParams(cid)

    await this.initExtrinsic({ pallet, params, method })

    await this.sentTransaction()
  }

  getParams (cid: IpfsCid) {
    if (this.isProfile) {
      return this.isEdit ? [{ content: { IPFS: cid } }] : [{ IPFS: cid }]
    } else {
      return this.isEdit
        ? [this.spaceItem?.struct.id, { content: { IPFS: cid } }]
        : [
            new OptionId(),
            new OptionText(''),
            { IPFS: cid },
            null
          ]
    }
  }

  getMethods () {
    if (this.isProfile) {
      return this.isEdit ? METHODS.updateProfile : METHODS.createProfile
    } else {
      return this.isEdit ? METHODS.updateSpace : METHODS.createSpace
    }
  }
}
</script>
