import mongoose,{Schema} from "mongoose";

const subscriptionSchema =  new Schema({
    subscriber:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    channel:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

export const Subscription = mongoose.model("Subscription",subscriptionSchema)

//har baar naya document bnta hai agr hum subscribe ya unsubscribe krenge tab

// no of subscriber count krne ke liye hum pehle channel name match krte hai then uske baad hum document ko count kr lete hai

// vice versa for a user of about how much channel he has subscribed