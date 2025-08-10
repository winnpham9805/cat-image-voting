export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface Vote {
  id: number;
  image_id: string;
  sub_id: string;
  value: 1 | -1;
  created_at: string;
}

export interface VoteResponse {
  id: number;
  image_id: string;
  sub_id: string;
  value: 1 | -1;
  country_code: string;
  created_at: string;
  image: {
    id: string;
    url: string;
  };
}

export interface VoteRequest {
  image_id: string;
  sub_id: string;
  value: 1 | -1;
}
