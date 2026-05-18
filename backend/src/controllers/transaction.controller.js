import { Transaction } from "../models/transaction.model.js";

export const getTransactions = async (req,res)=>{
    try {
        const  transactions = await Transaction.find().populate("user","name email").sort({ createdAt: -1});
        res.status(200).json({success: true,transactions});
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

export const deleteTransactions = async(req,res)=>{
        try {
            const transactions = await Transaction.findById(req.params.id);
            if (!transaction) {
                return res.status(404).json({
                    message: "transaction is not found",
                });
            }
             await transactions.deleteOne();

             res.status(200).json({success: "Transactions Deleted"});
        } catch (error) {
            res.status(500).json({ message: error.message || "Internal Server Error" });
        }
}
