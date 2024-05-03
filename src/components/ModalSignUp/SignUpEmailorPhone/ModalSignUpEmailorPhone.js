import classNames from 'classnames/bind';
import styles from './ModalSignUpEmailorPhone.module.scss';

import { CloseIcon, BackIcon, EyePass, EyePassActive } from '~/components/Icons';
import Button from 'src/components/Button';
import { useState, useEffect } from 'react';
import { login } from 'src/services/loginAccountService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { register } from 'src/services/registerService';

const cx = classNames.bind(styles);

function ModalSignUpEmailorPhone({ close }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisterMode, setRegisterMode] = useState(false);
    const [isActiveEye, setActiveEye] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [animation, setAnimation] = useState(false);
    const [isPasswordValid, setPasswordValid] = useState(true);
    let navigate = useNavigate();
    useEffect(() => {
        // Kiểm tra nếu email và password không rỗng thì bỏ disable button
        if (email && password) {
            setDisabledBtn(false);
        } else {
            setDisabledBtn(true);
        }
    }, [email, password]);

    const handleSignUp = async () => {
        setAnimation(true);
        if (!email || !password) {
            console.log(`Email và mật khẩu là bắt buộc`);
            return;
        }

        let res = await register('email', email, password);
        console.log(`Res`, res);
        if (!res) {
            setErrorMessage('Email đã tồn tại hoặc không hợp lệ');
        } else {
            setErrorMessage('');
            localStorage.setItem('token', res.meta.token);
            localStorage.setItem('username', res.data.nickname);
            // Reload the page
            window.location.reload();
            navigate('/');
        }
        setAnimation(false);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const toggleMode = () => {
        setRegisterMode((prevMode) => !prevMode);
    };

    const toggleEyePass = () => {
        setActiveEye((prevMode) => !prevMode);
    };

    return (
        <div className={cx('modal')}>
            <div className={cx('modal-header')}>
                <button className={cx('back')} onClick={close}>
                    <BackIcon width="20px" height="20px" />
                </button>
                <button className={cx('close')} onClick={close}>
                    <CloseIcon width="20px" height="20px" />
                </button>
            </div>
            <div className={cx('header')}>Đăng ký</div>

            <div className={cx('content')}>
                <div className={cx('birthday')}>
                    <h3>Ngày sinh của bạn là ngày nào</h3>
                    <div className={cx('birthday-input')}>
                        <div className={cx('control-group')}>
                            <div className={cx('controls')}>
                                <select name="dob-day" id="dob-day">
                                    <option value="">Day</option>
                                    <option value="">---</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                </select>
                                <select name="dob-month" id="dob-month">
                                    <option value="">Month</option>
                                    <option value="">-----</option>
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                <select name="dob-year" id="dob-year">
                                    <option value="">Year</option>
                                    <option value="">----</option>
                                    <option value="2012">2012</option>
                                    <option value="2011">2011</option>
                                    <option value="2010">2010</option>
                                    <option value="2009">2009</option>
                                    <option value="2008">2008</option>
                                    <option value="2007">2007</option>
                                    <option value="2006">2006</option>
                                    <option value="2005">2005</option>
                                    <option value="2004">2004</option>
                                    <option value="2003">2003</option>
                                    <option value="2002">2002</option>
                                    <option value="2001">2001</option>
                                    <option value="2000">2000</option>
                                    <option value="1999">1999</option>
                                    <option value="1998">1998</option>
                                    <option value="1997">1997</option>
                                    <option value="1996">1996</option>
                                    <option value="1995">1995</option>
                                    <option value="1994">1994</option>
                                    <option value="1993">1993</option>
                                    <option value="1992">1992</option>
                                    <option value="1991">1991</option>
                                    <option value="1990">1990</option>
                                    <option value="1989">1989</option>
                                    <option value="1988">1988</option>
                                    <option value="1987">1987</option>
                                    <option value="1986">1986</option>
                                    <option value="1985">1985</option>
                                    <option value="1984">1984</option>
                                    <option value="1983">1983</option>
                                    <option value="1982">1982</option>
                                    <option value="1981">1981</option>
                                    <option value="1980">1980</option>
                                    <option value="1979">1979</option>
                                    <option value="1978">1978</option>
                                    <option value="1977">1977</option>
                                    <option value="1976">1976</option>
                                    <option value="1975">1975</option>
                                    <option value="1974">1974</option>
                                    <option value="1973">1973</option>
                                    <option value="1972">1972</option>
                                    <option value="1971">1971</option>
                                    <option value="1970">1970</option>
                                    <option value="1969">1969</option>
                                    <option value="1968">1968</option>
                                    <option value="1967">1967</option>
                                    <option value="1966">1966</option>
                                    <option value="1965">1965</option>
                                    <option value="1964">1964</option>
                                    <option value="1963">1963</option>
                                    <option value="1962">1962</option>
                                    <option value="1961">1961</option>
                                    <option value="1960">1960</option>
                                    <option value="1959">1959</option>
                                    <option value="1958">1958</option>
                                    <option value="1957">1957</option>
                                    <option value="1956">1956</option>
                                    <option value="1955">1955</option>
                                    <option value="1954">1954</option>
                                    <option value="1953">1953</option>
                                    <option value="1952">1952</option>
                                    <option value="1951">1951</option>
                                    <option value="1950">1950</option>
                                    <option value="1949">1949</option>
                                    <option value="1948">1948</option>
                                    <option value="1947">1947</option>
                                    <option value="1946">1946</option>
                                    <option value="1945">1945</option>
                                    <option value="1944">1944</option>
                                    <option value="1943">1943</option>
                                    <option value="1942">1942</option>
                                    <option value="1941">1941</option>
                                    <option value="1940">1940</option>
                                    <option value="1939">1939</option>
                                    <option value="1938">1938</option>
                                    <option value="1937">1937</option>
                                    <option value="1936">1936</option>
                                    <option value="1935">1935</option>
                                    <option value="1934">1934</option>
                                    <option value="1933">1933</option>
                                    <option value="1932">1932</option>
                                    <option value="1931">1931</option>
                                    <option value="1930">1930</option>
                                    <option value="1929">1929</option>
                                    <option value="1928">1928</option>
                                    <option value="1927">1927</option>
                                    <option value="1926">1926</option>
                                    <option value="1925">1925</option>
                                    <option value="1924">1924</option>
                                    <option value="1923">1923</option>
                                    <option value="1922">1922</option>
                                    <option value="1921">1921</option>
                                    <option value="1920">1920</option>
                                    <option value="1919">1919</option>
                                    <option value="1918">1918</option>
                                    <option value="1917">1917</option>
                                    <option value="1916">1916</option>
                                    <option value="1915">1915</option>
                                    <option value="1914">1914</option>
                                    <option value="1913">1913</option>
                                    <option value="1912">1912</option>
                                    <option value="1911">1911</option>
                                    <option value="1910">1910</option>
                                    <option value="1909">1909</option>
                                    <option value="1908">1908</option>
                                    <option value="1907">1907</option>
                                    <option value="1906">1906</option>
                                    <option value="1905">1905</option>
                                    <option value="1904">1904</option>
                                    <option value="1903">1903</option>
                                    <option value="1901">1901</option>
                                    <option value="1900">1900</option>
                                </select>
                            </div>

                            <span className={cx('note-birthday')}>
                                Ngày sinh của bạn sẽ không được hiển thị công khai
                            </span>
                        </div>
                    </div>
                </div>

                <div className={cx('content-header')}>
                    <div className={cx('content-header_phone')}>{isRegisterMode ? 'Email' : 'Điện thoại'}</div>
                    <div className={cx('content-header_text')} onClick={toggleMode}>
                        {isRegisterMode ? 'Đăng ký bằng số điện thoại' : 'Đăng ký bằng email'}
                    </div>
                </div>

                {isRegisterMode ? (
                    // Phần đăng ký
                    <form>
                        <div className={cx('content-input')}>
                            <div className={cx('content-input-phone')}>
                                {/* Input cho số điện thoại */}
                                <input
                                    type="text"
                                    className={cx('input-text')}
                                    value={email}
                                    onChange={handleChangeEmail}
                                    placeholder="Email"
                                    autoComplete="username"
                                />
                            </div>

                            <div
                                className={cx('content-input-phone', 'content-input-phone2', {
                                    active2: !isPasswordValid,
                                })}
                            >
                                <input
                                    type={isActiveEye ? 'password' : 'text'}
                                    className={cx('input-text')}
                                    value={password}
                                    onChange={handleChangePassword}
                                    placeholder="Mật khẩu"
                                    autoComplete="current-password"
                                />
                                {/* Code error message when not true password */}
                                <div onClick={toggleEyePass}>{isActiveEye ? <EyePass /> : <EyePassActive />}</div>
                            </div>
                            {errorMessage && <div className={cx('error-message')}>{errorMessage}</div>}
                        </div>
                    </form>
                ) : (
                    // Phần đăng nhập
                    <div className={cx('content-input')}>
                        <div className={cx('content-input-phone', 'active')}>
                            {/* Thẻ select cho việc chọn loại xe */}
                            <select id="cars" name="cars">
                                <option value="volvo">+84</option>
                                <option value="saab">+233</option>
                                <option value="mercedes">+444</option>
                                <option value="audi">+102</option>
                            </select>
                            {/* Input cho số điện thoại */}
                            <input type="text" className={cx('input-text')} placeholder="Số điện thoại" />
                        </div>

                        <div className={cx('content-input-ma')}>
                            <input type="number" className={cx('input-number')} placeholder="Nhập mã gồm 6 số" />
                            <button className={cx('btn-sibmit-send')}>Gửi mã</button>
                        </div>
                    </div>
                )}

                <Button primary className={cx('content-btn-submit')} onClick={handleSignUp} disabled={disabledBtn}>
                    {animation ? <FontAwesomeIcon className={cx('animate-spin')} icon={faSpinner} /> : 'Đăng ký'}
                </Button>
            </div>

            <div className={cx('footer')}>
                <span className={cx('footer-text')}>
                    {isRegisterMode ? 'Bạn đã có tài khoản? ' : 'Bạn chưa có tài khoản? '}
                </span>
                <div className={cx('footer-link')} onClick={toggleMode}>
                    {isRegisterMode ? 'Đăng nhập' : 'Đăng ký'}
                </div>
            </div>
        </div>
    );
}

export default ModalSignUpEmailorPhone;
