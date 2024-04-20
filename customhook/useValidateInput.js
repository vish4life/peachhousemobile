const useValidateInput = (input) => {
    // console.log('came in validation', input.email);
    console.log('inside validation ', input);
    let msg = '';
    let status = '';
    let statusPayload = '';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // /*DEV TESTING*/
    // msg = 'DEV validation successful';
    // status = 'SUCCESS';
    // statusPayload = { msg: msg, status: status };
    // return (statusPayload);

    if (input.hasOwnProperty('firstName')) {
        msg = 'First name validation successful';
        status = 'SUCCESS';
        if (input.firstName === '') {
            msg = 'First Name is Mandatory';
            status = 'FAIL';
            statusPayload = { msg: msg, status: status };
            return (statusPayload);
        };
        if (input.firstName.length < 3) {
            msg = 'First Name Must be minimum 3 characters';
            status = 'FAIL';
            statusPayload = { msg: msg, status: status };
            return (statusPayload);
        };
    };
    if (input.hasOwnProperty('lastName')) {
        msg = 'Last name validation successful';
        status = 'SUCCESS';
        if (input.lastName === '') {
            msg = 'Last Name is Mandatory';
            status = 'FAIL';
            statusPayload = { msg: msg, status: status };
            return (statusPayload);
        };
        if (input.lastName.length < 1) {
            msg = 'Last Must be minimum 1 characters';
            status = 'FAIL';
            statusPayload = { msg: msg, status: status };
            return (statusPayload);
        };
    };
    if (input.hasOwnProperty('email')) {
        msg = 'Email validation successful';
        status = 'SUCCESS';
        if (input.email === '') {
            msg = 'Email is Mandatory';
            status = 'FAIL';
            statusPayload = { msg: msg, status: status };
            return (statusPayload);
        };
        if (!emailPattern.test(input.email)) {
            msg = 'Email format xxx@xxx.xxx';
            status = 'FAIL';
            statusPayload = { msg: msg, status: status };
            return (statusPayload);
        };
    };
    if (input.hasOwnProperty('phone')) {
        msg = 'Phone validation successful';
        status = 'SUCCESS';
        if (input.phone === '') {
            msg = 'Phone Number is Mandatory';
            status = 'FAIL';
            statusPayload = { msg: msg, status: status };
            return (statusPayload);
        };
    };
    if (input.hasOwnProperty('phoneCode')) {
        msg = 'Phone Code validation successful';
        status = 'SUCCESS';
        if (input.phoneCode === '') {
            msg = 'Phone Code is Mandatory';
            status = 'FAIL';
            statusPayload = { msg: msg, status: status };
            return (statusPayload);
        };
    };
    if (input.hasOwnProperty('password')) {
        msg = 'Password successful';
        status = 'SUCCESS';
        if (input.password === '') {
            msg = 'Password is Mandatory';
            status = 'FAIL';
            statusPayload = { msg: msg, status: status };
            return (statusPayload);
        };
        if (input.password.length < 8 || input.password.length > 16) {
            msg = 'Password should be between 8 - 16 characters';
            status = 'FAIL';
            statusPayload = { msg: msg, status: status };
            return (statusPayload);
        };
    };
    statusPayload = { msg: msg, status: status };
    return (statusPayload);
};
export default useValidateInput;