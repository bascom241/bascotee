import About from "../components/About";
import Hero from "../components/Hero";
import Slider from "../components/Slider";
import Project from "../components/Project";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
const Home = () => {
    return (
        <main className="w-full items-center justify-center safe-area">
            <div className="mx-auto w-full max-w-screen-2xl 
                px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24
                pl-[max(1rem,env(safe-area-inset-left))] 
                pr-[max(1rem,env(safe-area-inset-right))]">

                <Hero />
                <div className="my-8 sm:my-12 md:my-16" />
                <Slider />
                <div className="my-8 sm:my-12 md:my-16" />
                <About />
                <div className="my-8 sm:my-12 md:my-16" />
                <Project />
                <div className="my-8 sm:my-12 md:my-16" />
                <Experience />
                <div className="my-8 sm:my-12 md:my-16" />
                <Contact />

            </div>
        </main>
    )
}

export default Home;