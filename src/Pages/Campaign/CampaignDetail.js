import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CompleteModal from "../../Components/Modal/CompleteModal";
import ReportModal from "../../Components/Modal/ReportModal";
import SideBar from "../../Components/SideBar/SideBar";
import { useAuth } from "../../Context/authProvider";

const CampaignDetail = () => {
    const {currentUser} = useAuth();
    const userId = currentUser.uid;
    const [campaignMainImage, setCampaignMainImage] = useState('');
    const [campaignTitle, setCampaignTitle] = useState('');
    const [recruitingNumber, setRecruitingNumber] = useState(0);
    const [recruitingDate, setRecruitingDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [selectionDate, setSelectionDate] = useState('');
    const [uploadDate, setUploadDate] = useState('');
    const [itemDate, setItemDate] = useState('');
    const [progressBtn, setProgressBtn] = useState(false);
    const [resultBtn, setResultBtn] = useState(false);
    const [completeBtn, setCompleteBtn] = useState(false);
    const [reportBtn, setReportBtn] = useState(false);
    const [completeModalOpen, setCompleteModalOpen] = useState(false);
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const navigate = useNavigate();
    let {id} = useParams();

    useEffect(() => {
        const dbBrandRef = ref(getDatabase());
        const getBrandCampaignData = async () => {
            const json = await get(child(dbBrandRef, `brands/${userId}/campaigns/${id}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data_obj = snapshot.val();
                    console.log(data_obj);
                    setCampaignMainImage(data_obj.mainImageUrl);
                    setCampaignTitle(data_obj.campaignTitle);
                    setRecruitingNumber(data_obj.recruitingNumber);
                    setRecruitingDate(data_obj.recruitingDate);
                    setSelectionDate(data_obj.selectionDate);
                    setUploadDate(data_obj.uploadDate);
                    setDueDate(data_obj.dueDate);
                    setItemDate(data_obj.itemDate);
                } else {
                    console.log("No data");
                }
            }).catch((error) => {
                console.log(error);
            })          
        }
        getBrandCampaignData();
    }, []);

    const location = useLocation();        
    useEffect(() => {        
        console.log(location);        
        const progressPath = location.pathname === `/campaign/${id}/progress`;        
        const resultPath = location.pathname === `/campaign/${id}/result`;
        const completePath = location.pathname === `/campaign/${id}/complete`;
        const reportPath = location.pathname === `/campaign/${id}/report`;

        if (progressPath) {
            setProgressBtn(true);
            setResultBtn(false);
            setCompleteBtn(false);
            setReportBtn(false);
        } else if (resultPath) {
            setProgressBtn(false);
            setResultBtn(true);
            setCompleteBtn(false);
            setReportBtn(false);
        } else if (completePath) {
            setProgressBtn(false);
            setResultBtn(false);
            setCompleteBtn(true);
            setReportBtn(false);
        } else if (reportPath) {
            setProgressBtn(false);
            setResultBtn(false);
            setCompleteBtn(false);
            setReportBtn(true);
        }
    })

    const openCompleteModal = () => {
        setCompleteModalOpen(true);
    }

    const closeCompleteModal = () => {
        setCompleteModalOpen(false);
        navigate(-1);
    }

    const openReportModal = () => {
        setReportModalOpen(true);
    }

    const closeReportModal = () => {
        setReportModalOpen(false);
        navigate(-1);
    }
    
    return (
        <>
            <SideBar />
            <CampaignDetailCSS>
                <div className="campaign-detail-top-wrapper">                    
                        <h2 className="campaign-detail-top-main">진행 현황</h2>
                        <div className="campaign-detail-top-box">
                            <div className="campaign-detail-ask-btn">
                                <Link to='/campaign'>문의하기</Link>
                            </div>
                            <div className="campaign-detail-download-btn">
                                <Link to='/campaign'>보고서 다운로드</Link>
                            </div>
                        </div>
                </div>
                
                <div id="campaign-detail-top" className="campaign-detail-top-square-hc campaign-detail-top-square-vc">
                    <div className="campaign-detail-top-contents-wrapper">

                        <div className="campaign-detail-top-image-box">
                            <img src={campaignMainImage} alt="top-main" className="campaign-detail-top-image"/>
                        </div>

                        <div className="campaign-detail-top-title-wrapper">
                            <div className="campaign-detail-top-title">
                                <span className="campaign-detail-top-instagram">Instagram</span>
                                <span className="campaign-detail-top-ship">배송형</span>
                            </div>
                            <div className="campaign-detail-top-name-wrapper">
                                <span className="campaign-detail-top-name">{campaignTitle}</span>
                                <div className="campaign-detail-top-recruit-box">
                                    <span className="campaign-detail-top-recruit-number">선정된 크리에이터 {recruitingNumber}명</span>
                                </div>
                            </div>
                            <div className="campaign-detail-top-timeline">
                                <div className="campaign-timeline-status">
                                    <img src="/images/Group 65.png" className="campaign-status-sign" alt="sign"/>
                                    <span>크리에이터 모집</span>
                                    <span className="campaign-status-date">{recruitingDate.replace(/-/gi, '.')} - {dueDate.slice(0, 10).replace(/-/gi, '.')}</span>
                                </div>
                                <div className="campaign-timeline-status">
                                    <img src="/images/Group 65.png" className="campaign-status-sign" alt="sign"/>
                                    <span>크리에이터 선정</span>
                                    <span className="campaign-status-date">{selectionDate.slice(0, 10).replace(/-/gi, '.')} - {selectionDate.slice(0, 10).replace(/-/gi, '.')}</span>
                                </div>
                                <div className="campaign-timeline-status">
                                    <img src="/images/Group 65.png" className="campaign-status-sign" alt="sign"/>
                                    <span>크리에이터 발표</span>
                                    <span className="campaign-status-date">{selectionDate.slice(0, 10).replace(/-/gi, '.')} - {selectionDate.slice(0, 10).replace(/-/gi, '.')}</span>
                                </div>
                                <div className="campaign-timeline-status">                                    
                                    <span className="campaign-status-info">콘텐츠 등록 기간</span>
                                    <span className="campaign-status-date">{itemDate.slice(0,10).replace(/-/gi,'.')} - {uploadDate.slice(0,10).replace(/-/gi, '.')}</span>
                                </div>
                                <div className="campaign-timeline-status">                                    
                                    <span className="campaign-status-info">보고서 확인</span>
                                    <span className="campaign-status-date">{uploadDate.slice(0,10).replace(/-/gi, '.')} ~</span>
                                </div>
                            </div>
                        </div>

                        
                        
                    </div>
                    
                    
                </div>    
                <div id="campaign-detail-cm" className="campaign-detail-square-hc campaign-detail-square-vc">
                    <div className="campaign-progress-result-wrapper">
                        
                        <Link className={`campaign-register-progress ${progressBtn ? 'active' : 'no'}`} id="progress" to='progress'>신청 현황</Link>
                        <Link className={`campaign-register-result ${resultBtn ? 'active' : 'no'}`} to='result'>선정 결과</Link>
                        <Link className={`campaign-complete-posts ${completeBtn ? 'active' : 'no'}`} to='complete' onClick={openCompleteModal}>완료 포스팅</Link>
                        <Link className={`campaign-report ${reportBtn ? 'active' : 'no'}`} to='report' onClick={openReportModal}>캠페인 보고서</Link>
                    </div>

                    <Outlet />
                </div>
                <CompleteModal open={completeModalOpen} result={closeCompleteModal}>
                    <span className="main-info">아직 업로드 기간이 아닙니다.</span>
                </CompleteModal>
                <ReportModal open={reportModalOpen} result={closeReportModal}>
                    <span className="main-info">아직 캠페인이 종료되지 않았습니다.</span>
                </ReportModal>
            </CampaignDetailCSS>            
        </>
    )
}

const CampaignDetailCSS = styled.div`
    .campaign-detail-top-wrapper {
        display : flex;
        position : absolute;
        justify-content : space-between;
        left : 0;
        right : 0;
        top : 20px;
        bottom : 0;
        margin-bottom : auto;
        margin-top : auto;
        margin-right : 2%;
        margin-left : 20%;

        .campaign-detail-top-main {
            margin-block-start : 0.41em;
        }

        .campaign-detail-top-box {            
           display : none;
            .campaign-detail-ask-btn {
                border-radius : 5px;
                background : #303030;
                max-height : 40px;
                width : 200px;
                display : flex;
                align-items : center;
                justify-content : center;
                a {
                    font-weight : 700;
                    font-size : 14px;
                    color : #ffffff;
                    text-decoration : none;
                }
            }
            
            .campaign-detail-download-btn {
                margin-left : 20px;
                border-radius : 5px;
                background : #303030;
                max-height : 40px;
                width : 200px;
                display : flex;
                align-items : center;
                justify-content : center;

                a {
                    font-weight : 700;
                    font-size : 14px;
                    color : #ffffff;
                    text-decoration : none;
                }
            }
        }
    }
    
    #campaign-detail-top {
        position : absolute;
        max-width : 80%;
        min-height : auto;
        padding-block : 16px;
        .campaign-detail-top-contents-wrapper {
            display : flex;           
            height : 100%;
            .campaign-detail-top-image-box{
                width : 150px;
                margin-left : 16px;
                margin-right : 18px;
                position : relative;
                overflow : hidden;
                border-radius : 12px;
                .campaign-detail-top-image {
                    position : absolute;                    
                    width : 100%;
                    top : 50%;
                    left : 50%;
                    transform : translate(-50%, -50%);                                        
                }
            }
            
            .campaign-detail-top-title-wrapper {
                display : flex;
                flex-direction : column;
                width : 80%;
                .campaign-detail-top-title {
                    margin-bottom : -4px;
                    .campaign-detail-top-instagram {
                        font-size : 16px;
                        font-weight : 700;
                        color : #DF56C6;
                        margin-right : 16px;
                    }
                    .campaign-detail-top-ship {
                        font-size : 13px;
                        color : #303030;
                    }
                }
                .campaign-detail-top-name-wrapper {
                    display : flex;
                    align-items : end;
                    .campaign-detail-top-name {
                        font-size : 20px;
                        font-weight : 700;
                        margin-right : 12px;
                    }
                    .campaign-detail-top-recruit-box {
                        background-color : #C4F3EE;          
                        border-radius : 6px;
                        width : 174px;
                        height : 30px;
                        display : flex;
                        align-items : center;
                        justify-content : center;             
                        .campaign-detail-top-recruit-number {
                            color : #22Baa8;
                            font-weight : 700;
                        }
                    }
                }

                .campaign-detail-top-timeline {
                    margin-top : 36px;
                    height : 0;
                    width : 100%;                    
                    border : 1px solid #22Baa8;
                    display : flex;
                    justify-content : space-around;
                    .campaign-timeline-status {
                        display : flex;
                        flex-direction : column;
                        align-items : center;
                        
                        z-index : 999;
                        .campaign-status-sign {
                            margin-top : -10px;
                            margin-bottom : 5px;
                            width : 20px;
                        }
                        span {
                            font-size : 12px;
                            
                        }
                        .campaign-status-info {
                            margin-top : 12px;
                        }
                        .campaign-status-date {
                            font-size : 10px;
                        }
                    }
                }
            }

            
        }
        
    }

    .campaign-detail-top-square-hc {
        width : 78%;
        left : 0;
        right : 0;
        margin-left : 20%;
        margin-right : auto;
        background : #fff;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.07);
        border-radius: 5px;
    }

    .campaign-detail-top-square-vc {
        height : 15%;
        top : 80px;        
        margin-top : auto;
        margin-bottom : auto;
    }

    #campaign-detail-cm {
        position : absolute;
        max-width : 80%;
        min-height : auto;
        overflow-y : scroll;
    }

    .campaign-detail-square-hc {
        width : 78%;
        left : 0;
        right : 0;
        margin-left : 20%;
        margin-right : auto;
        background : #fff;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.07);
        border-radius: 5px;
    }
    
    .campaign-detail-square-vc {
        height : 70%;
        bottom : 0px;
        margin-top : auto;
        margin-bottom : auto;
    }

    .campaign-progress-result-wrapper {
        display : flex;
        padding : 16px;
        .campaign-register-progress {
            border-radius : 5px;
            
            height : 40px;
            width : 200px;
            display : flex;
            align-items : center;
            justify-content : center;
            font-weight : 700;
            font-size : 14px;
            color : #ffffff;
            text-decoration : none;
            
            &.active {
                background : #22Baa8;
            }     
            &.no {
                background : #303030;
            }
        }
        .campaign-register-progress:hover {
            background : #22Baa8;
            transition : all 0.3s;
        }
        

        .campaign-register-result {
            margin-left : 20px;
            border-radius : 5px;
            
            height : 40px;
            width : 200px;
            display : flex;
            align-items : center;
            justify-content : center;
            font-weight : 700;
            font-size : 14px;
            color : #ffffff;
            text-decoration : none;      
            
            &.active {
                background : #22Baa8;
            }     
            &.no {
                background : #303030;
            }
        }
        .campaign-register-result:hover {
            background : #22Baa8;
            transition : all 0.3s;
        }

        .campaign-complete-posts {
            margin-left : 20px;
            border-radius : 5px;
            background : #303030;
            height : 40px;
            width : 200px;
            display : flex;
            align-items : center;
            justify-content : center;
            font-weight : 700;
            font-size : 14px;
            color : #ffffff;
            text-decoration : none;
            &.active {
                background : #22Baa8;
            }     
            &.no {
                background : #303030;
            }
        }
        .campaign-complete-posts:hover {
            background : #22Baa8;
            transition : all 0.3s;
        }

        .campaign-report {
            margin-left : 20px;
            border-radius : 5px;
            background : #303030;
            height : 40px;
            width : 200px;
            display : flex;
            align-items : center;
            justify-content : center;
            font-weight : 700;
            font-size : 14px;
            color : #ffffff;
            text-decoration : none;
            &.active {
                background : #22Baa8;
            }     
            &.no {
                background : #303030;
            }
        }
        .campaign-report:hover{
            background : #22BAA8;
            transition : all 0.3s;
        }
    }
`

export default CampaignDetail;