import { Transaction } from "../models/transaction.model.js";


export const getSummaryReport = async(req,res)=>{
    try {
        const transactions = await Transaction.find({user: req.user._id,});

        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach(
            (transactions) =>{
                if (transaction.type === "income") {
                        totalIncome += transactions.amount;
                } else {
                    totalExpense += transactions.amount;
                }
            }
        );
        const balance = totalIncome - totalExpense;
        res.status(200).json({ success: true,totalIncome,totalExpense,balance});
        
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}