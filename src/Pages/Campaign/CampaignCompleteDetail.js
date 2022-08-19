import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "../../Components/Common/Spinner";

const CampaignCompleteDetail = ({igname, followers, token, postImageUrl}) => {

    const [postImage, setPostImage] = useState('');
    const [postComments, setPostComments] = useState('');
    const [postLikes, setPostLikes] = useState('');
    const [postType, setPostType] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPostDatas = async() => {
            try {
                // post Data
                const json1 = await axios.get(
                    `https://graph.facebook.com/v14.0/${postImageUrl}?fields=media_type,media_url&access_token=${token}`
                );

                const json2 = await axios.get(
                    `https://graph.facebook.com/v14.0/${postImageUrl}?fields=comments_count&access_token=${token}`
                );

                const json3 = await axios.get(
                    `https://graph.facebook.com/v14.0/${postImageUrl}?fields=like_count&access_token=${token}`
                );
                console.log(json1.data);
                setLoading(false);
                setPostImage(json1.data.media_url);
                setPostType(json1.data.media_type);
                setPostComments(json2.data.comments_count);
                setPostLikes(json3.data.like_count);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getPostDatas();
    }, [])

    return (        
        <CampaignCompleteDetailCSS>
            {postImageUrl ? (
                <>
                {loading ? (
                    <div className="spinner-cm">
                        <Spinner />
                    </div>
                ) : (
                    <div className="campaign-complete-details">
                        <div className="camapaign-complete-detail-info-wrapper">
                            {postType === 'VIDEO' ? (
                                <a href={postImage} target="_blank">
                                    <video src={postImage} alt="posted" className="campaign-complete-detail-img"/>
                                </a>
                                
                            ) : 
                            (   
                                <a href={postImage} target="_blank">
                                    <img src={postImage} alt="posted" className="campaign-complete-detail-img"/>
                                </a>
                                
                            )}  
                        </div>

                        <div className="user-instagram-logo-name">
                            <a href={`https://www.instagram.com/${igname}`} className="instagram-link" target="_blank">
                                <img className="instagram-logo" src="/images/image 120.png" alt="instagram" />
                                <span className="user-instagram-name">{igname}</span>
                            </a>
                        </div>

                        <div className="campaign-complete-detail-user-info">
                            <span className="camapaign-complete-detail-likes">좋아요 &nbsp;{postLikes}</span>                                                
                            <span className="camapaign-complete-detail-comments">댓글 &nbsp;{postComments}</span>
                            <span className="camapaign-complete-detail-followers">팔로워 &nbsp;{followers}</span>
                        </div>                                                                                                        
                    </div>
                )}
                </>
            ) : (
                null
            )}                        
        </CampaignCompleteDetailCSS>
    )
}

const CampaignCompleteDetailCSS = styled.div`
    .spinner-cm {

    }

    .campaign-complete-details {
        .camapaign-complete-detail-info-wrapper {
            .campaign-complete-detail-img {
                width : 100%;
                height : 100%;
            }
        }
        .user-instagram-logo-name {                    
            display : flex;
            align-items : center;
            padding : 12px;
            .instagram-link{
                text-decoration : none;
                display : flex;
            }
            .instagram-logo {
                height : 15px;
                width : 15px;
            }
            .user-instagram-name {
                margin-left : 8px;
                font-size : 12px;
                color : #303030;
                font-weight : 400;
            }            
        }

        .campaign-complete-detail-user-info {
            display : flex;
            padding : 16px;
            background-color : #f1f1f1;
            border-radius : 13px;
            justify-content : space-between;
            align-items : center;
            span {
                font-size : 12px;            
            }
        }
    }
    
`

export default CampaignCompleteDetail;