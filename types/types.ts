export type AppealCourt = {
    id: number,
    name: string,
    color: string
}

export type Position = {
    id: number,
    placed: boolean,
    prevalent_domain: string,
    ranking: number,
    notes?: string,
    tribunal_id: number,
    role_id: number
}