import { config } from '~/config/config'

export default {
  imageShouldBeLessThanTwoMB: 'Image should be less than 2 MB',
  general: {
    title: `${config.appName}`
  },
  formHints: {
    whoCanPost: {
      space_owner: 'Only you can create and edit posts in this space.',
      follower: 'You and followers of this space can create and edit own posts.',
      everyone: 'Everyone can create and edit their own posts in this space.',
      none: 'None can create or edit posts in this space.'
    },
    embedded: 'You can embed links from YouTube, Vimeo and SoundCloud.'
  },
  forms: {
    permissions: {
      whoCanPost: {
        space_owner: 'Only you can post',
        follower: 'Followers can post',
        everyone: 'Everyone can post'
      }
    }
  },
  notifications: {
    AccountFollowed: 'followed your account',
    SpaceFollowed: 'followed your space',
    SpaceCreated: 'created a new space',
    CommentCreated: 'commented on your post',
    CommentReplyCreated: 'replied to your comment on',
    PostShared: 'shared your post',
    CommentShared: 'shared your comment on',
    PostReactionCreated: 'reacted to your post',
    CommentReactionCreated: 'reacted to your comment on'
  },
  activities: {
    AccountFollowed: 'followed the account',
    SpaceFollowed: 'followed the space',
    SpaceCreated: 'created the space',
    PostCreated: 'created the post',
    PostSharing: 'shared the post',
    PostShared: 'shared the post',
    CommentCreated: 'commented on the post',
    CommentShared: 'shared a comment on',
    CommentReplyCreated: 'replied to a comment on',
    PostReactionCreated: 'reacted to the post',
    CommentReactionCreated: 'reacted to a comment on'
  },
  statistics: {
    AccountFollowed: 'Accounts followed',
    SpaceFollowed: 'Spaces followed',
    SpaceCreated: 'Spaces created',
    PostCreated: 'Posts created',
    PostSharing: 'Posts shared',
    'PostShared,CommentShared': 'Posts shared',
    // TODO: change keys
    'CommentCreated,CommentReplyCreated': 'Comments created',
    'PostReactionCreated,CommentReactionCreated': 'Upvotes + downvotes'
  },
  connectingToNetwork: 'Connecting to the network...',
  waitingForTx: 'Waiting for transaction to complete.',
  faucet: {
    button: {
      request: 'Request tokens',
      topUp: 'Top up balance'
    }
  },
  supportedAccounts: 'We support addresses of any Substrate-based chain: Polkadot, Kusama, Acala, Plasm, Edgeware, etc.',
  kusama: {
    verifiedIdentity: 'Verified Kusama identity',
    unverifiedIdetity: 'Kusama identity'
  },
  postPage: {
    originalPost: 'Original post:'
  },
  spaces: {
    offical: {
      officialSpace: 'Official space',
      unclaimedSpace: 'Claim ownership is pending'
    }
  },
  errors: {
    maintenance: `${config.appName} is currently offline for maintenance, but will be back soon.`
  }
}
