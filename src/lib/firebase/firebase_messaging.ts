
import * as admin from "firebase-admin";
import { TokenMessage, getMessaging } from "firebase-admin/messaging";
import initAdmin from "./firebase_admin";

export async function sendMessageFCM(payload:TokenMessage){
    const fapp = await initAdmin();
    const fcm = getMessaging(fapp);
   const message = await fcm.send(payload);

//   const mess =  await getMessaging(admin.app()).send({
//         token:"fvbwlRisTceXP-oVjJsJ6H:APA91bF1nzXPalv4NMnPvtEBN7WkkDUgkGVPpglqo3ZPCH-nfvgAX_penYv2r9iDnQ9FHodi-F2trcRp6BcjDpPV3pdwZraQ9JvEt5QLGqrFngNr7rsnoG_ILT2Bi13roGSdJUnFQnGu",
//         data:{
//             "key":"trip_notify",
//             "trip_id":"1234-123",
//             "status":"reached"
//         },
//         notification: {
//             "body": "Hey this is a simple message",
//             "title": "FCM Message"
//           }
        
//     })

  console.log(message);  
}

