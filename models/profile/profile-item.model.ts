export interface ProfileItemModel {
  address: string;
  followersCount: number;
  followingCount: number;
  links?: Array<string>;
  summary?: string;
  tokens?: string;
  name?: string;
  avatar?: string;
  id: string;
  balance?: string;
  isFollowing?: boolean;
}
