import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"


export const useBudget = () =>{
    const context = useContext(BudgetContext)
    if(!context){
        throw new Error('useBusget must be used within a BudgetProvider')
    }
    return context
}