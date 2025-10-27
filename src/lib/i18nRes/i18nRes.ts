import {i18nUtils} from "@ticatec/i18n";

const langRes = {
    microFrame: {
        btnClose: "Close",
        moduleError: "Can't load the module.",
        pageNotInFrame: "Can't show the page which is not in iframe.",
        indicatorLoadModule: "Loading module..."
    }
}

const i18nRes = i18nUtils.createResourceProxy(langRes, 'uniface');

export default i18nRes;