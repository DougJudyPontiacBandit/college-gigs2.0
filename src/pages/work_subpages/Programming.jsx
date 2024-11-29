import { useState } from "react"
import FreelanceJobs from "../../components/FreelanceJobs";
import { useFetchAllWorks } from "../../utils/helper"
import '../../styles/subpage_styles/work_subpage.css'

function Programming() {

  const [data, setData] = useState();
  useFetchAllWorks(setData, "Programming");

  if (!data) return <></>;

  return (
    <div className="work_container">
      <div className="work container">
        <div className="hidden"><h1><i className='fas fa-laptop' style={{ fontsize: "40px", marginright: "50px" }}></i>College Programmers</h1></div>
        <div className="hide">Utilizing technical know-how and problem-solving abilities, freelance programmers create and deploy specialized software solutions and applications in accordance with customer needs and project parameters.</div>
        <div className="boxes">

          <FreelanceJobs jobs={data} />
        </div>
      </div>
    </div>
  )
}

export default Programming