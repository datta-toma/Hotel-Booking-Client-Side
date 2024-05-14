
import { useEffect } from 'react';
import img1 from '../../../assets/slides/slide1.jpg';
import img2 from '../../../assets/slides/slide2.jpg';
import img3 from '../../../assets/slides/slide3.jpg';
import img4 from '../../../assets/slides/slide4.jpg';
import Aos from 'aos';
import 'aos/dist/aos.css';


const Banner = () => {
    useEffect(() => {
        Aos.init( );
    }, []);
    


    return (
        <div>
            <div className="carousel w-full md:h-[600px]">
                <div id="slide1" className="carousel-item relative w-full" >
                    <img src={img1} className="w-full "/>

                    <div className="absolute h-full  flex justify-center items-center  left-0  top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]" >
                    <div className='text-white space-y-4 md:w-1/3'>
                    <h2 className='md:text-6xl font-bold text-center' data-aos="fade-down-right" >Encore Hotel</h2>
                    <p className='text-center' data-aos="fade-down-left">Encore Hotel is an uber-luxe retreat for explorers and collectors of the worlds island idyll experiences. Set overlooking the exquisite and icoic Ornos Bay, Encore Hotel crucially commands the only private beach on Mykonos.</p>
                    <div className='text-center'data-aos="flip-left">
                    <button className="btn glass font-extrabold">Book Now</button>
                    </div>
                    </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle">❮</a> 
                    <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div> 
                <div id="slide2" className="carousel-item relative w-full">
                    <img src={img2} className="w-full" />
                    <div className="absolute h-full  flex justify-center items-center  left-0  top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className='text-white space-y-4 w-1/3'>
                    <h2 className='text-6xl font-bold text-center'>Encore Hotel</h2>
                    <p className='text-center'>Encore Hotel is an uber-luxe retreat for explorers and collectors of the worlds island idyll experiences. Set overlooking the exquisite and icoic Ornos Bay, Encore Hotel crucially commands the only private beach on Mykonos.</p>
                    <div className='text-center'>
                    <button className="btn glass font-extrabold">Book Now</button>
                    </div>
                    </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a> 
                    <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div> 
                <div id="slide3" className="carousel-item relative w-full">
                    <img src={img3} className="w-full" />
                    <div className="absolute h-full  flex justify-center items-center  left-0  top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className='text-white space-y-4 w-1/3'>
                    <h2 className='text-6xl font-bold text-center'>Encore Hotel</h2>
                    <p className='text-center'>Encore Hotel is an uber-luxe retreat for explorers and collectors of the worlds island idyll experiences. Set overlooking the exquisite and icoic Ornos Bay, Encore Hotel crucially commands the only private beach on Mykonos.</p>
                    <div className='text-center'>
                    <button className="btn glass font-extrabold">Book Now</button>
                    </div>
                    </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">❮</a> 
                    <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div> 
                <div id="slide4" className="carousel-item relative w-full">
                    <img src={img4} className="w-full" />
                    <div className="absolute h-full  flex justify-center items-center  left-0  top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className='text-white space-y-4 w-1/3'>
                    <h2 className='text-6xl font-bold text-center'>Encore Hotel</h2>
                    <p className='text-center'>Encore Hotel is an uber-luxe retreat for explorers and collectors of the worlds island idyll experiences. Set overlooking the exquisite and icoic Ornos Bay, Encore Hotel crucially commands the only private beach on Mykonos.</p>
                    <div className='text-center'>
                    <button className="btn glass font-extrabold">Book Now</button>
                    </div>
                    </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle">❮</a> 
                    <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
              </div>
        </div>
    );
};

export default Banner;