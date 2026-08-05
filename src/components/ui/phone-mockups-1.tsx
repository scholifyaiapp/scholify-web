import React from "react"
import {
  type ImageItem,
  PhoneCarousel,
} from "@/components/ui/phone-mockups-1-utils/phone-carousel"

const exampleImages: ImageItem[] = [
  { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85", alt: "Student learning with Scholify on a laptop" },
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=85", alt: "Students collaborating during a study session" },
  { src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=85", alt: "Focused study notes and learning materials" },
  { src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=85", alt: "Open notebook ready for exam preparation" },
]

export default function PhoneMockupBasic() {
  return <PhoneCarousel images={exampleImages} />
}
