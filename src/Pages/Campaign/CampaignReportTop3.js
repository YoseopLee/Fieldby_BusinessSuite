import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CampaignReportTop3 = ({key, profileUrl, username, userPostId, userToken}) => {
    const [impressions, setImpressions] = useState(0);
    const [reaches, setReaches] = useState(0);
    const [engagements, setEngagements] = useState(0);
    const [plays, setPlays] = useState(0);
    const [mediaUrl, setMediaUrl] = useState('');
    const [mediaType, setMediaType] = useState('');
    const [thumnail, setPostThumbnail] = useState('');
    const [mediaLink, setMediaLink] = useState('');

    useEffect(() => {
                
        const getPostData = async() => {
            try {                

                const json2 = await axios.get(
                    `https://graph.facebook.com/v14.0/${userPostId}?fields=media_url,media_type,thumbnail_url,permalink&access_token=${userToken}`
                );
                // console.log(json2.data);
                            
                const media_url = json2.data.media_url;
                // console.log(media_url);
                setMediaUrl(media_url);
                const media_type = json2.data.media_type;
                setMediaType(media_type);

                const thumbnail_url = json2.data.thumbnail_url;
                setPostThumbnail(thumbnail_url);
                const perma_link = json2.data.permalink;
                setMediaLink(perma_link);
                
                if (media_type === 'VIDEO') {
                    const json1 = await axios.get(
                        `https://graph.facebook.com/v14.0/${userPostId}/insights?metric=reach,plays&access_token=${userToken}`
                    );
                    // console.log(json1.data);
    
                    const reach = json1.data.data[0].values[0].value;
                    setReaches(reach);
                    // const impression = json1.data.data[1].values[0].value;
                    // setImpressions(impression);
                    // const engagement = json1.data.data[2].values[0].value;
                    // setEngagements(engagement);
                    const play = json1.data.data[1].values[0].value;
                    setPlays(play);
                } else {
                    const json1 = await axios.get(
                        `https://graph.facebook.com/v14.0/${userPostId}/insights?metric=reach,impressions,engagement&access_token=${userToken}`
                    );
                    // console.log(json1.data);
    
                    const reach = json1.data.data[0].values[0].value;
                    setReaches(reach);
                    const impression = json1.data.data[1].values[0].value;
                    setImpressions(impression);
                    const engagement = json1.data.data[2].values[0].value;
                    setEngagements(engagement);
                }
                
                                
            } catch (error) {
                console.log(error);
            }
        }
        getPostData();
    }, [])

    return (
        <CampaignReportTop3CSS>
            {mediaUrl ? (
                <div className="report-best-box">
                    {mediaType === 'VIDEO' ? (
                        <a href={mediaLink} target="_blank">
                            {mediaUrl === undefined ? (
                                <img src={thumnail} alt="posted" className="report-best-image"/>
                            ) : (
                                <video autoPlay loop src={mediaUrl} className="report-best-image"/>
                            )}                                                                        
                        </a> 
                    ) : (
                        <a href={mediaLink} target="_blank">
                            <img src={mediaUrl} alt="best-img" className="report-best-image"/>
                        </a>
                    )}
                                           
                <div className="user-instagram-logo-name">
                    <a href={`https://www.instagram.com/${username}`} className="instagram-link" target="_blank">
                        <img className="instagram-logo" src="/images/image 120.png" alt="instagram" />
                        <span className="user-instagram-name">{username}</span>
                    </a>                                
                </div>
                <div className="report-user-info-box">
                    {mediaType === 'VIDEO' ? (
                        <span className="report-user-info">노출 {plays}</span>
                    ) : (
                        <span className="report-user-info">노출 {impressions}</span>
                    )}                                                    
                    <span className="report-user-info">도달 {reaches}</span>
                    <span className="report-user-info">좋아요+댓글 {engagements}</span>                                                            
                </div>
            </div>
            ) : (
                null
            )}                                                                                   
            
        </CampaignReportTop3CSS>
    )
}

const CampaignReportTop3CSS = styled.div`

`

export default CampaignReportTop3;