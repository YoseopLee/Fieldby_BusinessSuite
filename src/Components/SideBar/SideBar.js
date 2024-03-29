import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Context/authProvider";
import { authService } from "../../fBase";
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai';


const SideBar = () => {
    const {currentUser} = useAuth();
    const userId = currentUser.uid;
    const [userData, setUserData] = useState('');
    const [showInfo, setShowInfo] = useState(false);
    const [showProfileInfo, setShowProfileInfo] = useState(false);
    const navigate = useNavigate();
    
    const handleLogout = async() => {
        try {
            await authService.signOut();
            navigate('/login');
        } catch(error) {
            console.log(error)
        }
    }

    const campaignHandle = () => {
        navigate('/campaign');
    }
    
    useEffect(() => {
        const dbRef = ref(getDatabase());
        const getUserData = async () => {
            const json = await get(child(dbRef, `brands/${userId}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data_obj = snapshot.val();
                    setUserData(data_obj);
                } else {
                    console.log("No Data");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
        getUserData();
    }, []);

    return (
        <SideBarContainerCSS>
            <div className="campaign-logo">
                    <img src="/images/fieldbylogo.png" alt="main"/>
                    <h2 className="campaign-logo-name">Business Suite</h2>
                </div>

                <div className="campaign-sidemenu">
                    <div className="campaign-sidemenu-company-box">
                        <span className="campaign-sidemenu-company-name">{userData.companyName}</span>
                        <button className="btn-up" onClick={() =>  setShowProfileInfo(!showProfileInfo)}>
                            {showProfileInfo ? <AiOutlineUp /> : <AiOutlineDown />}
                        </button>
                    </div>
                    {showProfileInfo &&
                        <div className="btn-menus">
                            <div className="btn-menu" onClick={campaignHandle}>캠페인</div>                        
                            <div className="btn-menu" onClick={handleLogout}>로그아웃</div>
                        </div>
                    }
                                        
                </div>
                
                <div className="campaign-customer-center">
                    {showInfo &&  
                        <div className="btn-menus">                                                  
                            <div className="btn-menu">공지사항</div>  
                                                                                                                                    
                        </div>
                    }      
                    <div className="campaign-customer-ask">
                        <img src="/images/customer.png" alt="customer-center" className="customer-img"/>
                        <span className="customer-ask">고객센터</span>
                        <div className="btn-wrapper">
                            <button className="btn-up" onClick={() => setShowInfo(!showInfo)}>
                                {showInfo ? <AiOutlineDown /> : <AiOutlineUp />}
                            </button>
                            
                        </div>
                    </div>
                   
                </div>

                
        </SideBarContainerCSS>
    )
}

const SideBarContainerCSS = styled.div`
    position : abosolute;
    z-index : 9999;
    background : #ffffff;
    height : 100vh;
    width : 240px;
    display : flex;
    flex-direction : column;
    align-items : center;
    box-shadow: 2px 2px 10px rgb(0 0 0 / 25%);
    .campaign-logo {
        padding-top : 20px;
        img {
            height : 43px;
            width : 133px;
        }
        .campaign-logo-name {
            margin-left : 14px;
            margin-block-start : -10px;
            margin-block-end : 0;
            font-size : 18px;
            color : #303030;
            
        }
    }

    .campaign-sidemenu {
        .btn-menus {
            display : grid;
            gap : 20px;            
            margin-top : 8px;
            padding : 20px;
            width : 100%;
            background: #FFFFFF;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
            border-radius: 5px;
            .btn-menu {
                font-weight : 700;
                line-height : 19px;
                font-size : 15px;
                padding : 8px;
            }
            .btn-menu:hover {
                background-color : #22Baa8;
                transition : all .3s;
                color : #fff;
                border-radius : 6px;
            }
        }
        margin-top : 45px;        
        width : calc(100% - 30px);
        .campaign-sidemenu-company-box {
            padding-left : 12px;
            border : 1px solid #22Baa8;
            border-radius : 5px;
            height : 43px;
            display : flex;
            justify-content : space-between;
            align-items : center;
            .campaign-sidemenu-company-name {
                font-weight : 700;
                color : #303030;
            }
            .btn-up {
                background: transparent;
                border-color: transparent;
                width: 2rem;
                height: 2rem;                                    
                align-items: center;
                justify-content: center;                                
                cursor: pointer;                
                align-self: center;
                min-width: 2rem;
                svg {
                    height : 1.1rem;
                    width : 1.1rem;
                }
            } 
        }

        .campaign-sidemenu-progress-box {
            margin-top : 12px;
            
            height : 50px;
            display : flex;
            justify-content : center;
            align-items : center;
            background: #ffffff;
            z-index : 99;
            box-shadow : 2px 2px 10px rgba(0, 0, 0, 0.25);
            border-radius: 5px;
            .campaign-sidemenu-progress {
                font-weight : 700;
                color : #ffffff;
                text-decoration : none;
            }
            img {
                width : 19px;
                height : 20px;
                margin-right : 8px;
            }
        }

        .campaign-sidemenu-report-box {
            margin-top : 12px;
            height : 36px;
            display : flex;
            justify-content : center; 
            align-items : center; 
            .campaign-sidemenu-report {
                font-weight : 700;
                color : #303030;
            }
            img {
                width : 19px;
                height : 20px;
                margin-right : 8px;
            }
        }
    }

    .campaign-customer-center {
        margin-top : auto;
        margin-bottom : 40px;
        
        .campaign-customer-ask {
            display : flex;
            align-items : center;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 19px;
            
            .customer-img {
                width : 19px;
                height : 20px;
                margin-right : 12px;
            }
            .btn-wrapper {
                display : grid;
                .btn-up {
                    background: transparent;
                    border-color: transparent;
                    width: 2rem;
                    height: 2rem;                                    
                    align-items: center;
                    justify-content: center;                                
                    cursor: pointer;                
                    align-self: center;
                    min-width: 2rem;
                    svg {
                        height : 1.1rem;
                        width : 1.1rem;
                    }
                }                
            }
            
        }
        .btn-menus {
            display : grid;
            gap : 20px;
            margin-left : -20px;
            margin-bottom : 8px;
            padding : 20px;
            width : 150%;
            background: #FFFFFF;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
            border-radius: 5px;
            .btn-menu {
                font-weight : 700;
                line-height : 19px;
                font-size : 15px;
                background-color : #ffffff;
                padding : 8px;                                          
            }
            .btn-menu:hover {
                background-color : #22Baa8;
                transition : all .3s;
                color : #fff;
                border-radius : 6px;
            }
            
        }
    }
    

`

export default SideBar;