// Marine species identification using AI models
export interface MarineSpecies {
  id: string
  name: string
  scientificName: string
  conservationStatus: "Least Concern" | "Near Threatened" | "Vulnerable" | "Endangered" | "Critically Endangered"
  habitat: string
  threats: string[]
  confidence: number
}

export interface SpeciesIdentificationResult {
  species: MarineSpecies[]
  primarySpecies: MarineSpecies
  location?: { lat: number; lng: number }
  timestamp: Date
}

export class MarineSpeciesClassifier {
  constructor() {
    // No API key needed on client side - all calls go through our secure API routes
  }

  async identifySpecies(
    imageFile: File,
    location?: { lat: number; lng: number },
  ): Promise<SpeciesIdentificationResult> {
    try {
      // Convert image to base64
      const base64Image = await this.fileToBase64(imageFile)

      const response = await fetch("/api/ml/identify-species", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
          location,
        }),
      })

      if (!response.ok) {
        throw new Error("Species identification failed")
      }

      return await response.json()
    } catch (error) {
      console.error("Species identification error:", error)
      // Return mock data for demo
      return this.getMockSpeciesData()
    }
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  private getMockSpeciesData(): SpeciesIdentificationResult {
    const mockSpecies: MarineSpecies[] = [
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
        name: "Olive Ridley Turtle",
        scientificName: "Lepidochelys olivacea",
        conservationStatus: "Vulnerable",
        habitat: "Open ocean, nesting beaches",
        threats: ["Fishing nets", "Beach pollution", "Light pollution"],
        confidence: 0.78,
      },
    ]

    return {
      species: mockSpecies,
      primarySpecies: mockSpecies[0],
      timestamp: new Date(),
    }
  }
}
