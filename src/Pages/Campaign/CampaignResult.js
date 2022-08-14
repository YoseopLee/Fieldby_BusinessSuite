import axios from "axios";
import { child, get, getDatabase, ref, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../Components/Common/Spinner";
import ShipConfirm from "../../Components/Modal/ShipComfirm";
import ShipComplete from "../../Components/Modal/ShipComplete";
import { useAuth } from "../../Context/authProvider";
import { realtimeDbService } from "../../fBase";
import CampaignResultDetail from "./CampaignResultDetail";

const CampaignResult = () => {
    const {currentUser} = useAuth();    
    let {id} = useParams();
    const [userDatas, setUserDatas] = useState([]);    
    const [userName , setUserName] = useState([]);
    const [userPhone, setUserPhone] = useState([]);
    const [userAddr, setUserAddr] = useState([]);
    const [userShipName, setUserShipName] = useState([]);
    const [userShipNumber, setUserShipNumber] = useState([]);
    const [campaignTitle, setCampaignTitle] = useState('');
    const [campaignShipComplete, setCampaignShipComplete] = useState('');
    const [loading, setLoading] = useState(true);
    const [datas, setDatas] = useState('');
    const [campaignPrice, setCampaignPrice] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);   

    useEffect(() => {
        const dbRef = ref(getDatabase());
        const getCampaignSelectedUserData = async() => {
            get(child(dbRef, `brands/${currentUser.uid}/campaigns/${id}/selecteduser/`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const dataObj = snapshot.val();
                    console.log(dataObj);                    
                    setDatas(dataObj);                    
                    const data_ent = Object.entries(dataObj);
                    console.log(data_ent);
                    const data_ent_arr = data_ent.map((d) => Object.assign(d[1]));
                    console.log(data_ent_arr);
                    const newUsersArrays = [];
                    const userNameArr = [];
                    const userPhoneArr = [];
                    const userAddrArr = [];
                    const userShipNameArr = [];
                    const userShipNumberArr = [];
                    for (let i = 0; i < data_ent_arr.length; i++) {
                        get(child(dbRef, `users/${data_ent_arr[i]}`))
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                const userDataObj = snapshot.val();
                                console.log(userDataObj);
                                newUsersArrays.push(userDataObj);
                                userNameArr.push(userDataObj.name);
                                userPhoneArr.push(userDataObj.phoneNumber);
                                userAddrArr.push(userDataObj.address.roadAddr);
                                userShipNameArr.push(userDataObj.campaigns?.[id]?.shipment_name);
                                userShipNumberArr.push(userDataObj.campaigns?.[id]?.shipment_number);
                                console.log(newUsersArrays);
                                console.log(userNameArr);
                                console.log(userPhoneArr);
                                console.log(userAddrArr);
                                console.log(userShipNameArr);
                                console.log(userShipNumberArr);                                                                
                                setUserDatas([...newUsersArrays]);
                                setUserName([...userNameArr]);
                                setUserPhone([...userPhoneArr]);
                                setUserAddr([...userAddrArr]);
                                setUserShipName([...userShipNameArr]);
                                setUserShipNumber([...userShipNumberArr]);                                                           
                                setLoading(false);
                            } else {
                                console.log("No Data");
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
        getCampaignSelectedUserData();
    }, [])

    useEffect(() => {
        const dbRef = ref(getDatabase());
        const getCampaignData = async() => {
            get(child(dbRef, `brands/${currentUser.uid}/campaigns/${id}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const campaignData = snapshot.val();
                    console.log(campaignData.campaignTitle);
                    setCampaignTitle(campaignData.campaignTitle);
                    setCampaignShipComplete(campaignData.shipComplete);
                    console.log(campaignData.itemPrice);
                    setCampaignPrice(campaignData.itemPrice);
                } else {
                    console.log("No Data");
                }
            }).catch((error) => {
                console.log(error);
            })
        }
        getCampaignData();
    },[])

    const csvHeaders = [        
        { label : "이름", key : "name"},
        { label : "전화번호", key : "phone"},
        { label : "주소", key : "address"},
        { label : "택배사", key : "shipmentname"},
        { label : "송장번호", key : "shipmentnumber"},        
    ];

    const csvData = [
        {name : userName, phone : userPhone, address : userAddr, shipmentname : userShipName, shipmentnumber : userShipNumber}        
    ]

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const closeConfirmModal = () => {
        setConfirmModalOpen(false);
        window.location.reload();        
    }

    // const getShipInfo = (shipmentName, shipmentNumber) => {
    //     setShipName(shipmentName);
    //     setShipNumber(shipmentNumber);        
    // }

    // const sendShipMessage = () => {                                
    //         try {
    //             for (let i = 0; i < userDatas.length; i++) {
    //                 update(ref(realtimeDbService, `users/${userUid[i]}/campaigns/${id}`), {
    //                     shipment_name : shipName,
    //                     shipment_number : shipNumber,
    //                 })
    //             }

    //             update(ref(realtimeDbService, `brands/${currentUser.uid}/campaigns/${id}`), {
    //                 shipComplete : true,
    //             });

    //             for (let i = 0; i < userFcmToken.length; i++) {
    //                 const sendMsg = axios.post("https://fcm.googleapis.com/fcm/send", {            
    //                     "to" : userFcmToken[i],
    //                     "data" : {"type" : "item"},
    //                     "notification" : {"title" : `👍🏻'${campaignTitle}' 상품이 발송 완료! `, "body" : `'${campaignTitle}' 상품이 발송되었습니다! 운송장 번호를 확인해 주세요 :)`}            
    //                 }, {
    //                     headers : {
    //                         "Content-Type": "application/json",
    //                         "Authorization": "key=AAAAd3VbcvA:APA91bEE-_bu4E6TERxIVo0_66CjRQbfjIDB7FwiQJakRRv5rWVMK95R58UFCDUAS1l79mXKJQ_SQVwxjDgdST49rB43QJG-zD0Mmv6Zn2r4xJRAlNf5R-ZpJvmel3VWUSVAJK9bxOJO"
    //                     }
    //                 })
    //                 console.log(sendMsg);
    //             }
                
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //         setModalOpen(false);
    //         setConfirmModalOpen(true);                                                      
    //     }

    return (        
        <CampaignResultCSS>
            {datas ? (
                <>
                    {loading ? (
                        <div className="spinner-cm">
                            <Spinner />
                        </div>
                    ) : (
                        <table className="campaign-result-table"> 
                            <tbody>
                                <tr className="campaign-progress-table">
                                    <td className="campaign-progress-titles-number">                                        
                                        <span>번호</span>                                              
                                    </td>
                                    <td className="campaign-progress-titles-name">                                        
                                        <span>이름</span>                                        
                                    </td>
                                    <td className="campaign-progress-titles-phone">                                        
                                        <span>전화번호</span>                                           
                                    </td>
                                    <td className="campaign-progress-titles-address">                                
                                        <span>주소</span>                                            
                                    </td>
                                    <td className="campaign-progress-titles-post">                                        
                                        <span>송장번호</span>                                        
                                    </td>
                                    <td className="campaign-progress-titles-btn">
                                        <span>송장 적용하기</span>
                                    </td>
                                </tr>
                                <hr />        
                                {userDatas.map((userData, idx) => 
                                    <CampaignResultDetail 
                                        key={idx}
                                        id={idx + 1}
                                        name={userData.name}
                                        profile={userData.igInfo?.profileUrl}
                                        phoneNumber={userData.phoneNumber}
                                        zipno={userData.address.zipNo}
                                        roadaddress={userData.address.roadAddr}
                                        detailaddress={userData.address.detail}
                                        shipment_name={userData.campaigns?.[id]?.shipment_name}
                                        shipment_number={userData.campaigns?.[id]?.shipment_number}
                                        fcmToken={userData.fcmToken}
                                        uid={userData.uid}
                                        campaignTitle={campaignTitle}
                                        currentUser={currentUser}
                                        campaignId={id}
                                        campaignShipComplete={campaignShipComplete}
                                        itemPrice={campaignPrice}
                                    />
                                )}                                
                            </tbody>                                
                            <CSVLink headers={csvHeaders} data={csvData} filename={`${campaignTitle}-file.csv`} className="ship-download-btn">명단 다운로드</CSVLink>
                            
                            
                            {/*
                            <button className="ship-upload-btn">송장 일괄 업로드</button>                                
                            <button className="ship-btn" onClick={openModal}>송장 적용하기</button>
                            <ShipConfirm open={modalOpen} close={closeModal} confirm={sendShipMessage}>
                                 <span className="main-info">배송 정보를 정확하게 입력해주세요</span>                                
                            </ShipConfirm>
                            <ShipComplete open={confirmModalOpen} result={closeConfirmModal}>
                                <span className="complete-main-info">크리에이터에게 배송 정보를 전달했습니다.</span>
                            </ShipComplete> 
                            */}                                                                                                                                                                           
                        </table>                        
                    )}
                </>
            ) : (
                <div className="campaign-result-empty">
                    <img src="/images/campaign-empty.png" alt="no-campaign"/> 
                    <span>아직 선정된 크리에이터들이 없습니다.</span>
                </div>
            )}
            
            
        </CampaignResultCSS>
    )
}

const CampaignResultCSS = styled.div`
    margin-bottom : 100px;
    .spinner-cm {
        position : absolute;
        left : 50%;
        top : 50%;
        right : 50%;
        bottom : 50%;
        margin-top : auto;
        margin-bottom : auto;
        margin-right : auto;
        margin-left : auto;
    }
    .campaign-result-table {        
        margin-left : 40px;
        border-collapse: collapse;
        border-spacing: 0;
        width : calc(100% - 80px);
        .campaign-progress-table {
            display : flex;                        
            align-items : center;
            margin-bottom : 30px;
            .campaign-progress-titles-number {
                font-weight: 500;                
                position: relative;
                vertical-align: top;
                width : 10%;
                min-height: 32px;
                display : flex;
                align-items : center;
                justify-content : center;
                span {
                    text-align : center;
                    font-weight : 400;
                    font-size : 13px;
                }
            }
            .campaign-progress-titles-name {
                font-weight: 500;                
                position: relative;
                vertical-align: top;
                width : 15%;
                min-height: 32px;
                display : flex;
                align-items : center;
                justify-content : center;
                span {
                    text-align : right;
                    font-weight : 400;
                    font-size : 13px;
                }
            }
            .campaign-progress-titles-phone {
                font-weight: 500;                
                position: relative;
                vertical-align: top;
                width : 15%;
                min-height: 32px;
                display : flex;
                align-items : center;
                justify-content : flex-start;
                span {
                    text-align : center;
                    font-weight : 400;
                    font-size : 13px;
                }
            }
            .campaign-progress-titles-address {
                font-weight: 500;                
                position: relative;
                vertical-align: top;
                width : 40%;
                min-height: 32px;
                display : flex;
                align-items : center;
                justify-content : flex-start;
                span {
                    text-align : center;
                    font-weight : 400;
                    font-size : 13px;
                }
            }
            .campaign-progress-titles-post {
                font-weight: 500;                
                position: relative;
                vertical-align: top;
                width : 15%;
                min-height: 32px;
                display : flex;
                align-items : center;
                justify-content : center;                
                span {
                    text-align : center;
                    font-weight : 400;
                    font-size : 13px;
                }
            }

            .campaign-progress-titles-btn {
                font-weight: 500;                
                position: relative;
                vertical-align: top;
                width : 15%;
                min-height: 32px;
                display : flex;
                align-items : center;
                justify-content : center;
                margin-left : 36px;
                span {
                    text-align : center;
                    font-weight : 400;
                    font-size : 13px;
                }
            }

            .selected-data-name {
                color: inherit;
                fill: inherit;                
                position: relative;
                vertical-align: top;                              
                min-height: 32px;
                width : 15%;
                display : flex;
                align-items : center;
                justify-content : flex-start;
                    span {
                        color : #303030;
                        font-weight: 700;
                        font-size: 15px;
                        line-height: 18px;
                        text-align : center;
                    }

                    .selected-data-profile {
                        display : flex;
                        align-items : center;
                        
                        .selected-user-profile {
                            margin-left : 16px;
                            margin-right : 16px;
                            border-radius : 50%;
                            width : 65px;
                            height : 65px;
                        }
                        .selected-username {
                            font-size : 15px;
                            font-weight : 700;
                        }
                    }
            }
            .selected-data-number {
                color: inherit;
                fill: inherit;                
                position: relative;
                vertical-align: top;                              
                min-height: 32px;
                width : 10%;                
                display : flex;
                align-items : center;
                justify-content : center;             
                span {            
                    color : #303030;        
                    font-weight: 700;
                    font-size: 18px;
                    line-height: 18px;
                    text-align : center;
                }
            }
            .selected-data-phone {
                color: inherit;
                fill: inherit;                
                position: relative;
                vertical-align: top;                              
                min-height: 32px;
                width : 15%;
                display : flex;
                align-items : center;
                justify-content : flex-start;
                span {
                    color : #766F6F;
                    font-weight: 400;
                    font-size: 15px;
                    line-height: 18px;
                    text-align : center;
                }
            }
            .selected-data-address {
                color: inherit;
                fill: inherit;                
                position: relative;
                vertical-align: top;                              
                min-height: 32px;
                width : 45%;
                display : flex;                
                
                
                .address-wrapper {
                    align-items : center;
                    display : flex;
                    justify-content : flex-start;
                    width : 90%;
                    .address-flex-box {
                        display : flex;
                        flex-direction : column;
                        width : 100%;
                    }                                        
                    .shipment-names {
                        margin-left : 20px;
                        border: 1px solid #303030;
                        border-radius: 13px;
                        height : 48px;
                        width : calc(55%);
                        padding : 8px;
                    }
                }
                span {
                    color : #766F6F;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 18px;                    
                }
            }
            .selected-data-post {
                color: inherit;
                fill: inherit;                
                position: relative;
                vertical-align: top;                              
                min-height: 32px;
                width : 15%;
                display : flex;
                align-items : center;
                justify-content : flex-start;                
                .table-input {
                    border : none;
                    height : 48px;
                    background: #F1F1F1;
                    border-radius: 13px;
                    padding-left : 12px;
                    color : #766F6F;                    
                }
                span {
                    color : #766F6F;
                    font-weight: 400;
                    font-size: 15px;
                    line-height: 18px;
                    text-align : center;

                }
            }
            .selected-data-btn {
                width : 15%;
                display : flex;
                align-items : center;
                justify-content : center;
            }
        }
    }
    
    hr {
        border : 1px solid #303030;
        width : 100%;
        margin-top : 10px;
        margin-bottom : 20px;        
    }
    .campaign-result-empty {
        display : flex;
        flex-direction : column;
        align-items : center;
        padding-top : 300px;
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
        
    .ship-upload-btn {
        background : transparent;
        border : 1px solid #766F6F;
        border-radius : 5px;
        position : fixed;
        width : 160px;
        height: 48px;
        left : 80%;
        top : 85%;
        right : 0;
        bottom : 0;
        margin-left : auto;
        margin-right : auto;
        margin-top : auto;
        margin-bottom : auto;
        display : flex;
        align-items : center;
        justify-content : center;
        font-weight : 700;
        &:active {
            top : 85.1%;
            left : 80.1%;
        }
        &:hover {
            background : #22Baa8;
            color : #ffffff;
            border-color : #fff;
        }
    }
            
    .ship-download-btn {
        background : white;
        border : 1px solid #766F6F;
        border-radius : 5px;
        position : fixed;
        width : 160px;
        height: 48px;
        left : 80%;
        top : 85%;
        right : 0;
        bottom : 0;
        margin-left : auto;
        margin-right : auto;
        margin-top : auto;
        margin-bottom : auto;
        display : flex;
        align-items : center;
        justify-content : center;
        font-weight : 700;
        font-size : 14px;
        text-decoration : none;
        color : #000000;
        &:active {
            top : 85.1%;
            left : 80.1%;
        }
        &:hover {
            transition : all .3s;
            background : #22Baa8;
            color : #ffffff;
            border-color : #fff;
        }
    }

    .ship-btn {
        background : #303030;
        border-radius : 5px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
        border : 1px solid #e7e7e7;       
        height: 48px;        
        display : flex;
        align-items : center;
        justify-content : center;
        font-weight : 700;
        color : #ffffff;
        &:active {        
            top : 85.2%;
            left : 80.2%;
        }        
        &:hover {
            background : #22Baa8;
            transition : all .3s;                              
        }   
    }    
`
export default CampaignResult;