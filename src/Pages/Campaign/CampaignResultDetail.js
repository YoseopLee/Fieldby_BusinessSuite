import axios from "axios";
import { ref, update } from "firebase/database";
import React, { useState } from "react";
import ShipConfirm from "../../Components/Modal/ShipComfirm";
import ShipComplete from "../../Components/Modal/ShipComplete";
import { realtimeDbService } from "../../fBase";
const CampaignResultDetail = ({id, name, profile, phoneNumber, zipno,roadaddress, detailaddress, shipment_name, shipment_number, fcmToken ,uid, campaignTitle, currentUser, campaignId, campaignShipComplete, itemPrice }) => {
    const [shipName, setShipName] = useState('');
    const [shipNumber, setShipNumber] = useState('');
    const [modalOpen, setModalOpen] = useState(false);    
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    const shipInfoHandler = () => {
        update(ref(realtimeDbService, `users/${uid}/campaigns/${campaignId}`), {
            shipment_name : shipName,
            shipment_number : shipNumber,
        })

        update(ref(realtimeDbService, `users/${uid}/`), {
            reward : itemPrice
        })

        update(ref(realtimeDbService, `brands/${currentUser.uid}/campaigns/${campaignId}`), {
            shipComplete : true
        })

        axios.post("https://fcm.googleapis.com/fcm/send", {
            "to" : fcmToken,
            "data" : {"type" : "item"},
            "notification" : {"title" : `👍🏻'${campaignTitle}' 상품이 발송 완료! `, "body" : `'${campaignTitle}' 상품이 발송되었습니다! 운송장 번호를 확인해 주세요 :)`}
        }, {
            headers : {
                "Content-Type" : "application/json",
                "Authorization": "key=AAAAd3VbcvA:APA91bEE-_bu4E6TERxIVo0_66CjRQbfjIDB7FwiQJakRRv5rWVMK95R58UFCDUAS1l79mXKJQ_SQVwxjDgdST49rB43QJG-zD0Mmv6Zn2r4xJRAlNf5R-ZpJvmel3VWUSVAJK9bxOJO"
            }
        })
        setModalOpen(false);
        setConfirmModalOpen(true);        
    }

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const closeConfirmModal = () => {
        setConfirmModalOpen(false);
    }

    return (        
            <tr className="campaign-progress-table">
                <td className="selected-data-number">                    
                    <span>{id}</span>                    
                </td>
                <td className="selected-data-name">    
                    <div className="selected-data-profile">                
                        <img className="selected-user-profile" src={profile} alt="profile" />
                        <span className="selected-username">{name}</span>
                    </div>                    
                </td>
                <td className="selected-data-phone">                    
                    <span>{phoneNumber.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "")}</span>                    
                </td>
                <td className="selected-data-address">                    
                    <div className="address-wrapper">
                        <div className="address-flex-box">
                            <div><span>우편번호</span> <span>{zipno}</span></div>
                            <span>{roadaddress}</span>
                            <span>{detailaddress}</span>
                        </div>                        
                        {campaignShipComplete ? (
                            <select name="shipment_name" value={shipment_name} className="shipment-names" onChange={(e) => {
                                setShipName(e.target.value);
                            }}>
                                <option value="">택배사 선택</option>
                                <option value="CJ대한통운">CJ대한통운</option>
                                <option value="우체국">우체국</option>
                                <option value="한진택배">한진택배</option>
                                <option value="로젠택배">로젠택배</option>
                                <option value="롯데택배">롯데택배</option>
                                <option value="경동택배">경동택배</option>
                                <option value="일양택배">일양택배</option>
                            </select>
                        ) : (
                            <select name="shipment_name" className="shipment-names" onChange={(e) => {
                                setShipName(e.target.value);
                            }}>
                                <option value="">택배사 선택</option>
                                <option value="CJ대한통운">CJ대한통운</option>
                                <option value="우체국">우체국</option>
                                <option value="한진택배">한진택배</option>
                                <option value="로젠택배">로젠택배</option>
                                <option value="롯데택배">롯데택배</option>
                                <option value="경동택배">경동택배</option>
                                <option value="일양택배">일양택배</option>
                            </select>
                        )}                                                        
                    </div>                    
                </td>
                <td className="selected-data-post">                                            
                {campaignShipComplete ? (
                    <input type='text' value={shipment_number} placeholder="배송장번호" className="table-input" onChange={(e) => {
                        setShipNumber(e.target.value);
                    }}/>  
                ) : (
                    <input type='text' placeholder="배송장번호" className="table-input" onChange={(e) => {
                        setShipNumber(e.target.value);
                    }}/>
                )}                                                
                </td>
                <td className="selected-data-btn">
                    <button className="ship-btn" onClick={openModal}>송장 적용하기</button>
                </td>
                <ShipConfirm open={modalOpen} close={closeModal} confirm={shipInfoHandler}>
                    <span className="main-info">택배사 : {shipName} 송장번호 : {shipNumber}</span>
                    <span className="main-ask">크리에이터에게 배송정보 전달 후 수정이 불가능합니다.</span>
                    <span className="main-ask">배송정보를 전달하시겠습니까?</span>
                </ShipConfirm>
                <ShipComplete open={confirmModalOpen} result={closeConfirmModal}>
                    <span className="complete-main-info">{name}님에게 배송정보가 전달되었습니다!</span>
                </ShipComplete>                
            </tr>        
    )
}

export default CampaignResultDetail;