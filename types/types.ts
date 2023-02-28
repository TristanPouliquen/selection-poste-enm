export type AppState = {
  id: number;
  onboarded: boolean;
  activeFilters?: string;
};

export type AppealCourt = {
  id: number;
  name: string;
  color: string;
};

export type Tribunal = {
  id: number;
  name: string;
  notes?: string;
  timeTo?: number;
  color: string;
  appealCourtId: number;
  appealCourt?: AppealCourt;
  groupId: number;
  group?: Group;
  timeWindow?: TimeWindow;
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
  prevalentDomain: string;
  ranking: number;
  notes?: string;
  tribunalId: number;
  tribunal?: Tribunal;
  roleId: number;
  role?: Role;
  tags?: Tag[];
};

export type TimeWindow = {
  id: number;
  tooFar: boolean;
  minTime: number;
  maxTime?: number;
  color: string;
};
