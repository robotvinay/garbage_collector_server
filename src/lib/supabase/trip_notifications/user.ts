import { sendMessageFCM } from '@/lib/firebase/firebase_messaging';
import { createClient } from '@supabase/supabase-js';


interface TripNotification {
    trip_id: string
    user_id: string
    seen: boolean
  }
  
  interface Trip {
    id: string
    driver_id: string
    request_id: string
    status:string
    scheduled_at:Date
    started_at:Date
    completed_at:Date
    driver_location:{
      lat: number
      long: number
    }
  }
  
  interface Driver {
    id: string
    name: string
    phone_number: string
    
    fcm_token: string
  }
  
  interface User {
    id: string
    name: string
    phone_number: string
    notify_distance_in_km:number
    fcm_token: string
  }
  
  interface Requests {
    trip_id: string
    user_id: string
    seen: boolean
  }
  
  
  interface WebhookPayload {
    type: 'INSERT'
    table: string
    record: TripNotification
    schema: 'public'
  }

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );


export async function sendTripNotificationToUser(payload:WebhookPayload) {

  const user = await supabase
  .from('users')
  .select('*')
  .eq('id', payload.record.user_id)
  .single() as { data: User }

const fcmToken = user.data!.fcm_token as string

if (!fcmToken) {
  throw new Error('FCM token not found');
}

const trip = await supabase
.from('trips')
.select('*')
.eq('id', payload.record.trip_id)
.single() as { data: Trip }

const driver = await supabase.from('drivers').select('*').eq('id', trip.data!.driver_id).single() as { data: Driver };

const request = await supabase.from('requests').select('*').eq('id', trip.data!.request_id).single() as { data: Requests };
const notify_distance_in_km = user.data!.notify_distance_in_km;

const trip_message =  {
  token: fcmToken,
  data: {
    key:"trip_notification",
    trip_id: payload.record.trip_id,
    driver_id: driver.data!.id,
    driver_name: driver.data!.name,
    request_json: JSON.stringify(request.data)  
   
  },
  notification: {
    title: "Garbage Truck is near you around " + notify_distance_in_km + " km",
    body: "Driver " + driver.data!.name + "is near you around " + notify_distance_in_km + " km",
  }

};
// console.log(trip_message);
await sendMessageFCM(
  trip_message
);
}

  
