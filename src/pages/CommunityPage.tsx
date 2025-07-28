import stevens_logo from "../assets/logo/test.svg";
import rit_logo from "../assets/logo/rit_logo.png";
import hse_logo from "../assets/logo/hse.png";
import ecole_logo from "../assets/logo/ecole.png";
import michiganFlint_logo from "../assets/logo/michigan-flint_logo.png";
import jetBrains_logo from "../assets/logo/jetbrains-research_logo.png";

const currentContributors = [
    { name: "Eman Abdullah AlOmar, PhD",institution: "Stevens Institute of Technology"},
    { name: "Mohamed Wiem Mkaouer, PhD", institution: "University of Michigan-Flint"},
    { name: "Ali Ouni, PhD", institution: "École de technologie supérieure"},
    { name: "Timofey Bryksin, PhD", institution: "JetBrains Research"},
    { name: "Yaroslav Golubev", institution: "JetBrains Research"},
    { name: "Zarina Kurbatova", institution: "JetBrains Research"},
    { name: "Xing Qian",institution: "Stevens Institute of Technology"},
    { name: "Cecilia Esteban",institution: "Stevens Institute of Technology"}
]

interface Contributor {
    name: string;
  }
  
  interface PastContributors {
    [key: string]: Contributor[]; 
    "Stevens Institute of Technology": Contributor[];
    "Rochester Institute of Technology": Contributor[];
    "HSE University": Contributor[];
  }

const pastContributors: PastContributors = {
    "Stevens Institute of Technology": [
        { "name": "Jacob Ashkenas" },
        { "name": "Cavin Gada" },
        { "name": "Mark Falletta" },
        { "name": "Matthew Angelakos" },
        { "name": "Dimitrios Haralampopoulos" },
        { "name": "Robert Feliciano" },
        { "name": "Connor Phillips" },
        { "name": "Angelo Nicosia" },
        { "name": "Daniel Craig" },
        { "name": "Matthew Oyales" },
        { "name": "Rudolph Sedlin" },
        { "name": "Steven Truong" },
        { "name": "Benjamin Knobloch" },
        { "name": "Thomas Kain" },
        { "name": "Christopher Kalish" },
        { "name": "Olof Persson" },
        { "name": "Jonathan Memoli" }
    ],
    "Rochester Institute of Technology": [
        { "name": "Morgan West" },
        { "name": "Trey Pachucki" },
        { "name": "Tyler Pauly" },
        { "name": "Payton Hall" },
        { "name": "Le Nguyen" },
        { "name": "Amit Kini" },
        { "name": "Aditya Thakur" }
    ],
    "HSE University": [
        { "name": "Anton Ivanov" }
    ]
    }
      
  

export const CommunityPage = () => {
    return (<div className=" p-10">
            <h1 className="page-header mb-[50px]">Our Community:</h1>

            <div className="flex mb-[200px]">

                <div className="w-1/2">
                    <h2 className="text-2xl font-bold mb-[20px]">Current Contributors:</h2>
                    {currentContributors.map((contributor, i) => {
                        return (<div className="mb-[20px]" key={i}>
                            <p className="text-xl">{contributor.name}</p>
                            <p className="text-xl italic text-gray-500">{contributor.institution}</p>
                        </div>)
                    })}
                </div>
                <div className="w-1/2">
                    <h2 className="text-2xl font-bold mb-[20px]">Past Contributors:</h2>

                    {Object.keys(pastContributors).map((key, i) => (
                        <div className="mb-[20px]" key={i}>
                            <h3 className="text-xl font-bold mb-[20px]">{key}:</h3>
                            {pastContributors[key].map((value, j) => (
                            <p className="text-xl mb-[5px]" key={j}>{value.name}</p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <h2 className="page-sub-header text-center mb-[35px]">In Partnership With:</h2>
            <div className="flex justify-center items-center mb-[35px]">
                <div className="h-75 w-75 flex items-center justify-center mx-5">
                    <img src={stevens_logo} alt="Stevens" className=" max-h-full max-w-full object-contain" />
                </div>
                <div className="h-75 w-75 flex items-center justify-center mx-5">
                    <img src={rit_logo} alt="RIT" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="h-75 w-75 flex items-center justify-center mx-5 ">
                    <img src={michiganFlint_logo} alt="Michigan Flint" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="h-75 w-75 flex items-center justify-center mx-5">
                    <img src={ecole_logo} alt="ÉTS" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="h-75 w-75 flex items-center justify-center mx-5">
                    <img src={hse_logo} alt="HSE" className="max-h-full max-w-full object-contain" />
                 </div>
            </div>
            <div className="h-35 w-35 flex items-center justify-center mx-5">
            <img src={jetBrains_logo} alt="jetbrains" className="max-h-full max-w-full object-contain" />

            </div>
          

        </div>)
}

