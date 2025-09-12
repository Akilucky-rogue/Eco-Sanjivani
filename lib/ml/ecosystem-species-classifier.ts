// Ecosystem species identification using AI models
export interface EcosystemSpecies {
  id: string
  name: string
  scientificName: string
  conservationStatus: "Least Concern" | "Near Threatened" | "Vulnerable" | "Endangered" | "Critically Endangered"
  habitat: string
  ecosystem: "Forest" | "Wetland" | "Grassland" | "Mountain" | "Coastal" | "Urban" | "Desert"
  threats: string[]
  confidence: number
}

export interface SpeciesIdentificationResult {
  species: EcosystemSpecies[]
  primarySpecies: EcosystemSpecies
  location?: { lat: number; lng: number }
  timestamp: Date
}

export class EcosystemSpeciesClassifier {
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
    const mockSpecies: EcosystemSpecies[] = [
      {
        id: "1",
        name: "Bengal Tiger",
        scientificName: "Panthera tigris tigris",
        conservationStatus: "Endangered",
        habitat: "Tropical forests, grasslands",
        ecosystem: "Forest",
        threats: ["Habitat loss", "Poaching", "Human-wildlife conflict"],
        confidence: 0.92,
      },
      {
        id: "2",
        name: "Indian Elephant",
        scientificName: "Elephas maximus indicus",
        conservationStatus: "Endangered",
        habitat: "Forests, grasslands",
        ecosystem: "Forest",
        threats: ["Habitat fragmentation", "Human encroachment", "Poaching"],
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
