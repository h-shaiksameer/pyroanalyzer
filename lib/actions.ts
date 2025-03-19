/*
"use server"

import { z } from "zod"
import nodemailer from 

// Define Zod Schema for Validation
const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  company: z.string().optional(),
  wasteType: z.string().min(1),
  quantity: z.string().min(1),
  address: z.string().min(5),
  message: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

// SMTP Email Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "projectdocumentcreator@gmail.com",
    pass: "wpyk usmm vsyr icdk", // SMTP App Password
  },
})

export async function submitServiceRequest(data: FormData) {
  try {
    // Validate form data
    const validatedData = formSchema.parse(data)

    // Send email notification
    await transporter.sendMail({
      from: `"Pyrolysis Suitability Analyzer" <projectdocumentcreator@gmail.com>`,
      to: "shaiksameerhussain2104@gmail.com",
      subject: "New Pyrolysis Service Request",
      html: `
        <h2>New Service Request Received</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone}</p>
        <p><strong>Company:</strong> ${validatedData.company || "N/A"}</p>
        <p><strong>Waste Type:</strong> ${validatedData.wasteType}</p>
        <p><strong>Quantity:</strong> ${validatedData.quantity}</p>
        <p><strong>Address:</strong> ${validatedData.address}</p>
        <p><strong>Message:</strong> ${validatedData.message || "N/A"}</p>
        <hr>
        <p>Submitted at: ${new Date().toLocaleString()}</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Error submitting service request:", error)
    throw new Error("Failed to submit service request")
  }
}


*/
/*
"use server"

import { z } from "zod"
import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { Resend } from "resend"

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCM2BDDaTGJKpFsXmHIsflifgekt7IvwRI",
  authDomain: "pyrolysis-suitability-analyzer.firebaseapp.com",
  databaseURL: "https://pyrolysis-suitability-analyzer-default-rtdb.firebaseio.com",
  projectId: "pyrolysis-suitability-analyzer",
  storageBucket: "pyrolysis-suitability-analyzer.firebasestorage.app",
  messagingSenderId: "765817436857",
  appId: "1:765817436857:web:47d4710f45183d6963b968",
  measurementId: "G-YMTPWSWVPJ",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Initialize Resend API
const resend = new Resend("re_4JSvbYyn_9oGLtU4TtLwyevVuZBps2H2U")

// Define Zod Schema for Validation
const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  company: z.string().optional(),
  wasteType: z.string().min(1),
  quantity: z.string().min(1),
  address: z.string().min(5),
  message: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export async function submitServiceRequest(data: FormData) {
  try {
    // Validate form data
    const validatedData = formSchema.parse(data)

    // Store request in Firebase Firestore
    await addDoc(collection(db, "serviceRequests"), validatedData)

    // Send email notification using Resend API
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "shaiksameerhussain2104@gmail.com",
      subject: "New Pyrolysis Service Request",
      html: `
        <h2>New Service Request Received</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone}</p>
        <p><strong>Company:</strong> ${validatedData.company || "N/A"}</p>
        <p><strong>Waste Type:</strong> ${validatedData.wasteType}</p>
        <p><strong>Quantity:</strong> ${validatedData.quantity}</p>
        <p><strong>Address:</strong> ${validatedData.address}</p>
        <p><strong>Message:</strong> ${validatedData.message || "N/A"}</p>
        <hr>
        <p>Submitted at: ${new Date().toLocaleString()}</p>
      `,
    })

    if (response.error) {
      throw new Error(`Failed to send email: ${response.error}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting service request:", error)
    throw new Error("Failed to submit service request")
  }
}
*/

"use server"

import { z } from "zod"
import { Resend } from "resend"

// Initialize Resend API
const resend = new Resend("re_4JSvbYyn_9oGLtU4TtLwyevVuZBps2H2U")

// Define Zod Schema for Validation
const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  company: z.string().optional(),
  wasteType: z.string().min(1),
  quantity: z.string().min(1),
  address: z.string().min(5),
  message: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export async function submitServiceRequest(data: FormData) {
  try {
    // Validate form data
    const validatedData = formSchema.parse(data)

    // Send email notification using Resend API
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "shaiksameerhussain2104@gmail.com",
      subject: "New Pyrolysis Service Request",
      html: `
        <h2>New Service Request Received</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone}</p>
        <p><strong>Company:</strong> ${validatedData.company || "N/A"}</p>
        <p><strong>Waste Type:</strong> ${validatedData.wasteType}</p>
        <p><strong>Quantity:</strong> ${validatedData.quantity}</p>
        <p><strong>Address:</strong> ${validatedData.address}</p>
        <p><strong>Message:</strong> ${validatedData.message || "N/A"}</p>
        <hr>
        <p>Submitted at: ${new Date().toLocaleString()}</p>
      `,
    })

    if (response.error) {
      throw new Error(`Failed to send email: ${response.error}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting service request:", error)
    throw new Error("Failed to submit service request")
  }
}

