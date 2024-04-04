import classNames from 'classnames/bind';
import styles from './/ModalDeleteComment.module.scss';

const cx = classNames.bind(styles);

function ModalDeleteComment({ close, data, handleDeletComments }) {
    return (
        <div className={cx('modal-del-comment')}>
            <h2>Bạn có chắc chắn muốn xóa bình luận này?</h2>

            <div className={cx('modal-button')}>
                <button className={cx('button-save')} onClick={() => handleDeletComments(data.id)}>
                    <span>Xóa</span>
                </button>
                <button className={cx('button-cancel')} onClick={close}>
                    <span>Hủy</span>
                </button>
            </div>
        </div>
    );
}

export default ModalDeleteComment;
