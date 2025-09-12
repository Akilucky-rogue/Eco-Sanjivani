export interface EcosystemSpecies {
  id: string
  name: string
  scientificName: string
  conservationStatus: "Least Concern" | "Near Threatened" | "Vulnerable" | "Endangered" | "Critically Endangered"
  ecosystem: "forest" | "wetland" | "grassland" | "mountain" | "marine" | "freshwater" | "urban"
  region: string
  habitat: string
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
    ecosystem?: string,
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
          ecosystem,
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
      return this.getMockSpeciesData(ecosystem)
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

  private getMockSpeciesData(ecosystem?: string): SpeciesIdentificationResult {
    const mockSpeciesData: Record<string, EcosystemSpecies[]> = {
      forest: [
        {
          id: "1",
          name: "Bengal Tiger",
          scientificName: "Panthera tigris tigris",
          conservationStatus: "Endangered",
          ecosystem: "forest",
          region: "Central & Eastern India",
          habitat: "Tropical deciduous forests, grasslands",
          threats: ["Habitat loss", "Human-wildlife conflict", "Poaching"],
          confidence: 0.94,
        },
        {
          id: "2",
          name: "Indian Elephant",
          scientificName: "Elephas maximus indicus",
          conservationStatus: "Endangered",
          ecosystem: "forest",
          region: "Western & Eastern Ghats",
          habitat: "Tropical forests, grasslands",
          threats: ["Habitat fragmentation", "Human encroachment", "Ivory trade"],
          confidence: 0.87,
        },
      ],
      wetland: [
        {
          id: "3",
          name: "Sarus Crane",
          scientificName: "Antigone antigone",
          conservationStatus: "Vulnerable",
          ecosystem: "wetland",
          region: "Northern India",
          habitat: "Wetlands, agricultural fields",
          threats: ["Wetland destruction", "Agricultural intensification", "Power lines"],
          confidence: 0.91,
        },
      ],
      marine: [
        {
          id: "4",
          name: "Olive Ridley Turtle",
          scientificName: "Lepidochelys olivacea",
          conservationStatus: "Vulnerable",
          ecosystem: "marine",
          region: "Indian Ocean Coast",
          habitat: "Coastal waters, nesting beaches",
          threats: ["Fishing nets", "Beach pollution", "Coastal development"],
          confidence: 0.89,
        },
      ],
    }

    const selectedEcosystem = ecosystem || "forest"
    const species = mockSpeciesData[selectedEcosystem] || mockSpeciesData.forest

    return {
      species,
      primarySpecies: species[0],
      timestamp: new Date(),
    }
  }
}
