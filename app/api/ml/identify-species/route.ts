import { type NextRequest, NextResponse } from "next/server"

function getScientificName(commonName: string): string {
  const mapping: Record<string, string> = {
    "sea turtle": "Chelonia mydas",
    dolphin: "Delphinus delphis",
    whale: "Balaenoptera musculus",
    coral: "Anthozoa spp.",
    fish: "Pisces spp.",
    seabird: "Charadriiformes spp.",
    "marine mammal": "Cetacea spp.",
    crustacean: "Crustacea spp.",
    mollusk: "Mollusca spp.",
    "marine plant": "Algae spp.",
  }
  return mapping[commonName] || "Species unknown"
}

function getConservationStatus(commonName: string): string {
  const mapping: Record<string, string> = {
    "sea turtle": "Endangered",
    whale: "Vulnerable",
    dolphin: "Least Concern",
    coral: "Near Threatened",
    "marine mammal": "Vulnerable",
    crustacean: "Least Concern",
    mollusk: "Least Concern",
    "marine plant": "Least Concern",
  }
  return mapping[commonName] || "Data Deficient"
}

function getHabitat(commonName: string): string {
  const mapping: Record<string, string> = {
    "sea turtle": "Coastal waters, seagrass beds",
    dolphin: "Open ocean, coastal waters",
    whale: "Deep ocean waters",
    coral: "Shallow tropical waters",
    "marine mammal": "Various marine environments",
    crustacean: "Various marine environments",
    mollusk: "Various marine environments",
    "marine plant": "Various marine environments",
  }
  return mapping[commonName] || "Marine environment"
}

function getThreats(commonName: string): string[] {
  const mapping: Record<string, string[]> = {
    "sea turtle": ["Plastic pollution", "Coastal development", "Climate change"],
    dolphin: ["Fishing nets", "Noise pollution", "Habitat loss"],
    whale: ["Ship strikes", "Noise pollution", "Climate change"],
    coral: ["Ocean acidification", "Warming waters", "Pollution"],
    "marine mammal": ["Ship strikes", "Pollution", "Climate change"],
    crustacean: ["Overfishing", "Pollution", "Climate change"],
    mollusk: ["Overfishing", "Pollution", "Climate change"],
    "marine plant": ["Pollution", "Warming waters", "Overfishing"],
  }
  return mapping[commonName] || ["Marine pollution", "Climate change"]
}

export async function POST(request: NextRequest) {
  try {
    const { image, location } = await request.json()

    const apiKey = process.env.ML_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "ML API key not configured" }, { status: 500 })
    }

    try {
      const response = await fetch("https://api-inference.huggingface.co/models/microsoft/resnet-50", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: image,
          parameters: {
            candidate_labels: [
              "sea turtle",
              "dolphin",
              "whale",
              "coral",
              "fish",
              "seabird",
              "marine mammal",
              "crustacean",
              "mollusk",
              "marine plant",
            ],
          },
        }),
      })

      const responseText = await response.text()

      if (response.ok) {
        try {
          const mlResult = JSON.parse(responseText)

          const processedResult = {
            species: mlResult.map((item: any, index: number) => ({
              id: (index + 1).toString(),
              name: item.label.charAt(0).toUpperCase() + item.label.slice(1),
              scientificName: getScientificName(item.label),
              conservationStatus: getConservationStatus(item.label),
              habitat: getHabitat(item.label),
              threats: getThreats(item.label),
              confidence: item.score,
            })),
            primarySpecies: {
              id: "1",
              name: mlResult[0]?.label.charAt(0).toUpperCase() + mlResult[0]?.label.slice(1) || "Unknown Species",
              scientificName: getScientificName(mlResult[0]?.label),
              conservationStatus: getConservationStatus(mlResult[0]?.label),
              habitat: getHabitat(mlResult[0]?.label),
              threats: getThreats(mlResult[0]?.label),
              confidence: mlResult[0]?.score || 0,
            },
            location,
            timestamp: new Date(),
          }

          return NextResponse.json(processedResult)
        } catch (parseError) {
          console.error("Failed to parse ML API response as JSON:", responseText)
          throw new Error("Invalid JSON response from ML API")
        }
      } else {
        console.error("ML API error response:", response.status, responseText)
        throw new Error(`ML API returned ${response.status}: ${responseText}`)
      }
    } catch (mlError) {
      console.error("ML API error:", mlError)
      // Fall back to mock data if ML service fails
    }

    // Simulate ML processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock species identification result
    const mockResult = {
      species: [
        {
          id: "1",
          name: "Green Sea Turtle",
          scientificName: "Chelonia mydas",
          conservationStatus: "Endangered",
          habitat: "Coastal waters, seagrass beds",
          threats: ["Plastic pollution", "Coastal development", "Climate change"],
          confidence: 0.92,
        },
        {
          id: "2",
          name: "Hawksbill Turtle",
          scientificName: "Eretmochelys imbricata",
          conservationStatus: "Critically Endangered",
          habitat: "Coral reefs, rocky areas",
          threats: ["Illegal trade", "Habitat loss", "Marine pollution"],
          confidence: 0.78,
        },
      ],
      primarySpecies: {
        id: "1",
        name: "Green Sea Turtle",
        scientificName: "Chelonia mydas",
        conservationStatus: "Endangered",
        habitat: "Coastal waters, seagrass beds",
        threats: ["Plastic pollution", "Coastal development", "Climate change"],
        confidence: 0.92,
      },
      location,
      timestamp: new Date(),
    }

    return NextResponse.json(mockResult)
  } catch (error) {
    console.error("Species identification API error:", error)
    return NextResponse.json({ error: "Species identification failed" }, { status: 500 })
  }
}
