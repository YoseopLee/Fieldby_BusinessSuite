import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../Components/Common/Spinner";
import { useAuth } from "../../Context/authProvider";
import CampaignCompleteDetail from "./CampaignCompleteDetail";

const CampaignComplete = () => {

    const {currentUser} = useAuth();
    const {id} = useParams();
    const [userDatas, setUserDatas] = useState([]);
    const [userPostDatas, setUserPostDatas] = useState([]);    
    const userPostArray = [];

    useEffect(() => {
        const dbRef = ref(getDatabase());
        const getPostedData = async() => {
            const json = await get(child(dbRef, `brands/${currentUser.uid}/campaigns/${id}/selecteduser/`))
            .then((snapshot) => {
                if(snapshot.exists()) {
                    const dataObj = snapshot.val();
                    console.log(dataObj);
                    const data_ent = Object.entries(dataObj);
                    console.log(data_ent);
                    const data_ent_arr = data_ent.map((d) => Object.assign(d[1]));
                    console.log(data_ent_arr);
                    const userArray = [];
                    for (let i = 0; i < data_ent_arr.length; i++) {
                        get(child(dbRef, `users/${data_ent_arr[i]}`))
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                const userDataObj = snapshot.val();
                                console.log(userDataObj);
                                userArray.push(userDataObj);
                                console.log(userArray);                            
                                setUserDatas([...userArray]);                                
                                const userSelectedData = userDataObj.campaigns;
                                const userPost = userDataObj.campaigns?.[id].images?.[0];
                                userPostArray.push(userPost);
                                console.log(userPostArray);
                                
                                console.log(userPostArray);
                                setUserPostDatas(userPost);
                                console.log(userSelectedData);                                                          
                            } else {
                                console.log("No data");
                            }
                        }).catch((error) => {
                            console.log(error);
                        })
                    }
                } else {
                    console.log("No Data");
                }
            }).catch((error) => {
                console.log(error);
            })
        }
        getPostedData();
    }, [])

    return (
        <CampaignCompleteCSS>
            {userPostArray ? (
                <>
                <span className="campaign-complete-title">완료 포스팅</span>            
                <div className="campaign-complete-posts-wrapper">
                    {userDatas.map((userData, idx) =>
                        <CampaignCompleteDetail 
                            key={idx}
                            igname={userData.igInfo?.username}
                            followers={userData.igInfo?.followers}
                            token={userData.igInfo?.token}
                            postImageUrl={userData.campaigns?.[id]?.images?.[0]}
                            postImageUrl2={userData.campaigns?.[id]?.images?.[1]}                            
                        />
                    )}
                </div>
                </>
            ) : (
                <div className="campaign-empty">
                    <img src="/images/campaign-empty.png" alt="no-campaign"/> 
                    <span>아직 포스트를 등록한 인플루언서가 없습니다.</span>                    
                </div>
            )}            
                    
                
           
        </CampaignCompleteCSS>
    )
}

const CampaignCompleteCSS = styled.div`
    margin-top : 40px;
    padding-left : 120px;
    padding-right : 120px;
    .campaign-complete-title {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        color : #303030;
        margin-bottom : 60px;
    }
    .campaign-complete-posts-wrapper {
        display : grid;  
        grid-template-columns: repeat(3, 1fr);
	    grid-template-rows: repeat(3, minmax(100px, auto));  
        gap : 50px 25px;    
        margin-top : 50px;
    }
    .campaign-complete-empty {
        display : flex;
        flex-direction : column;
        align-items : center;
        margin-top : 100px;        
        img {
            width : 65px;
            height : 65px;
        }

        .campaign-not-yet {
            margin-top : 16px;
            font-style: normal;
            font-weight: 700;            
            line-height: 19px;
            color : #303030;
        }

        .campaign-not-yet-light {
            margin-top : 8px;
            font-size : 13px;
            color : #303030;
        }
    }

    .campaign-empty {
        display : flex;
        flex-direction : column;
        align-items : center;
        padding-top : 200px;
        img {
            width : 65px;
            height : 65px;
        }

        span {
            margin-top : 16px;
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 19px;
            color : #303030;
        }
    }
`

export default CampaignComplete;