import Doctor from "/page-photos/homepage-bot-removebg.png";

import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import Services from "../components/home/Services";
import Testimonial from "../components/home/Testimonials";
import Choose from "../components/home/Choose";
import Footer from "../components/home/Footer";
import Header from "../components/shared/Header";
import { Canvas } from "@react-three/fiber";
import SpaceBackground from "../components/home/SpaceBackground";

const Home = () => {
	return (
		<div className=''>
			<Header />
			<div id="home" className='w-full h-auto md:h-screen p-5 pt-[100px] bg-[#05101c]'>
				<div className="absolute top-0 left-0 w-full h-full">
					<Canvas>
						<ambientLight intensity={0.5} />
						<pointLight position={[10, 10, 10]} />
						<SpaceBackground />
					</Canvas>
				</div>
				<div className='flex flex-col-reverse justify-center items-center md:flex-row md:justify-between md:items-center max-w-[1100px] mx-auto md:mt-10'>
					<motion.div
						initial={{ x: '-100vw' }}
						animate={{ x: 0 }}
						transition={{ type: 'spring', stiffness: 50, duration: 5 }}
						className='flex flex-col justify-center items-center space-y-4 md:space-y-10 md:justify-center md:items-start'
					>
						<h1 className='text-xl font-semibold lg:text-3xl'>Your Health, Our Priority</h1>
						<h1 className='text-4xl font-bold lg:text-6xl'>Welcome to Dr.BYTE!</h1>
						<p className='text-center md:text-left md:max-w-[600px] lg:text-xl lg:leading-loose'>
							At Dr.BYTE, we’re dedicated to bringing healthcare right to your fingertips. Got a quick question or dealing with a complex condition? Dr.BYTE is here around the clock to provide the support and answers you need, anytime you need them.
						</p>
						<button className='text-xl lg:text-xl bg-blue-600 rounded-3xl px-5 py-3 w-full md:w-auto text-white hover:bg-gradient-to-r from-cyan-500 to-purple-500 hover:-translate-y-1 duration-300'>
							<Link to="/signup">Register Now</Link>
						</button>
					</motion.div>
					<motion.div
						initial={{ x: '100vw' }}
						animate={{ x: 0, y: [0, -20, 0] }}
						transition={{ type: 'spring', stiffness: 50, duration: 5, y: { duration: 2, repeat: Infinity, repeatType: "loop" }}}
					>
						<img className='h-[400px] md:w-[450px] md:h-[450px] mb-10' src={Doctor} alt="" />
					</motion.div>
				</div>
			</div>

			<Services />
			<Testimonial />
			<Choose />
			<Footer />
		</div>
	);
};

export default Home;