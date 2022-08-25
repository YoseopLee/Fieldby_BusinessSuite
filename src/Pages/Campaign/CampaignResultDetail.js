import axios from "axios";
import { ref, update } from "firebase/database";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShipChangeConfirmModal from "../../Components/Modal/ShipChangeConfirmModal";
import ShipChangeModal from "../../Components/Modal/ShipChangeModal";
import ShipConfirm from "../../Components/Modal/ShipComfirm";
import ShipComplete from "../../Components/Modal/ShipComplete";
import { realtimeDbService } from "../../fBase";
const CampaignResultDetail = ({id, name, profile, phoneNumber, zipno,roadaddress, detailaddress, shipment_name, shipment_number, fcmToken ,uid, campaignTitle, currentUser, campaignId, campaignShipComplete, itemPrice }) => {
    const [shipName, setShipName] = useState('');
    const [shipNumber, setShipNumber] = useState('');
    const [shipChangeName, setShipChangeName] = useState('');
    const [shipChangeNumber, setShipChangeNumber] = useState('');
    const [modalOpen, setModalOpen] = useState(false);    
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [modalChangeOpen, setModalChangeOpen] = useState(false);
    const [modalChangeConfirmOpen, setModalChangeConfirmOpen] = useState(false);    
    const navigate = useNavigate();

    const shipInfoHandler = () => {
        update(ref(realtimeDbService, `users/${uid}/campaigns/${campaignId}`), {
            shipment_name : shipName,
            shipment_number : shipNumber,
        })

        // update(ref(realtimeDbService, `users/${uid}/`), {
        //     reward : itemPrice
        // })

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

    const shipInfoChangeHandler = () => {
        update(ref(realtimeDbService, `users/${uid}/campaigns/${campaignId}`), {
            shipment_name : shipChangeName,
            shipment_number : shipChangeNumber, 
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
        setModalChangeOpen(false);
        setModalChangeConfirmOpen(true);
    }


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

    const openChangeModal = () => {
        setModalChangeOpen(true);
    }
    
    const closeChangeModal = () => {
        setModalChangeOpen(false);
    }

    const closeChangeConfirmModal = () => {
        setModalChangeConfirmOpen(false);
        window.location.reload();
    }

    return (
        <>
        {shipment_name && shipment_number ? (
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
                        
                    </div>                    
                </td>
                <td className="selected-data-post">
                    <span>{shipment_name}</span>                                                                                                   
                    <span>{shipment_number}</span>                                            
                </td>
                <td className="selected-data-btn">
                    <button className="ship-btn" onClick={openChangeModal}>송장 수정하기</button>
                </td>
                <ShipChangeModal open={modalChangeOpen} close={closeChangeModal} confirm={shipInfoChangeHandler}>
                    <span className="main-info">현재 택배사 : {shipment_name} 송장번호 : {shipment_number}</span>
                    <select name="shipment_name" className="shipment-names" onChange={(e) => {
                        setShipChangeName(e.target.value);
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
                    <input type='text' placeholder="운송장번호" className="table-input" onChange={(e) => {
                        setShipChangeNumber(e.target.value);
                    }}/>
                </ShipChangeModal>
                <ShipChangeConfirmModal open={modalChangeConfirmOpen} result={closeChangeConfirmModal}>
                    <span className="complete-main-info">{name}님의 배송정보가 수정되었습니다!</span>
                </ShipChangeConfirmModal>                
            </tr>
        ) : (
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
                                                                            
                    </div>                    
                </td>
                <td className="selected-data-post">                                                                            
                    <input type='text' placeholder="운송장번호" className="table-input" onChange={(e) => {
                        setShipNumber(e.target.value);
                    }}/>                
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
        )}        
    </>        
    )
}

export default CampaignResultDetail;