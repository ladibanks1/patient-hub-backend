function emailValidator(email) {
    const googleEmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    return googleEmailPattern.test(email);
}

export default emailValidator;