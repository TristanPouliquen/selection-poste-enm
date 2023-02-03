export type AppState = {
  id: number;
  onboarded: boolean;
  active_filters?: string;
};

export type AppealCourt = {
  id: number;
  name: string;
  color: string;
};

export type Tribunal = {
  id: number;
  name: string;
  color: string;
  timeTo: number;
  appealCourtId: number;
  groupId: number;
};

export type Group = {
  id: number;
  name: string;
  color: string;
};

export type Role = {
  id: number;
  name: string;
  color: string;
};

export type Tag = {
  id: number;
  name: string;
  color: string;
};

export type Position = {
  id: number;
  placed: boolean;
  taken: boolean;
  prevalent_domain: string;
  ranking: number;
  notes?: string;
  tribunal_id: number;
  role_id: number;
  tags?: Tag[];
};
