import React from "react";
import '../Modal/Modal.css'

const ShipChangeConfirmModal = (props) => {

    const {open, result} = props

    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                        <button className="result" onClick={result}>
                            배송 정보 수정 완료
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    )
}

export default ShipChangeConfirmModal;