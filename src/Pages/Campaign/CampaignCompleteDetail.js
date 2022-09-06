import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "../../Components/Common/Spinner";

const CampaignCompleteDetail = ({igname, followers, token, postImageUrl, postImageUrl2}) => {

    const [postImage, setPostImage] = useState('');
    const [postImage2, setPostImage2] = useState('');
    const [postComments, setPostComments] = useState('');
    const [postComments2, setPostComments2] = useState('');
    const [postLikes, setPostLikes] = useState('');
    const [postLikes2, setPostLikes2] = useState('');
    const [postType, setPostType] = useState('');
    const [postType2, setPostType2] = useState('');
    const [postThumbnail, setPostThumbnail] = useState('');
    const [postThumbnail2, setPostThumbnail2] = useState('');
    const [postLink, setPostLink] = useState('');
    const [postLink2, setPostLink2] = useState('');
    const [loading, setLoading] = useState(true);
    const userPostArray = [];

    useEffect(() => {
        const getPostDatas = async() => {
            try {
                    if (postImageUrl2) {
                        // post Data
                    const json1 = await axios.get(
                        `https://graph.facebook.com/v14.0/${postImageUrl}?fields=media_type,media_url,thumbnail_url,permalink&access_token=${token}`
                    );

                    const json2 = await axios.get(
                        `https://graph.facebook.com/v14.0/${postImageUrl}?fields=comments_count&access_token=${token}`
                    );

                    const json3 = await axios.get(
                        `https://graph.facebook.com/v14.0/${postImageUrl}?fields=like_count&access_token=${token}`
                    );

                    const json4 = await axios.get(
                        `https://graph.facebook.com/v14.0/${postImageUrl2}?fields=media_type,media_url,thumbnail_url,permalink&access_token=${token}`
                    )

                    const json5 = await axios.get(
                        `https://graph.facebook.com/v14.0/${postImageUrl2}?fields=comments_count&access_token=${token}`
                    );

                    const json6 = await axios.get(
                        `https://graph.facebook.com/v14.0/${postImageUrl2}?fields=like_count&access_token=${token}`
                    );
                    console.log(json1.data);
                    console.log(json4.data);
                    setLoading(false);
                    setPostImage(json1.data.media_url);
                    setPostType(json1.data.media_type);                
                    setPostThumbnail(json1.data.thumbnail_url);
                    setPostLink(json1.data.permalink);
                    setPostComments(json2.data.comments_count);
                    setPostLikes(json3.data.like_count);

                    setPostImage2(json4.data.media_url);
                    setPostType2(json4.data.media_type);
                    setPostThumbnail2(json4.data.thumbnail_url);
                    setPostLink2(json4.data.permalink);
                    setPostComments2(json5.data.comments_count);
                    setPostLikes2(json6.data.like_count);
                } else {
                    // post Data
                    const json1 = await axios.get(
                        `https://graph.facebook.com/v14.0/${postImageUrl}?fields=media_type,media_url,thumbnail_url,permalink&access_token=${token}`
                    );

                    const json2 = await axios.get(
                        `https://graph.facebook.com/v14.0/${postImageUrl}?fields=comments_count&access_token=${token}`
                    );

                    const json3 = await axios.get(
                        `https://graph.facebook.com/v14.0/${postImageUrl}?fields=like_count&access_token=${token}`
                    );

                    // const json4 = await axios.get(
                    //     `https://graph.facebook.com/v14.0/${postImageUrl2}?fields=media_type,media_url,thumbnail_url,permalink&access_token=${token}`
                    // )

                    // const json5 = await axios.get(
                    //     `https://graph.facebook.com/v14.0/${postImageUrl2}?fields=comments_count&access_token=${token}`
                    // );

                    // const json6 = await axios.get(
                    //     `https://graph.facebook.com/v14.0/${postImageUrl2}?fields=like_count&access_token=${token}`
                    // );
                    console.log(json1.data);
                    // console.log(json4.data);
                    setLoading(false);
                    setPostImage(json1.data.media_url);
                    setPostType(json1.data.media_type);                
                    setPostThumbnail(json1.data.thumbnail_url);
                    setPostLink(json1.data.permalink);
                    setPostComments(json2.data.comments_count);
                    setPostLikes(json3.data.like_count);

                    // setPostImage2(json4.data.media_url);
                    // setPostType2(json4.data.media_type);
                    // setPostThumbnail2(json4.data.thumbnail_url);
                    // setPostLink2(json4.data.permalink);
                    // setPostComments2(json5.data.comments_count);
                    // setPostLikes2(json6.data.like_count);
                }
                

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getPostDatas();
    }, [])

    return (        
        <>
        {postImage || postImage2 || postThumbnail || postImageUrl2 ? (
            <CampaignCompleteDetailCSS>
            {loading ? (
                <div className="spinner-cm">
                    <Spinner />
                </div>
            ) : (
                <>
                    <div className="campaign-complete-details">
                        <div className="camapaign-complete-detail-info-wrapper">
                            {postType === 'VIDEO' ? (                                
                                <a href={postLink} target="_blank">
                                    {postImage === undefined ? (
                                        <img src={postThumbnail} alt="posted" className="campaign-complete-detail-img"/>    
                                    ) : (
                                        <video autoPlay loop src={postImage} alt="posted" className="campaign-complete-detail-img"/>
                                    )}
                                    
                                </a>                                                            
                            ) : (                                   
                                <a href={postLink} target="_blank">
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
                    {postImageUrl2 ? (
                        <div className="campaign-complete-details2">
                        <div className="camapaign-complete-detail-info-wrapper">
                            {postType2 === 'VIDEO' ? (                                
                                <a href={postLink2} target="_blank">
                                    {postImage2 === undefined ? (
                                        <img src={postThumbnail2} alt="posted" className="campaign-complete-detail-img"/>    
                                    ) : (
                                        <video autoPlay loop src={postImage2} alt="posted" className="campaign-complete-detail-img"/>
                                    )}
                                    
                                </a>                                                            
                            ) : 
                            (                                   
                                <a href={postLink2} target="_blank">
                                    <img src={postImage2} alt="posted" className="campaign-complete-detail-img"/>                                    
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
                            <span className="camapaign-complete-detail-likes">좋아요 &nbsp;{postLikes2}</span>                                                
                            <span className="camapaign-complete-detail-comments">댓글 &nbsp;{postComments2}</span>
                            <span className="camapaign-complete-detail-followers">팔로워 &nbsp;{followers}</span>
                        </div>                                                                                                        
                    </div>
                    ) : (
                        null
                    )}
                    
                </>
            )}                                                                                                      
        </CampaignCompleteDetailCSS>
        ) : (
            null
        )}
        </>
    )
}

const CampaignCompleteDetailCSS = styled.div`
    .spinner-cm {
        position : absolute;
        left : 50%;
        top : 50%;
        right : 50%;
        bottom : 50%;
        margin : auto;
    }

    .campaign-complete-details {
        .camapaign-complete-detail-info-wrapper {            
            position : relative;
            overflow : hidden;
            height : 350px;
            .campaign-complete-detail-img {
                position: absolute;
                width: 100%;
                /* height: 100%; */
                top: 50%; 
                left: 50%;
                transform: translate(-50%, -50%);   
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

    .campaign-complete-details2 {
        margin-top : 50px;
        .camapaign-complete-detail-info-wrapper {            
            position : relative;
            overflow : hidden;
            height : 350px;
            .campaign-complete-detail-img {
                position: absolute;
                width: 100%;
                /* height: 100%; */
                top: 50%; 
                left: 50%;
                transform: translate(-50%, -50%);   
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