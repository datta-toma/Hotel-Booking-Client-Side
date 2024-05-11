import img1 from '../../../assets/image/img1.jpg';
import img2 from '../../../assets/image/img2.jpg';
import img3 from '../../../assets/image/img3.jpg';

const About = () => {
    return (
        <div>
           <div className='flex flex-col md:flex-row justify-center gap-14 p-4'>
            <div>
                <img className='w-96' src={img1}></img>
            </div>

            <div>
                <h2 className='text-center text-3xl font-bold'>Hotel</h2>
                <p className='text-center mt-3'>The Studio 154 Luxury Hotel and SKYDECK was built in 2019 within the original building from the mid 1900’s.
                <br></br><br></br>
                The hotel is situated on 15,000 Square feet of the entire third floor and rooftop spaces with suites featuring<br></br> 10-foot tall arched windows and 22-foot high ceilings. The exposed original brick combined with the art and<br></br> furnishings create a warm contemporary feel.</p>
            </div>
           </div>

           <div className='flex flex-col md:flex-row justify-center gap-14 p-4 mt-7'>
            <div>
                <h2 className='text-center text-3xl font-bold'>Suites</h2>
                <p className='text-center mt-3'>Studio 154 Luxury Hotel and SKYDECK provides 16 luxury suites ranging from 400 to nearly 2,000 square feet<br></br> and include several two-story loft units. Some suites overlook the river and come with outdoor covered balconies.<br></br> The hotel can accommodate up to 85 guests, perfectly flexible to suit your needs.</p>
            </div>

            <div>
                <img className='w-96' src={img2}></img>
            </div>
           </div>

           <div className='flex flex-col md:flex-row justify-center gap-14 p-4 mt-7'>
            <div>
                <img className='w-96' src={img3}></img>
            </div>

            <div>
                <h2 className='text-center text-3xl font-bold'>SKYDECK</h2>
                <p className='text-center mt-3'>Studio 154 Luxury Hotel’s SKYDECK is a private rooftop deck overlooking<br></br> the Cumberland River, Nissan Stadium, and Riverfront Park.
                </p>
                <p>
                <li>Additional Service</li>
                    <li>4k Smart TV w/100 Channels</li>
                    <li>Book the SKYDECK for your private event</li>
                    <li>Up to 150 guests</li>
                    <li>Lounging sofas</li>
                    <li>Tables</li>
                    <li>Seating</li>
                </p>
                    
               
            </div>
           </div>
        </div>
    );
};

export default About;