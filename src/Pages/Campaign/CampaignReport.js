import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { child, get, getDatabase, ref } from "firebase/database";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Context/authProvider";
import CampaignReportTop3 from "./CampaignReportTop3";

const CampaignReport = () => {

    const {currentUser} = useAuth();
    const {id} = useParams();
    const [userDatas, setUserDatas] = useState([]);
    const [campaignReachs, setCampaignReach] = useState(0);
    const [campaignAvgReaches, setCampaignAvgReaches] = useState(0);
    const [campaignImpressions, setCampaignImpressions] = useState(0);
    const [campaignEngagement, setCampaignEngagement] = useState(0);
    const [campaignAvgEngagement, setCampaignAvgEngagement] = useState(0);
    const [campaignSaved, setCampaignSaved] = useState(0);
    const [campaignLikes, setCampaignLikes] = useState(0);
    const [campaignAvgLikes, setCampaignAvgLikes] = useState(0);
    const [campaignComments, setCampaignComments] = useState(0);
    const [campaignAvgComments, setCampaignAvgComments] = useState(0);
    const [sumFollowers, setSumFollowers] = useState(0);
    const [campaignPrice, setCampaignPrice] = useState(0);    
    const [day, setDay] = useState('');
    const followerArray = [];
    const userArray = [];
    const userTokenArray = [];
    const postIdArray = [];
    const postIdArray2 = [];
    const reachArray = [];
    const likesArray = [];
    const commentsArray = [];
    const engagementArray = [];
    const impressionArray = [];

    useEffect(() => {
        const dbRef = ref(getDatabase());
        const getCompleteData = async() => {
            const json1 = await get(child(dbRef, `brands/${currentUser.uid}/campaigns/${id}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const dataObj = snapshot.val();
                    console.log(dataObj);
                    setCampaignPrice(dataObj.campaignPrice);
                } else {
                    console.log("No Data");
                }
            }).catch((error) => {
                console.log(error);
            })

            const json = await get(child(dbRef, `brands/${currentUser.uid}/campaigns/${id}/selecteduser`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const dataObj = snapshot.val();      
                    const data_ent = Object.entries(dataObj);
                    const data_ent_arr = data_ent.map((d) => Object.assign(d[1]));
                    console.log(data_ent_arr.length);
                    for (let i = 0; i < data_ent_arr.length; i++) {
                        get(child(dbRef, `users/${data_ent_arr[i]}`))
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                const userDataObj = snapshot.val();
                                console.log(userDataObj);
                                userArray.push(userDataObj);
                                console.log(userArray);
                                followerArray.push(userDataObj.igInfo?.followers);
                                const sum_followers = followerArray.reduce((a,b) => a + b, 0);
                                console.log(sum_followers);
                                setUserDatas([...userArray]);
                                setSumFollowers(sum_followers);                                                           
                                const userSelectedData = userDataObj.campaigns?.[id].images;
                                const userSelectedData2 = userDataObj.campaigns?.[id].images?.[1];                                
                                console.log(userSelectedData);
                                
                                postIdArray.push(userSelectedData);                                                                                               
                                postIdArray2.push(userSelectedData2);                                
                                console.log(postIdArray);
                                // console.log(postIdArray2);
                                // const newPostIdArray = [...postIdArray, ...postIdArray2]
                                // console.log(newPostIdArray);
                            

                                
                                const userSelectedToken = userDataObj.igInfo?.token;                                
                                console.log(userSelectedToken);
                                userTokenArray.push(userSelectedToken);    
                                console.log(userTokenArray);
                                
                                const getPostData = async() => {                                    
                                    try {                                            
                                        for (let j = 0; j < postIdArray.length; j++) {
                                            const json1 = await axios.get(
                                                // token에 권한이 없어서 불러오지 못함.
                                                `https://graph.facebook.com/v14.0/${postIdArray[i][j]}/insights?metric=reach&access_token=${userTokenArray[i]}`
                                            );
                                            console.log(json1.data);
    
                                            const json2 = await axios.get(
                                                `https://graph.facebook.com/v14.0/${postIdArray[i][j]}?fields=media_type,comments_count,like_count,media_url&access_token=${userTokenArray[i]}`
                                            );                                                                                                                                            
                                            console.log(json2.data);                            
                                                                                
                                            const reach = json1.data.data[0].values[0].value;
                                            console.log(reach);
                                            
                                            reachArray.push(reach);
                                            console.log(reachArray);
                                            const sumReach = reachArray.reduce((a,b) => a + b, 0);
                                            
                                            setCampaignReach(sumReach);
                                            const avgReach = Math.floor(sumReach / (j + 3));                                        
                                            
                                            setCampaignAvgReaches(avgReach);
    
                                            // const impressions = json1.data.data[1].values[0].value;
                                            
                                            // impressionArray.push(impressions);
                                            // const sum_Impression = impressionArray.reduce((a,b) => a+b, 0);
                                            // setCampaignImpressions(sum_Impression);
                                            // const engagement = json1.data.data[2].values[0].value;                                                                                
                                            // engagementArray.push(engagement);                                        
                                            // const sum_engagementArray = engagementArray.reduce((a,b) => a+b, 0);
                                            // setCampaignEngagement(sum_engagementArray);
                                            // const avgEngagement = Math.floor(sum_engagementArray / (i + 1));
                                            // setCampaignAvgEngagement(avgEngagement);                                        
                                            // const saved = json1.data.data[3].values[0].value;                                        
                                            // setCampaignSaved(saved);    
                                            const likes = json2.data.like_count;
                                            console.log(likes);                       
                                                                                    
                                            likesArray.push(likes);
                                            console.log(likesArray);                                                                                    
                                            const sum_likesArray = likesArray.reduce((a,b) => a + b, 0);                                    
                                            setCampaignLikes(sum_likesArray);
                                            const avg_likesArray = Math.floor(sum_likesArray / (j + 3));
                                            setCampaignAvgLikes(avg_likesArray); 

                                            const comments = json2.data.comments_count; 
                                            console.log(comments);                     
                                            commentsArray.push(comments);
                                            const sum_commentsArray = commentsArray.reduce((a,b) =>  a+b, 0);                  
                                            setCampaignComments(sum_commentsArray);
                                            const avg_commentsArray = Math.floor(sum_commentsArray / (j + 3));
                                            setCampaignAvgComments(avg_commentsArray);
                                        }                   
                                            
                                                                                                                     
                                                                                                                                                                                                                                                                
                                    } catch (error) {
                                        console.log(error);
                                    }                                    
                                }
                                getPostData();

                            } else {
                                console.log("No data");
                            }
                        }).catch((error) => {
                            console.log(error);
                        })
                    }                                                            
                } else {
                    console.log("No data");
                }

            }).catch((error) => {
                console.log(error);
            })                         
        }
                
        getCompleteData();
    }, []);

    useEffect(() => {
        const getToday = () => {
            const today = new Date();
            const day = today.getDate();
            const month = ("0" + (1 + today.getMonth())).slice(-2);
            const time = today.getHours();
            console.log(today);
            setDay(`${month} / ${day}, ${time}:00`);
            
            
        }
        getToday();
    }, [])
    

    const data = [
        {
          "country": '실시간 인사이트',
          "총 인터렉션": campaignLikes + campaignComments,
          "총 인터렉션Color": "hsl(93, 70%, 50%)",
          "총 도달": campaignReachs,
          "총 도달Color": "hsl(106, 70%, 50%)",
          "총 노출": campaignImpressions,
          "총 노출Color": "hsl(60, 70%, 50%)",                                            
        },       
      ]

    const colors = ["#22Baa8", "#797979", "#dcdcdc"];
            
    return (
        <CampaignReportCSS>
            <div className="report-container">
                <span className="report-container-title">총 도달 수</span>                
                <span className="report-reach-count">{campaignReachs.toLocaleString('ko-KR')}</span>                
                <span className="report-container-title">평균 도달 수</span>
                <span className="report-reach-avg-count">{campaignAvgReaches.toLocaleString('ko-KR')}</span>                
                <span className="report-container-text">*도달은 ‘계정을 본 사람 수’를 말합니다.</span>
            </div>
            <div className="report-container">
                <span className="report-container-title">총 인터렉션 수</span>                
                <span className="report-interaction-count">{(campaignLikes + campaignComments).toLocaleString('ko-KR')}</span>                                
                <span className="report-container-title">평균 인터렉션 수</span>
                <span className="report-interaction-avg-count">{(campaignAvgLikes + campaignAvgComments).toLocaleString('ko-KR')}</span>                                
                <span className="report-container-text">*인터렉션은 댓글과 좋아요, 저장됨을 모두 합친 수 입니다.</span>
            </div>
            <div className="report-container">
                <span className="report-container-title">총 팔로워</span>
                <span className="report-followers">{sumFollowers.toLocaleString('ko-KR')}</span>
                <span className="report-container-text">*캠페인 진행 인플루언서의 도합 팔로워 수 입니다.</span>                
                <div className="report-line"/>
                <span className="report-container-title">도달 당 비용</span>
                <span className="report-followers">{(campaignPrice/campaignReachs).toFixed(1)}원</span>
                <span className="report-container-text2">*도달은 콘텐츠를 본사람의 숫자로 여러번 노출되어도 1번의 도달로 계산합니다.</span>
            </div>

            
            <div className="report-container">
                <span className="report-container-title">BEST 포스팅 TOP 3</span>
                
                <div className="report-best-wrapper">                    
                {userDatas.map((userData, idx) =>    
                    <CampaignReportTop3 
                        key={idx}
                        profileUrl={userData.igInfo?.profileUrl}
                        username={userData.igInfo?.username}                            
                        userPostId={userData.campaigns?.[id]?.images?.[0]}
                        userToken={userData.igInfo?.token}
                    />                                                                                 
                )}                                                                                                          
                </div>                
            </div>
            

            <div className="report-container">
                <span className="report-container-title">인사이트 데이터</span>
                <div className="report-graph-container">
                    <ResponsiveBar 
                        data={data}
                        keys={[
                            '총 인터렉션',
                            '총 도달',
                            '총 노출',                                                                            
                        ]}
                        indexBy="country"
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        padding={0.7}
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        colors={colors}                                                                        
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#38bcb2',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#eed312',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}                        
                        borderColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    1.6
                                ]
                            ]
                        }}                        
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: '총 도달 수 / 총 노출 수 / 총 인터렉션 수',
                            legendPosition: 'middle',
                            legendOffset: 32
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: '',
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    1.6
                                ]
                            ]
                        }}
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 20,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                        role="application"
                        ariaLabel="Nivo bar chart demo"
                        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
                    />
                </div>
            </div>
        </CampaignReportCSS>
    )
}

