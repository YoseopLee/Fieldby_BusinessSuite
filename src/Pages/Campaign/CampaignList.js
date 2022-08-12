import React from "react";
import { Link } from "react-router-dom";

const CampaignList = ({id, mainImageUrl,campaignTitle, recruitingDate, dueDate,recruitingNumber}) => {
    return (
        <tr className="campaign-list-progress-table">
            <Link to = {`/campaign/${id}/progress`} className="campaign-list">             
                <td className="campaign-data-progress">
                    <span>진행중</span>
                </td>
                <td className="campaign-data-profile">
                    <div className="campaign-data-wrapper">
                        <div className="campaign-main-image-box">
                            <img className="campaign-main-image" src={mainImageUrl} alt="mainImage" />
                        </div>
                        <span>{campaignTitle}</span>
                    </div>                    
                </td>
                <td className="campaign-data-date">
                    <span>{recruitingDate.replace(/\-/g, '.')} - {dueDate.replace(/\-/g, '.')}</span>
                </td>                
                <td className="campaign-data-number">
                    <span>{recruitingNumber}명</span>
                </td>            
            
            </Link>
            <hr />
        </tr>
        
    )
}

export default CampaignList;