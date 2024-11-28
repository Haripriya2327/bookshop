import alinaPic from '../assets/alina.jfif'
import hariPic from '../assets/hari.jfif'

export default function AboutPage() {
	return (
		<div className='flex flex-col justify-evenly overflow-y-scroll md:flex-row pt-4 md:pt-20 md:py-40'>
			<div className="flex flex-col items-center border-gray-200 pb-10">
				<img className="mb-3 w-24 h-24 rounded-full shadow-lg" src={alinaPic} alt="Alina image" />
				<h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Alina Havriushenko</h3>
				<span className="text-sm text-gray-500 dark:text-gray-400">Web Developer</span>
				<div className="flex mt-4 space-x-3 lg:mt-6">
					<a
						className="inline-flex items-center py-2 px-4 text-sm 
                    font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 
                    focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 
                    dark:focus:ring-blue-800" 
					href='https://www.linkedin.com/in/alina-havriushenko/'>LinkedIn</a>
				</div>
			</div>
			<div className="flex flex-col items-center border-gray-200 pb-10">
				<img className="mb-3 w-24 h-24 rounded-full shadow-lg" src={hariPic} alt="Hari image" />
				<h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Haripriya Mohanasundaram</h3>
				<span className="text-sm text-gray-500 dark:text-gray-400">Web Developer</span>
				<div className="flex mt-4 space-x-3 lg:mt-6">
					<a
						className="inline-flex items-center py-2 px-4 text-sm 
                    font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 
                    focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 
                    dark:focus:ring-blue-800" 
					href="https://www.linkedin.com/in/haripriya-mohanasundaram">LinkedIn</a>
				</div>
			</div>
		</div>
	)
}