import classNames from 'classnames/bind';
import styles from './inputComment.module.scss';
import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { EmojiIcon, TagCommentIcon } from '../Icons';

const cx = classNames.bind(styles);

const InputComment = forwardRef(({ handleCreateComment }, ref) => {
    const [valueInput, setValueInput] = useState('');
    const [activeBtn, setActiveBtn] = useState(false);
    const [activeBtnCm, setActiveBtnCm] = useState(false);
    const inputRef = useRef(null);
    // Set active button when the user wirte in input
    useImperativeHandle(ref, () => ({
        focusInput: () => {
            console.log('test', inputRef);
            // inputRef.current[index]?.current?.focus();
            inputRef.current.focus();
        },
    }));
    function handleActiveBtn(e, index = null) {
        setValueInput(e.target.value);

        if (e.target.value !== '') {
            if (index !== null) {
                setActiveBtn(true);
            } else {
                setActiveBtnCm(true);
            }
        } else {
            if (index !== null) {
                setActiveBtn(false);
            } else {
                setActiveBtnCm(false);
            }
        }
    }

    const handleClickCreateComment = () => {
        handleCreateComment(valueInput); // Truyền giá trị của valueInput khi ấn nút
        setValueInput('');
        // setActiveBtn(false);
        setActiveBtnCm(false);
    };

    return (
        <div className={cx('video-user_comment')}>
            <div className={cx('comment-user__input')}>
                <input
                    placeholder="Thêm câu trả lời..."
                    ref={inputRef}
                    value={valueInput}
                    onChange={(e) => {
                        handleActiveBtn(e);
                    }}
                />
                <TagCommentIcon className={cx('comment-user__input-icon')} />
                <EmojiIcon className={cx('comment-user__input-icon')} />
            </div>
            <button
                type="button"
                className={cx('btn-submit', activeBtn ? 'active' : '', activeBtnCm ? 'active' : '')}
                onClick={handleClickCreateComment}
            >
                Đăng
            </button>
        </div>
    );
});
export default InputComment;
