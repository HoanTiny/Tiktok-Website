import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import * as searchService from '~/services/searchService';

import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopupWrapper } from '~/components/Popper';
import AccountItem from 'src/components/AccountItem';
import { SearchIcon } from 'src/components/Icons/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search({ className, bgrInput = false, placeholder }) {
    const [searchResults, setSearchResults] = useState([]);
    const [seachValue, setSearchValue] = useState('');
    const [shoResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounceValue = useDebounce(seachValue, 500);
    const inputRef = useRef();

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResults([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchService.search(debounceValue);
            setSearchResults(result);

            setLoading(false);
        };

        fetchApi();
    }, [debounceValue]);
    const handleClear = () => {
        setSearchValue('');
        setSearchResults([]);
        inputRef.current.focus();
    };

    const handleHideResults = () => {
        setShowResult(false);
    };

    return (
        // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
        <div className={cx(`${className}`)}>
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
                <div className={cx('search', { active: bgrInput })}>
                    <input
                        ref={inputRef}
                        placeholder={placeholder ? 'Tìm kiếm liên quan' : `Search...`}
                        spellCheck={false}
                        value={seachValue}
                        onChange={(e) => {
                            e.target.value = e.target.value.trimStart();

                            setSearchValue(e.target.value);
                        }}
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
        </div>
    );
}

export default Search;
