
const Contact = () => {
    return (
        <div>
            <h2 className="text-xl font-bold text-center mt-6">Need More Information</h2>
            <h3 className="text-5xl font-extrabold text-center mt-9">Let's Get in Touch</h3>

            <div className="flex flex-col md:flex-row justify-center gap-6 mt-12">
                <div>
                    <p className="text-center mt-4">
                    Ready to discover your perfect hotel or have questions about our services? We're here to help!<br></br> Whether you're seeking tailored recommendations,recommendations, assistance with bookings,<br></br> or simply want to share feedback, our dedicated team is just a message away.
                    </p>
                    <div className="flex flex-col md:flex-row gap-5  mt-8">
                        <div className=" text-center">
                        <h2 className="font-bold">Our Address</h2>
                        <p>110 Traders Cross, 1st Floor, Bluffton, South Carolina</p>
                        </div>
                        <div className=" text-center">
                            <h2 className="font-bold">Our Email</h2>
                            <p>Email : contact@majesticrooms.com</p>
                        </div>
                    </div>
                </div>

                <div>
               <div className=" flex flex-col md:flex-row gap-5">
               <input type="text" placeholder="First Name" className="input input-bordered w-full max-w-xs" />
               <input type="text" placeholder="Last Name" className="input input-bordered w-full max-w-xs" />
               </div>
               <div className=" flex flex-col md:flex-row gap-5 mt-5">
               <input type="email" placeholder="Email" className="input input-bordered w-full max-w-xs" />
               <input type="text" placeholder="Phone" className="input input-bordered w-full max-w-xs" />
               </div>
               <input type="text" placeholder="Message" className="input input-bordered input-lg w-full max-w-xs mt-5"  />
               <button className="btn btn-wide mt-5 md:ml-24 mb-5">Wide</button>

                </div>
                
            </div>
           
        </div>
    );
};

export default Contact;