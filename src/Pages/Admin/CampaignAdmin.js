import { push, ref, update } from "firebase/database";
import { getDownloadURL, ref as sRef, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import styled from "styled-components";
import { realtimeDbService, storageService } from "../../fBase";

const CampaignAdmin = () => {
    const [uid, setUid] = useState('');
    const [campaignTitle, setCampaignTitle] = useState('');
    const [brandInstagram, setBrandInstagram] = useState('');
    const [brandName, setBrandName] = useState('');
    const [recruitingDate, setRecruitingDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [mainImageUrl, setMainImageUrl] = useState('');
    const [downloadImageUrl, setDownLoadImageUrl] = useState('');
    const [percent, setPercent] = useState(0);
    const [guidePercent, setGuidePercent] = useState(0);
    const [guideDescription, setGuideDescription] = useState('');
    const [guideImageUrl, setGuideImageUrl] = useState('');
    const [recruitingNumber, setRecruitingNumber] = useState(0);
    const [ftc, setFtc] = useState('');
    const [option, setOption] = useState('');
    const [required, setRequired] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState(0);
    const [itemDate, setItemDate] = useState('');
    const [itemUrl, setItemUrl] = useState('');
    const [leastFeed, setLeastFeed] = useState(0);
    const [maintain, setMaintain] = useState(0);
    const [selectionDate, setSelectionDate] = useState('');
    const [uploadDate, setUploadDate] = useState('');
    const [campaignPrice, setCampaignPrice] = useState(0); 
    

    function handleChange(event) {
        setMainImageUrl(event.target.files[0]);
    }

    const handleMainImageUpload = () => {
        if (!mainImageUrl) {
            console.log(mainImageUrl);
        }
        // sRef = firebase/storage , ref = firebase/database
        const storageRef = sRef(storageService, `/campaignImages/${campaignTitle}/${mainImageUrl.name}`);
        const uploadTask = uploadBytesResumable(storageRef, mainImageUrl);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setDownLoadImageUrl(url);
                    console.log(url);
                });
            }
        );
    };

    const handleGuideChange = (event) => {
        const imageLists = event.target.files[0];
        setGuideImageUrl(imageLists);
    };

    const handleGuideImageUpload = () => {
        if (!guideImageUrl) {
            console.log(guideImageUrl);
        }
        const storageMultiRef = sRef(storageService, `campaignImages/${campaignTitle}/guideImages/${guideImageUrl.name}`)
        const uploadTaskMulti = uploadBytesResumable(storageMultiRef, guideImageUrl);

        uploadTaskMulti.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setGuidePercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTaskMulti.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    }
    
    const registerCampaign = () => {
        try {            
            const campaignUid = push(ref(realtimeDbService, `campaigns/`), {
                campaignTitle : campaignTitle,
                brandInstagram : brandInstagram,
                brandName : brandName,
                recruitingDate : recruitingDate,
                dueDate : dueDate.replace(/T/gi, '-').replace(/\:/, '-') ,
                recruitingNumber : recruitingNumber,
                brandUuid : uid,
                guides : [{
                    description : guideDescription,
                    imageUrl : guideImageUrl.name
                }],
            
                hashTags : {
                    ftc : ftc,
                    option : option,
                    required : required
                },
                isNew : true,
                item : {
                    description : itemDescription,
                    name : itemName,
                    price : itemPrice,
                    url : itemUrl
                },
                itemDate : itemDate,
                leastFeed : leastFeed,
                mainImageUrl : mainImageUrl.name,
                maintain : maintain,
                selectionDate : selectionDate,
                uploadDate : uploadDate,
                campaignPrice : campaignPrice
            });

            const campaignKey = campaignUid.key;

            update(ref(realtimeDbService, `brands/${uid}/campaigns/${campaignKey}`), {                   
                mainImageUrl : downloadImageUrl,
                campaignTitle : campaignTitle,
                recruitingDate : recruitingDate,
                dueDate : dueDate.replace(/T/gi, '-').replace(/\:/, '-'),
                recruitingNumber : recruitingNumber,
                selectionDate : selectionDate,
                uploadDate : uploadDate,
                itemDate : itemDate,
                itemPrice : itemPrice,
                campaignPrice : campaignPrice                                              
        });

            alert('캠페인 등록이 완료되었습니다.');
        } catch (error) {
            console.log(error.message);
        }
    }

    const updataCampaign = () => {
        try {
            update(ref(realtimeDbService, ))
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <CampaignAdminContainerCSS>
            <h1>Fieldby Business Suite Admin</h1>
            <input type="text" placeholder="회사 uid" onChange={(e) => {
                setUid(e.target.value);
            }} />
            <input type="text" placeholder="캠페인 제목" onChange={(e) => {
                setCampaignTitle(e.target.value);
            }} />
            <input type="text" placeholder="브랜드 인스타" onChange={(e) => {
                setBrandInstagram(e.target.value);
            }} />
            <input type="text" placeholder="브랜드 이름" onChange={(e) => {
                setBrandName(e.target.value);
            }} />

            <span>캠페인 시작 기한</span>
            <input type="date" placeholder="캠페인 시작 기한" onChange={(e) => {
                setRecruitingDate(e.target.value);
            }} />

            <span>캠페인 만료 기한</span>
            <input type="datetime-local" placeholder="캠페인 만료 기한" onChange={(e) => {
                setDueDate(e.target.value);
            }} />
            <span>캠페인 가격</span>
            <input type="text" placeholder="캠페인 가격" onChange={(e) => {
                setCampaignPrice(e.target.value);
            }} />
            <input type="text" placeholder="모집인원" onChange={(e) => {
                setRecruitingNumber(e.target.value);
            }}/>

            <input type="text" placeholder="해시태그 ftc" onChange={(e) => {
                setFtc(e.target.value);
            }} />
            <input type="text" placeholder="해시태그 option" onChange={(e) => {
                setOption(e.target.value);
            }} />
            <input type="text" placeholder="해시태그 required" onChange={(e) => {
                setRequired(e.target.value);
            }} />
            <input type="text" placeholder="아이템 설명" onChange={(e) => {
                setItemDescription(e.target.value);
            }} />
            <input type="text" placeholder= "아이템 이름" onChange={(e) => {
                setItemName(e.target.value);
            }} />
            <input type="text" placeholder="아이템 가격" onChange={(e) => {
                setItemPrice(e.target.value);
            }} />
            <input type="text" placeholder="아이템 Url" onChange={(e) => {
                setItemUrl(e.target.value);
            }}/>
            <span>아이템 날짜</span>
            <input type="date" placeholder="배송 날짜" onChange={(e) => {
                setItemDate(e.target.value);
            }} />
            <input type="text" placeholder="최소 피드" onChange={(e) => {
                setLeastFeed(e.target.value);
            }} />
            <input type="text" placeholder="유지" onChange={(e) => {
                setMaintain(e.target.value);
            }} />

            <span>선택 날짜</span>
            <input type="date" placeholder="선정 날짜" onChange={(e) => {
                setSelectionDate(e.target.value);
            }} />

            <span>업로드 날짜</span>
            <input type="date" placeholder="업로드 날짜" onChange={(e) => {
                setUploadDate(e.target.value);
            }} />

            <div className="main-image-input">
                <h3>메인 이미지</h3>
                <input type="file" onChange={handleChange} accept="/image/*" />
                <button onClick={handleMainImageUpload}>메인 이미지 업로드</button>
                <p>{percent}%</p>
            </div>

            
            <div className="guide-image-input">
                    <h3>가이드 이미지</h3>
                    <input type="file" accept="/image/*" onChange={handleGuideChange} />
                    <input type="text" placeholder="사진 설명" onChange={(e) => {
                        setGuideDescription(e.target.value);
                    }}/>
                <button onClick={handleGuideImageUpload}>가이드 이미지 업로드</button>
                <p>{guidePercent}%</p>
            </div>
            
        
            <button onClick={registerCampaign}>캠페인 등록하기</button>
        </CampaignAdminContainerCSS>
    )
}

const CampaignAdminContainerCSS = styled.div`
    display : grid;
    align-items : center;
    justify-content : center;
    input {
        width : calc(100%);
        
    }
    button {
        margin-top : 20px;
        width : calc(100%);
    }

    .main-image-input {
        margin-top : 60px;
    }

    .guide-image-preview-container {
        display : flex;
        img {
            height : 250px;
            width : 250px;
        }
        
    }
`

export default CampaignAdmin;