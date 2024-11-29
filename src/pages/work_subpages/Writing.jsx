import { useEffect, useState } from "react"
import FreelanceJobs from "../../components/FreelanceJobs";
import { useFetchAllWorks } from "../../utils/helper"
import '../../styles/subpage_styles/work_subpage.css'

function Writing() {

  const [data, setData] = useState();
  useFetchAllWorks(setData, "Proofreading and Writing");

  if (!data) return <></>;

  return (
    <div className="work_container">
      <div className="work container">
        <div className="hidden"><h1><i className='fas fa-edit' style={{ fontSize: "40px", marginRight: "50px" }}></i>College Writers</h1></div>
        <div className="hide">Freelance writing and editing entails delivering finished content to clients on a flexible schedule while guaranteeing accuracy, clarity, and adherence to the essential style.</div>
        <div className="boxes">

          <FreelanceJobs jobs={data} />
        </div>
      </div>
    </div>
  )
}

export default Writing