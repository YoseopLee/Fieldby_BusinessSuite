import React from "react";
import '../Modal/Modal.css';

const ShipConfirm = (props) => {

    const {open, close, confirm} = props;

    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section>                    
                    <main>
                        <img src="/images/campaign-empty.png" alt="confirm" />
                        {props.children}
                        <div className="modal-btn-wrapper">
                            <button className="close" onClick={close}>
                                다시 확인하기
                            </button>
                            <button className="confirm" onClick={confirm}>
                                배송 확정                                
                            </button>
                        </div>
                    </main>                    
                </section>
            ) : null}
        </div>
    )
}

export default ShipConfirm;