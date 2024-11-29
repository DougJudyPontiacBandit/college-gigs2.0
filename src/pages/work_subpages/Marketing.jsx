import '../../styles/subpage_styles/work_subpage.css'
import FreelanceJobs from "../../components/FreelanceJobs";
import { useState } from "react"
import { useFetchAllWorks } from "../../utils/helper"

function Marketing() {

  const [data, setData] = useState();
  useFetchAllWorks(setData, "Marketing");

  if (!data) return <></>;
  return (
    <div className='work_container'>
      <div className="work container">
        <div className="hidden"><h1><i className='fas fa-poll' style={{ fontSize: "40px", marginRight: "50px" }}></i>College Digital Marketers</h1></div>
        <div className="hide">Freelance digital marketing entails planning, putting into action, and refining online marketing campaigns across a range of media to assist organizations in enhancing their online presence, attracting target markets, and achieving their marketing goals.</div>

        <div className="boxes">

          <FreelanceJobs jobs={data} />
        </div>
      </div>
    </div>
  )
}

export default Marketing