import initAdmin from "@/lib/firebase/firebase_admin";
import { sendMessageFCM } from "@/lib/firebase/firebase_messaging";
import { sendTripNotificationToUser } from "@/lib/supabase/trip_notifications/user";
import { NextApiRequest, NextApiResponse } from "next";
import { headers } from 'next/headers'


// export const runtime = "edge";
  
export async function POST(
    req:Request,res:NextApiResponse
  ) {
const body = await req.json();


    try {
      if(headers().get('content-type')!== 'application/json') {
        return new Response(JSON.stringify({ error: 'Invalid content type' }), {
          headers: { 'Content-Type': 'application/json' },
        })
      }
      if(headers().get('secret')!== 'garbage_doctor') {
        return new Response(JSON.stringify({ error: 'Invalid secret' }), {
          headers: { 'Content-Type': 'application/json' },
        })
      }

      if (!body) {
        return new Response(JSON.stringify({ error: 'No body' }), {
          headers: { 'Content-Type': 'application/json' },
        })
      }

     
      await sendTripNotificationToUser(body);


    return Response.json({ success: true }, { status: 200 });
    } catch (error) {
     
      return new Response(JSON.stringify({ error }), {
        headers: { 'Content-Type': 'application/json' },
      }, );
    }
  }