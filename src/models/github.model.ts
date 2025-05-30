export interface GithubUser {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    public_repos?: number;
    followers?: number;
  }