import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Here you would integrate with your email service
    // Examples: Resend, SendGrid, Nodemailer, etc.

    // For demo purposes, we'll simulate a successful send
    console.log("Email received:", { name, email, message })

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    })
  } catch (error) {
    console.error("Email sending failed:", error)
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 })
  }
}
