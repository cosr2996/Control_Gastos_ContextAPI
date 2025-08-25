
export type Expence ={
    id:string
    expenseName: string
    amount:number
    category:string
    date:Value
}

export type DraftExpence = Omit<Expence,'id'>
    

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type category ={
    id:string
    name:string
    icon:string
}