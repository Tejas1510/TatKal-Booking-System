const isFieldEmpty = (field) => {
    if (field === null || field === undefined || field.trim() === '')
        return (true);
    return (false);
}

const aadharValidator = (aadharNumber, errorMessages) => {
    if (isFieldEmpty(aadharNumber) === false) {
        if (aadharNumber.length < 12 || (/^\d+$/.test(aadharNumber) === false)) {
            errorMessages.push("Aadhar Number must contain 12 digits only");
        }

    }
}

const mobileNumberValidator = (mobileNumber, errorMessages) => {
    if (isFieldEmpty(mobileNumber) === false) {
        if (/^\d{10}$/.test(mobileNumber) === false) {
            errorMessages.push("Enter a valid mobile number");
        }
    }
}

const trainNum = (trainNo) => {
    if (isNaN(trainNo) === false && trainNo.toString().length === 5)
        return (true);
    return (false);
}

const trainNoValidator = (train1, train2, train3, allTrain, errorMessages) => {
    if (allTrain === false) {
        if (isFieldEmpty(train1) === true && isFieldEmpty(train2) === true && isFieldEmpty(train3) === true) {
            errorMessages.push("Either select Any Train Checkbox or Enter Train Preferences");
        }
        else if (isFieldEmpty(train1) === true || isFieldEmpty(train2) === true || isFieldEmpty(train3) === true) {
            errorMessages.push("Either fill all 3 train preferences or select Any Train Checkbox");
        }
        else {
            if (trainNum(train1) === false ||
                trainNum(train2) === false ||
                trainNum(train3) === false)
                errorMessages.push("Train number must be 5 digit number");
        }
    }
}

const classValidator = (class1, class2, class3, allClass, errorMessages) => {
    if (allClass === false) {
        if (isFieldEmpty(class1) === true && isFieldEmpty(class2) === true && isFieldEmpty(class3) === true) {
            errorMessages.push("Either select any class checkbox or Enter class preferences");
        }
        else if (isFieldEmpty(class1) === true || isFieldEmpty(class2) === true || isFieldEmpty(class3) === true) {
            errorMessages.push("Either fill all 3 class preferences or select Any class checkbox");
        }
    }
}

const passengerDetailValidator = (passengerDetail, errorMessages) => {
    if (passengerDetail === null || passengerDetail === undefined || passengerDetail.length === 0) {
        errorMessages.push("There must be atleast 1 passenger for reservation request");
    }
    else {
        let validDetails = true;
        let incorrectAgeBracket = false;
        passengerDetail.forEach((passenger) => {
            if (isFieldEmpty(passenger.name) === true ||
                isFieldEmpty(passenger.age) === true ||
                isFieldEmpty(passenger.gender) === true ||
                isFieldEmpty(passenger.berth) === true) {
                validDetails = false;
            }

            if (isFieldEmpty(passenger.age) === false) {
                let pAge = parseInt(passenger.age);
                if ((isNaN(pAge) || pAge < 0 || pAge > 120)) {
                    validDetails = false;
                }
                else if (passenger.age <= 5) {
                    incorrectAgeBracket = true;
                }
            }
        });
        if (incorrectAgeBracket === true)
            errorMessages.push("Passengers below 5 years of age must be added in children category.");

        if (validDetails === false)
            errorMessages.push("Fill correct name, gender, age and berth preference for each passenger");
    }
}

const childrenDetailValidator = (childrenDetail, errorMessages) => {
    let validDetails = true;
    let incorrectAgeBracket = false;

    childrenDetail.forEach((child) => {
        if (isFieldEmpty(child.name) === true ||
            isFieldEmpty(child.age) === true ||
            isFieldEmpty(child.gender) === true) {
            validDetails = false;
        }

        if (isFieldEmpty(child.age) === false) {
            let pAge = parseInt(child.age);
            if ((isNaN(pAge) || pAge < 0)) {
                validDetails = false;
            }
            else if (child.age > 5) {
                incorrectAgeBracket = true;
            }
        }
    });
    if (incorrectAgeBracket === true)
        errorMessages.push("Passengers Above 5 years of age must be added in adult passenger category.");

    if (validDetails === false)
        errorMessages.push("Fill correct name, gender, and age for each child");
}

const signatureValidator = (signature, errorMessages) => {
    if (signature.length === 0)
        errorMessages.push("Add signature using image or signature pad");
}



// Main validation function
const validateRegistrationForm = (form) => {
    //console.log("validator called");
    var errorMessages = [];

    const emptyFieldNames = [
        ["Full Name", form.fullName],
        ["Date of Birth", form.dateOfBirth],
        ["Mobile Number", form.mobileNumber],
        ["Aadhar Number", form.aadharNumber],
        ["Source Station", form.sourceStation],
        ["Destination Station", form.destinationStation],
        ["Boarding Station", form.boardingStation],
        ["Reservation Up To", form.reservationUpTo],
        ["Date of Travel", form.dateOfTravel]
    ]

    emptyFieldNames.forEach((fieldName) => {
        if (fieldName[1] === null || fieldName[1] === undefined || fieldName[1].trim() === '') {
            errorMessages.push(fieldName[0] + " Cannot Be Empty.");
        }
    });

    mobileNumberValidator(form.mobileNumber, errorMessages)
    aadharValidator(form.aadharNumber, errorMessages);
    trainNoValidator(
        form.preferenceTrain.train1,
        form.preferenceTrain.train2,
        form.preferenceTrain.train3,
        form.preferenceTrain.allTrain,
        errorMessages
    );
    classValidator(
        form.preferenceClass.class1,
        form.preferenceClass.class2,
        form.preferenceClass.class3,
        form.preferenceClass.allClass,
        errorMessages
    );

    passengerDetailValidator(form.passengerDetail, errorMessages);
    childrenDetailValidator(form.childrenDetail, errorMessages);
    signatureValidator(form.signature, errorMessages);

    //console.log("errorMessages", errorMessages);

    return (errorMessages);
};

export default validateRegistrationForm;