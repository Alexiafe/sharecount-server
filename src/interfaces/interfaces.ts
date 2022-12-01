export interface ISharecountForm {
  name: string
  currency: string
  participantsToAdd: string[]
  participantsToDelete: string[]
  user_email: string
  participant_id: number
}

export interface IExpenseForm {
  name: string
  amount_total: number
  date: string
  sharecount_id: number
  owner_id: number,
  partakers: IParticipantsInExpenseForm[]
}

export interface IParticipantsInExpenseForm {
  participant_id: number
  amount: number
}

export interface IUserForm {
  email: string
}

export interface IUserInSharecountDataForm {
  sharecount_id: number,
  user_email: string
}