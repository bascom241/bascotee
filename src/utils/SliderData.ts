import Image1 from "../assets/01.jpg";
import Image2 from "../assets/02.jpg";
import Image3 from "../assets/03.png";
import Image4 from "../assets/04.png";

export interface SliderItem {
  id: number;
  image: string;
  title: string;
  reason: string;
}

export const sliderData: SliderItem[] = [
  {
    id: 1,
    image: Image1,
    title: "Creative Design",
    reason: "This image represents my passion for clean and modern UI design.",
  },
  {
    id: 2,
    image: Image2,
    title: "Development",
    reason: "It shows my journey as a software engineer building real-world apps.",
  },
  {
    id: 3,
    image: Image3,
    title: "Innovation",
    reason: "A reflection of my drive to solve problems creatively.",
  },
  {
    id: 4,
    image: Image4,
    title: "Growth",
    reason: "This symbolizes learning, growth, and continuous improvement.",
  },
];
