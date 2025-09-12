import { NextResponse } from "next/server"

// Simulate ML model predictions
const generatePredictions = () => {
  const locations = ["Versova Beach", "Juhu Beach", "Marine Drive", "Chowpatty"]
  const predictions = []

  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)

    locations.forEach((location) => {
      const baseAmount =
        {
          "Versova Beach": 380,
          "Juhu Beach": 290,
          "Marine Drive": 150,
          Chowpatty: 200,
        }[location] || 200

      const weatherFactor = 0.8 + Math.random() * 0.4
      const seasonalFactor = 1.1 + Math.random() * 0.3
      const predicted = Math.round(baseAmount * weatherFactor * seasonalFactor)

      predictions.push({
        location,
        date: date.toISOString().split("T")[0],
        predicted_waste_kg: predicted,
        confidence: 0.85 + Math.random() * 0.1,
        factors: {
          weather_impact: weatherFactor,
          seasonal_impact: seasonalFactor,
          activity_impact: 1.0 + Math.random() * 0.2,
        },
      })
    })
  }

  return predictions
}

export async function GET() {
  try {
    const predictions = generatePredictions()

    return NextResponse.json({
      success: true,
      data: predictions,
      generated_at: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to generate predictions" }, { status: 500 })
  }
}
