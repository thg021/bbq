export interface IParticipant {
  id?: string
  name: string
  drink: boolean
  contribution_value: number
  paid?: boolean
  created_at?: string
}

export interface ISchedule {
  id: string
  title: string
  event_date: string
  created_at: string
  user_id: string
  totalContribution: number
  participants: IParticipant[]
}
