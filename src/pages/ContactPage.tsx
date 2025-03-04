

export const ContactPage = () => {

    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
    
        const response = await fetch("https://formspree.io/f/myzkrzwv", {
            method: "POST",
            body: formData,
            headers: { Accept: "application/json" },
        });
    
        if (response.ok) {
            alert("Email sent successfully!");
            form.reset(); 
        } else {
            alert("Failed to send email. Please try again.");
        }
    };

    return (<>
        <div className="px-[50px] flex flex-col items-center w-full max-w-[800px] mx-auto gap-8">

         <div className="relative z-0 flex flex-col gap-4 m-6 justify-center">
            <p>
            This research on Extract Method Refactoring, along with the implementation of the code duplicates refactoring extraction tool, was performed by the faculty and students of Stevens Institute of Technology, Rochester Institute of Technology, University of Michigan-Flint in collaboration with JetBrains Research.
            </p>
            <p className="mb-5">
            We invite fellow researchers and software engineers to provide us with feedback and extensions on our research and tool. Please feel free to reach out with your feedback or questions. Your message will be emailed to:
            </p>
            <p>Eman Abdullah AlOmar (ealomar@stevens.edu)</p>
            <p>Mohamed Wiem Mkaouer (mmkaouer@umich.edu)</p>
        </div>
     
        <form id="contact-form" className="p-6 w-full flex flex-col gap-4" onSubmit={sendEmail}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <input placeholder="Name" id="contact-name" name="name" type="text" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="flex flex-col">
                    <input placeholder="Email" id="contact-email" name="email" type="email" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
            </div>

            <div className="flex flex-col">
                <input placeholder="Subject" id="contact-subject" name="subject" type="text" className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div className="flex flex-col">
                <textarea placeholder="Message" id="contact-message" name="message" rows={4} className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <button 
                type="submit" 
                className="bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition duration-200">
                Submit
            </button>
        </form>

            </div>
    </>)
}