const CampaignReportCSS = styled.div`
    padding : 20px;
    display : grid;
    gap : 20px;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(100px, auto);
    .report-container {
        background : #fff;
        box-shadow : 2px 2px 10px rgba(0,0,0, 0.07);
        border-radius : 5px;
        padding : 16px;

        .report-container-title {
            font-weight : 700;            
            color : #303030;
        }

        .report-container-text {
            color : #939393;
            font-size : 10px;
            margin-top : 5px;
        }

        .report-text-wrapper {
            display : flex;
            justify-content : space-between;
            width : calc(100% - 12px);
        }
    }

    .report-container:nth-child(1) {
        display : flex;
        flex-direction : column;
        .report-reach-count {
            font-family: 'Yoon Gothic 700';
            font-style: normal;
            font-weight: 700;
            font-size: 42px;
            color : #303030;
            margin-top : 20px;
            margin-bottom : 30px;
        }
        .report-reach-avg-count {
            font-family: 'Yoon Gothic 700';
            font-style: normal;
            font-weight: 700;
            font-size: 32px;
            color : #303030;
            margin-top : 20px;
            margin-bottom : 20px;
        }
        .report-impressions-text {
            font-family: 'Apple SD Gothic Neo';
            font-style: normal;
            font-weight: 700;
            color : #303030;
            margin-top : 24px;
        }
    }
    .report-container:nth-child(2) {
        display : flex;
        flex-direction : column;
        .report-interaction-count {
            font-family: 'Yoon Gothic 700';
            font-style: normal;
            font-weight: 700;
            font-size: 42px;
            color : #303030;
            margin-top : 20px;
            margin-bottom : 30px;
        }
        .report-interaction-avg-count {
            font-family: 'Yoon Gothic 700';
            font-style: normal;
            font-weight: 700;
            font-size: 32px;
            color : #303030;
            margin-top : 20px;
            margin-bottom : 20px;
        }
        .report-interaction-text {
            font-family: 'Apple SD Gothic Neo';
            font-style: normal;
            font-weight: 700;
            color : #303030;
            margin-top : 24px;
            justify-content : space-between;
        }
    }
    .report-container:nth-child(3) {
        display : flex;
        flex-direction : column;
        .report-followers {
            margin-top : 24px;
            font-family: 'Yoon Gothic 700';
            font-style: normal;
            font-weight: 700;
            font-size: 32px;
            color : #303030;
        }
        .report-container-text {
            margin-bottom : 36px;
        }
        .report-container-text2 {
            color : #939393;
            font-size : 10px;
            margin-top : 5px;
        }
        .report-line {
            border : 1px solid #303030;
            margin-bottom : 36px;
        }

    }
    
    .report-container:nth-child(4) {
        grid-column : 1 / 4;
        .report-best-wrapper {
            display : flex;
            justify-content : space-evenly;
            padding : 15px;
            margin-top : 15px;
            .report-best-box {
                display : flex;
                flex-direction : column;
                border : 1px solid #dcdcdc;
                border-radius : 6px;
                .report-best-image {
                    width : 180px;
                    height : 180px;
                    border-radius : 6px;
                }
                .user-instagram-logo-name {                                        
                    display : flex;
                    justify-content : space-around;
                    align-items : center;
                    margin-top : 12px;
                    margin-bottom : 24px;
                    .instagram-link{
                        text-decoration : none;
                        display : flex;
                        align-items : center;
                        .instagram-logo {
                            height : 20px;
                            width : 20px;
                        }
                        .user-instagram-name {
                            margin-left : 8px;
                            font-size : 12px;
                            color : #303030;
                            font-weight : 400;
                        }
                    }
                                        
                }
                .report-user-info-box {
                    display : grid;
                    gap : 20px;
                    justify-content : center;
                    background-color : #f1f1f1;
                    padding : 12px;
                    border-radius : 12px;
                    .report-user-info {
                        color: #303030;
                        font-size: 13px;
                    }
                }
            }
        }        
    }
    .report-container:nth-child(5) {
        grid-column : 1 / 4;
        .report-graph-container {
            height : 400px;
        }
    }
`

export default CampaignReport;