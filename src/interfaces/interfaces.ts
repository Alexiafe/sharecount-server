export interface ISharecountForm {
  name: string
  currency: string
  participantsToAdd: string[]
  participantsToDelete: string[]
}

export interface IExpenseForm {
  name: string
  amount_total: number
  date: string
  sharecount_id: number
  owner_id: number,
  partakers: ParticipantsInExpense[]
}

export interface ParticipantsInExpense {
  participant_id: number
  amount: number
}