import axios from "axios";
import { push, ref, remove, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Context/authProvider";
import { realtimeDbService } from "../../fBase";

const CampaignProgressDetail = ({ uid, fcmToken ,name, height, profile,simpleaddr, stroke, career, roundingFrequency, style1, style2, style3, igname, igfollower, igfollow, igmedia, bestImage1, bestImage2, bestImage3, token,checkedItemHandler, isSelected, isFollowed, checkedFcmTokenHandler, size, color}) => {
    const [bChecked, setChecked] = useState(false);
    const [userBestImage1, setUserBestImage1] = useState('');
    const [userBestImage2, setUserBestImage2] = useState('');
    const [userBestImage3, setUserBestImage3] = useState('');
    const [userMediaType1, setUserMediaType1] = useState('');
    const [userMediaType2, setUserMediaType2] = useState('');
    const [userMediaType3, setUserMediaType3] = useState('');
    const [userBestThumbnail1, setUserBestThumbnail1] = useState('');
    const [userBestThumbnail2, setUserBestThumbnail2] = useState('');
    const [userBestThumbnail3, setUserBestThumbnail3] = useState('');
    const {currentUser} = useAuth();
    const [userIsFollowed, setIsUserFollowed] = useState(isFollowed);
    let {id} = useParams();
                                               
    useEffect(() => {
        const getUserBestImages = async() => {
            try {   
                    // for 문 사용 가능         
                    const json1 = await axios.get(
                        `https://graph.facebook.com/v14.0/${bestImage1}?fields=media_url,media_type,thumbnail_url&access_token=${token}`                        
                    );

                    const json2 = await axios.get(
                        `https://graph.facebook.com/v14.0/${bestImage2}?fields=media_url,media_type,thumbnail_url&access_token=${token}`
                    )

                    const json3 = await axios.get(
                        `https://graph.facebook.com/v14.0/${bestImage3}?fields=media_url,media_type,thumbnail_url&access_token=${token}`
                    )                    
                    setUserBestImage1(json1.data.media_url);                    
                    setUserMediaType1(json1.data.media_type);
                    setUserBestThumbnail1(json1.data.thumbnail_url);
                    console.log(json1.data);                    

                    setUserBestImage2(json2.data.media_url);
                    setUserMediaType2(json2.data.media_type);
                    setUserBestThumbnail2(json2.data.thumbnail_url);
                    console.log(json2.data);

                    setUserBestImage3(json3.data.media_url);
                    setUserMediaType3(json3.data.media_type);
                    setUserBestThumbnail3(json3.data.thumbnail_url);                                
                    console.log(json3.data);
            } catch (error) {
                console.log(error);
            }
        };
        getUserBestImages();
    }, [])
    

    const checkHandler = ({target}) => {
        setChecked(!bChecked);
        checkedItemHandler(uid, target.checked);
        checkedFcmTokenHandler(fcmToken, target.checked);
        console.log(bChecked);
    }

    const follwedUserHandler = () => {
        try {
            update(ref(realtimeDbService, `brands/${currentUser.uid}/campaigns/${id}/followedUser`), {
                [uid] : uid
            });
            update(ref(realtimeDbService, `users/${uid}/campaigns/${id}/`), {
                isFollowed : true
        });
            setIsUserFollowed(true);
            console.log("follwing-success");
        } catch (error) {
            console.log(error);
        }              
    }

    const unfollowUserHandler = () => {
        try { 
            remove(ref(realtimeDbService, `brands/${currentUser.uid}/campaigns/${id}/followedUser/${uid}`));
            update(ref(realtimeDbService, `users/${uid}/campaigns/${id}/`), {
                isFollowed : false
            });
            setIsUserFollowed(false);
            console.log("unfollow");
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <CampaignProgressDetailCSS>            
                <div className="campaign-register-user">
                    <label className="selected-box">
                        <input className="selected-checkbox" type='checkbox' checked={bChecked} onChange={(e) => checkHandler(e)}/>
                    </label>

                    <div className="campaign-user-container">
                        
                        <div className="campaign-user-instagram-wrapper">
                            <div className="campaign-register-user-infos">
                                {userIsFollowed === true ? (
                                    <div className="user-name-container">                                    
                                        <img className="unfollowing" src="/images/image 121.png" alt="follow" onClick={unfollowUserHandler} />                                                                        
                                        <span className="user-name">{name}</span>
                                        <img className="user-profile-img" src={profile} alt="profile" />
                                    </div>
                                ) : (
                                    <div className="user-name-container">                                    
                                        <img className="unfollowing" src="/images/image 112.png" alt="unfollow" onClick={follwedUserHandler}/>                                                                        
                                        <span className="user-name">{name}</span>
                                        <img className="user-profile-img" src={profile} alt="profile" />
                                    </div>
                                )}
                                
                                <div className="user-profile-container">
                                    
                                    <span>{height}cm</span>
                                    <span>{simpleaddr}</span>
                                </div>
                                {size === 'free' && color === 'free' ? (
                                    <div className="user-golf-infos">
                                    <div className="golf-info-wrapper">
                                        <div className="user-golf-info">평균 타수 <span>{stroke}</span></div>
                                        <div className="user-golf-info">구력 <span>{career}차</span></div>
                                    </div>
                                    <div className="golf-info-wrapper">
                                        <div className="user-golf-info">월 라운딩 <span>{roundingFrequency}</span></div>    
                                        <div className="user-golf-info">스타일 <span> #{style1} #{style2} #{style3}</span></div>
                                    </div>                                                                                                 
                                </div>
                                ) : (
                                    <div className="user-golf-infos">
                                        <div className="golf-info-wrapper">
                                            <div className="user-golf-info">평균 타수 <span>{stroke}</span></div>
                                            <div className="user-golf-info">구력 <span>{career}차</span></div>
                                        </div>
                                        <div className="golf-info-wrapper">
                                            <div className="user-golf-info">월 라운딩 <span>{roundingFrequency}</span></div>    
                                            <div className="user-golf-info">스타일 <span> #{style1} #{style2} #{style3}</span></div>
                                        </div>  
                                        <div className="golf-info-wrapper">
                                            <div className="user-golf-info">size <span>{size}</span></div>    
                                            <div className="user-golf-info">color <span>{color}</span></div>
                                        </div>                                                                                               
                                    </div>
                                )}                                
                            </div>

                            <div className="user-instagram-infos-container">
                                <div className="user-instagram-logo-name">
                                    <a href={`https://www.instagram.com/${igname}`} className="instagram-link" target="_blank">
                                        <img className="instagram-logo" src="/images/image 120.png" alt="instagram" />
                                        <span className="user-instagram-name">{igname}</span>
                                    </a>
                                    
                                </div>
                                <div className="user-instagram-profile">
                                    <div className="user-instagram-profile-info">팔로워 <span>{igfollower}</span></div>
                                    <div className="user-instagram-profile-info">팔로우 <span>{igfollow}</span></div>
                                    <div className="user-instagram-profile-info">게시물 <span>{igmedia}</span></div>
                                </div>
                            </div>
                        </div>

                        {userBestImage1
                            ?            
                        <div className="user-images-container">
                            <div className="user-image">
                                
                                    <div className="user-images-wrapper">
                                        {userMediaType1 === 'VIDEO' ? (
                                            <a href={userBestImage1} target="_blank">
                                                <img src={userBestThumbnail1} alt="1" />                                                                                                            
                                            </a>
                                        ) : ( 
                                            <a href={userBestImage1} target="_blank">
                                                <img src={userBestImage1} alt = "1" />
                                            </a>
                                        )}
                                        {userMediaType2 === 'VIDEO' ? (
                                            <a href={userBestImage2} target="_blank">
                                                <img src={userBestThumbnail2} alt="2" />                                                                                                            
                                            </a>
                                        ) : (
                                            <a href={userBestImage2} target="_blank">
                                                <img src={userBestImage2} alt = "2" />
                                            </a>
                                        )}
                                        {userMediaType3 === 'VIDEO' ? (
                                            <a href={userBestImage3} target="_blank">
                                                <img src={userBestThumbnail3} alt="3" />                                                                                                            
                                            </a>
                                        ) : (
                                            <a href={userBestImage3} target="_blank">
                                                <img src={userBestImage3} alt = "3" />
                                            </a>
                                        )}                                                                           
                                    </div>                                                                                                                                            
                            </div>
                        </div>
                        :
                            <div className="empty-feed-wrapper">
                                <div className="empty-feed">이미지 업로드 전</div>
                                <div className="empty-feed">이미지 업로드 전</div>
                                <div className="empty-feed">이미지 업로드 전</div>
                            </div>
                        }
                    </div>                                        
            </div>            
        </CampaignProgressDetailCSS>
    )
}

const CampaignProgressDetailCSS = styled.div`
.campaign-register-user {
    display : flex;
    align-items : center;
    padding : 16px;
    margin-left : 16px;

    .selected-box {
        .selected-checkbox {
            appearance : none;
            
            margin : 0;
            font : inherit;
            color : #22Baa8;
            width : 1.15em;
            height : 1.15em;
            border : 0.15em solid #22Baa8;
            border-radius : 0.15em;
            transform : translateY(-0.075em);
            display : grid;
            place-content : center;
        }
        .selected-checkbox::before {
            content : '';
            
            clip-path : polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
            transform : scale(0);
            transform-origin : bottom left;
            transition : 120ms transform ease-in-out;
            box-shadow : inset 1em 1em #22Baa8;
            background-color : #22Baa8;
        }
        .selected-checkbox:checked {
            &::after {
                content: '✔';
                padding: 0;
                margin: 0;
            }
        }
    }
    
    .campaign-user-container {
        display : flex;

        .campaign-user-instagram-wrapper {
            display : grid;
            min-width : 700px;
            .user-instagram-infos-container {
                display : flex;
                align-items : center;
                border-radius : 13px;
                background : #f1f1f1;
                margin-left : 112px;
                padding : 13px;
                justify-content : space-between;
                .user-instagram-logo-name {                    
                    display : flex;
                    align-items : center;
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
                .user-instagram-profile {
                    display : flex;
                    .user-instagram-profile-info {
                        font-size : 11px;
                        color : #766F6F;
                        margin-left : 10px;
                        span {
                            color : #303030;
                            font-size : 11px;
                            margin-left : 6px;
                        }
                    }
                }
            }

            .campaign-register-user-infos {
                margin-left : 80px;
                margin-bottom : 8px;
                display : flex;
                .user-name-container {
                    display : flex;
                    align-items : center;
                    justify-content : space-evenly;
                    .unfollowing {
                        height : 21px;
                        width : 21px;
                    }
                    .user-name {
                        margin-left : 16px;
                        font-weight : 700;
                        font-size : 14px;
                        min-width : 100px;
                        text-align : center;
                    }
                    .user-profile-img {
                        margin-left : 16px;
                        border-radius : 50%;
                        width : 65px;
                        height : 65px;
                    }
                }

                .user-profile-container {
                    margin-left : 28px;
                    display : flex;
                    flex-direction : column;
                    justify-content : space-evenly;
                    
                    span {
                        color : #766F6F;
                        font-size : 12px;
                        font-weight : 400;
                    }
                }

                .user-golf-infos {
                    min-width : 285px;
                    margin-left : 28px;
                    display : grid;
                    padding : 12px;
                    border : 1px solid #f1f1f1;
                    border-radius : 13px;
                    .golf-info-wrapper {
                        display : flex;
                        justify-content : flex-start;
                        .user-golf-info {
                            padding : 8px;
                            color : #766F6F;
                            font-size : 11px;
                            font-weight : 400;
                            span {
                                color : #303030;
                                font-size : 12px;
                            }
                        }
                    }
                }
            }
        }

        .user-images-container {
            display : flex;
            justify-content : center;
            align-items : center;            
            .user-image {
                overflow-x : auto;
                .user-images-wrapper {
                    
                    a {
                        height : 150px;
                        width : 150px;
                        img {
                            margin-left : 16px;
                            width : 160px;
                            height : 160px;     
                            border-radius : 6px;                                                   
                        }
                    }
                    
                }
                                
            }
        }
        .empty-feed-wrapper {                    
            display : flex;            
            justify-content : center;
            align-items : center;                                                
            .empty-feed {
                display : flex;
                justify-content : center;
                text-align : center;                        
                font-size : 15px;                
                color : #ffffff;
                text-align : center;
                align-items : center;
                width : 160px;
                height : 160px;
                background: linear-gradient(180deg, rgba(131, 131, 131, 0.4) 0%, rgba(34, 186, 168, 0.25) 100%);
                border-radius: 6px;
                margin-left : 16px;
            }
        }
    }
    
    
    
}
`

export default CampaignProgressDetail;