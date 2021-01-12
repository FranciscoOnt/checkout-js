import React, { FunctionComponent } from 'react';

import { withLanguage, WithLanguageProps } from '../../locale';
import { documentPaymentMethods, getDocumentOnlyValidationSchema, DocumentOnlyCustomForm } from '../documentOnly';

import CreditCardPaymentMethod, { CreditCardPaymentMethodProps } from './CreditCardPaymentMethod';

export interface CheckoutcomCustomPaymentMethodProps
    extends Omit<CreditCardPaymentMethodProps, 'cardFieldset' | 'cardValidationSchema'> {
    checkoutCustomMethod: string;
}

const checkoutcomCustomFieldset = (
    <DocumentOnlyCustomForm
        additionalClassName="form-field--ccDocument"
        autoComplete="cc-document"
        labelId="payment.credit_card_document_label"
        name="ccDocument"
    />
);

const CheckoutcomCustomPaymentMethod: FunctionComponent<
    CheckoutcomCustomPaymentMethodProps & WithLanguageProps
> = ({ language, checkoutCustomMethod, ...rest }) => {
    return (
        <CreditCardPaymentMethod
            { ...rest }
            cardFieldset={ checkoutcomCustomFieldset }
            cardValidationSchema={ getDocumentOnlyValidationSchema({
                paymentMethod: checkoutCustomMethod as documentPaymentMethods,
                language,
            }) }
        />
    );
};

export default withLanguage(CheckoutcomCustomPaymentMethod);
