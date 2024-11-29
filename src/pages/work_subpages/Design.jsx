import { useState } from "react"
import FreelanceJobs from "../../components/FreelanceJobs";
import { useFetchAllWorks } from "../../utils/helper"
import '../../styles/subpage_styles/work_subpage.css'

function Design() {

  const [data, setData] = useState();
  useFetchAllWorks(setData, "Graphic Design");

  if (!data) return <></>;

  return (
    <div className="work_container">
      <div className="work container">
        <div className="hidden"><h1><i className='fas fa-magic' style={{ fontsize: "40px", marginright: "50px" }}></i>College Graphic Designers</h1></div>
        <div className="hide">Graphic design is the art and practice of visually communicating ideas and information through <br /> creative and purposeful use of typography, imagery, and layout.</div>

        <div className="boxes">
          <FreelanceJobs jobs={data} />
        </div>
      </div>
    </div>
  )
}

export default Design;