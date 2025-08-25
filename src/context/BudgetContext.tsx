import { useReducer,createContext, type Dispatch, type ReactNode, useMemo } from "react"
import { budgetReducer,initialState, type BudgeActions, type BudgeState } from "../reducers/budget-reducer"


type BudgetContextProps ={
    state:BudgeState
    dispatch:Dispatch<BudgeActions>
    remainingBudget:number
    totalExpenses:number
}

type BudgetProviderProps = {
    children:ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)


export const BudgetProvider =({children}:BudgetProviderProps)=>{

    const [state,dispatch]=useReducer(budgetReducer,initialState)
    const totalExpenses = useMemo(()=>state.expenses.reduce((total,expense) => expense.amount + total ,0 ),[state.expenses])
    const remainingBudget= state.budget-totalExpenses
    

    return(

        <BudgetContext.Provider
            value={{state,dispatch,remainingBudget,totalExpenses}}
        >
            {children}

        </BudgetContext.Provider>
    )
}