import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import Girl from "/page-photos/girl.jpg";
import Men from "/page-photos/men.jpg";
import Men1 from "/page-photos/men2.jpg";
import { Canvas } from "@react-three/fiber";
import SpaceBackground from "./SpaceBackground";

const Testimonials = () => {
  return (
        <div id="testimonials" className='relative bg-[#05101c] w-full h-auto pb-10 pt-10'>
            <div className="absolute top-0 left-0 w-full h-full">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <SpaceBackground />
            </Canvas>
			</div>
            <div className='relative max-w-[1100px] mx-auto flex flex-col justify-center items-center p-5 space-y-5'>
                <h1 className='text-lg'>TESTIMONIALS</h1>
                <h1 className='text-2xl font-bold underline lg:text-3xl'>What Our Users Say About Us</h1>
                <p className='text-center lg:text-lg'>Hear from our satisfied users about their experience at Dr.BYTE</p>
                {/* Carousel section */}
                <Carousel className="h-auto rounded-3xl w-full p-5 shadow-2xl backdrop-blur-sm bg-white/5">
                {/* item 1 */}
                <div className='flex flex-col space-y-10 p-10 md:flex-row md:space-y-0 md:space-x-8 lg:space-x-20 lg:p-20'>
                    <div className='rounded-xl border-2 p-2 border-dashed border-blue-500'>
                    <img src={Men} alt="" />
                    </div>
                    <div className='flex flex-col space-y-5 justify-center items-start border-2 p-5 border-blue-500 rounded-3xl text-white'>
                    <p className='text-lg text-left'>
                    "Dr.BYTE has been a lifesaver! Whenever I have a health concern, I can get instant advice without having to wait for a doctor's appointment. The symptom checker is incredibly accurate and easy to use."</p>
                    <h1 className='text-left'>Michael Thompson. <br />
                    <span className='text-gray-500'>Software Engineer</span></h1>
                    </div>
                </div>
                {/* item 1 */}
                <div className='flex flex-col space-y-10 p-10 md:flex-row md:space-y-0 md:space-x-8 lg:space-x-20 lg:p-20'>
                    <div className='rounded-xl border-2 p-2 border-dashed border-blue-500'>
                    <img src={Girl} alt="" />
                    </div>
                    <div className='flex flex-col space-y-5 justify-center items-start text-white border-2 p-5 border-blue-500 rounded-3xl'>
                    <p className='text-lg text-left'>
                    "I was initially skeptical about using a medical chatbot, but Dr.BYTE has exceeded my expectations. It's easy to use and provides clear and accurate information. It’s especially useful for understanding symptoms."</p>
                    <h1 className='text-left'>Rachel Lee. <br />
                    <span className='text-gray-500'>Marketing Manager</span></h1>
                    </div>
                </div>
                {/* item 1 */}
                <div className='flex flex-col space-y-10 p-10 md:flex-row md:space-y-0 md:space-x-8 lg:space-x-20 lg:p-20'>
                    <div className='rounded-xl border-2 p-2 border-dashed border-blue-500'>
                    <img src={Men1} alt="" />
                    </div>
                    <div className='flex flex-col space-y-5 justify-center items-start text-white border-2 p-5 border-blue-500 rounded-3xl'>
                    <p className='text-lg text-left'>
                    "Dr.BYTE is fantastic! It’s incredibly convenient for getting answers to my health questions. The AI is impressively accurate and has helped me make informed decisions about my health."</p>
                    <h1 className='text-left'>David Martinez. <br />
                    <span className='text-gray-500'>High School Teacher</span></h1>
                    </div>
                </div>
            </Carousel>
            </div>
        </div>
  )
}

export default Testimonials
