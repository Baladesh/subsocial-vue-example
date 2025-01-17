import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import { AnyAccountId, AnySpaceId } from '@subsocial/types'
import SubsocialApiService from '~/services/subsocial-api.service'
import { METHODS, PALLETS } from '~/constants/query'
const subsocialApiService = new SubsocialApiService()

export default class FollowService {
  async getApi (): Promise<FlatSubsocialApi> {
    return await subsocialApiService.initSubsocialApi()
  }

  async isAccountFollower (myAddress: AnyAccountId, followedAddress: AnyAccountId): Promise<boolean> {
    const isFollow = await (await this.getApi()).subsocial.substrate.isAccountFollower(myAddress, followedAddress)
    return isFollow
  }

  async isSpaceFollower (myAddress: AnyAccountId, followedAddress: AnySpaceId): Promise<boolean> {
    const isFollow = await (await this.getApi()).subsocial.substrate.isSpaceFollower(myAddress, followedAddress)
    return isFollow
  }

  async getAccountFollowers (id: string) {
    return await subsocialApiService.getSubstrateIdsById({
      pallet: PALLETS.profileFollows,
      method: METHODS.accountFollowers,
      id
    })
  }

  async getAccountFollowing (id: string) {
    return await subsocialApiService.getSubstrateIdsById({
      pallet: PALLETS.profileFollows,
      method: METHODS.accountsFollowedByAccount,
      id
    })
  }

  async getFollowersIdsBySpaceId (id: string) {
    return await subsocialApiService.getSubstrateIdsById({
      pallet: PALLETS.spaceFollows,
      method: METHODS.spaceFollowers,
      id
    })
  }
}
