import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';

import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopupWrapper } from '~/components/Popper';
import AccountItem from 'src/components/AccountItem';
import { SearchIcon } from 'src/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [seachValue, setSearchValue] = useState('');
    const [shoResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    useEffect(() => {
        if (!seachValue.trim()) {
            setSearchResults([]);
            return;
        }

        setLoading(true);

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(seachValue)}&type=less`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResults(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [seachValue]);
    const handleClear = () => {
        setSearchValue('');
        setSearchResults([]);
        inputRef.current.focus();
    };

    const handleHideResults = () => {
        setShowResult(false);
    };
    return (
        <HeadlessTippy
            interactive
            visible={shoResult && searchResults.length > 0}
            render={(attrs) => (
                <div className={cx('search-resut')} tabIndex="-1" {...attrs}>
                    <PopupWrapper>
                        <h4 className={cx('search-title')}>Account</h4>
                        {searchResults.map((resut) => (
                            <AccountItem key={resut.id} data={resut} />
                        ))}
                    </PopupWrapper>
                </div>
            )}
            onClickOutside={handleHideResults}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    placeholder="Search..."
                    spellcheck={false}
                    value={seachValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {!!seachValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
