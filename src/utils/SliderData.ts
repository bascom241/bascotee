import Image1 from "../assets/01.jpg";
import Image2 from "../assets/02.jpg";
import Image3 from "../assets/03.png";
import Image4 from "../assets/04.png";

export interface SliderItem {
  id: number;
  image: string;
  title: string;
  reason: string;
  link: string 
}
export const sliderData: SliderItem[] = [
  {
    id: 1,
    image: Image1,
    title: "Award",
    reason:
      "This award recognizes my contribution to developing impactful tech solutions for my department, highlighting innovation, problem-solving, and technical excellence.",
    link:"https://medium.com/@abdulbasitabdulwahab3/the-award-that-changed-how-i-see-my-skills-6d051d37afe6"
  },
  {
    id: 2,
    image: Image2,
    title: "Startup",
    reason:
      "This reflects my journey as a software engineer building real-world applications, turning ideas into functional products and learning how technology solves practical problems.",
      link:"https://www.linkedin.com/posts/abdulbasit-abdulwahab-144507258_is-edtech-in-nigeria-dying-absolutely-activity-7369650831559778307-qOcS?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD9vbAQBP8bcOXOLUFsji1MbTs_ctQi4unU"
  },
  {
    id: 3,
    image: Image3,
    title: "Building Process",
    reason:
      "A look into my development workflow — from planning and design to coding and deployment — showing how I transform concepts into scalable, user-focused solutions.",
      link:"https://medium.com/@abdulbasitabdulwahab3/my-journey-from-learning-code-to-building-real-apps-b6249e041410"
  },
  {
    id: 4,
    image: Image4,
    title: "Client Review",
    reason:
      "Feedback from clients that showcases my professionalism, communication, and ability to deliver reliable solutions that meet both technical and business needs.",
      link:"https://www.linkedin.com/posts/abdulbasit-abdulwahab-144507258_is-edtech-in-nigeria-dying-absolutely-activity-7369650831559778307-qOcS?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD9vbAQBP8bcOXOLUFsji1MbTs_ctQi4unU"
  },
];
