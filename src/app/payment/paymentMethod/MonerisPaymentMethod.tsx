import { CardInstrument, PaymentInitializeOptions } from '@bigcommerce/checkout-sdk';
import React, { useCallback, FunctionComponent } from 'react';

import { WithInjectedHostedCreditCardFieldsetProps } from '../hostedCreditCard';

import HostedWidgetPaymentMethod, { HostedWidgetPaymentMethodProps } from './HostedWidgetPaymentMethod';

export type MonerisPaymentMethodProps = Omit< HostedWidgetPaymentMethodProps, 'containerId'>;

const MonerisPaymentMethod: FunctionComponent<MonerisPaymentMethodProps & WithInjectedHostedCreditCardFieldsetProps> = ({
    getHostedStoredCardValidationFieldset,
    hostedStoredCardValidationSchema,
    initializePayment,
    method,
    ...rest
}) => {

    const containerId = `moneris-iframe-container`;

    const initializeMonerisPayment = useCallback((options: PaymentInitializeOptions) => initializePayment({
        ...options,
        moneris: {
            containerId,
        },
    }), [containerId, initializePayment]);

    function validateInstrument(_shouldShowNumber: boolean, selectedInstrument: CardInstrument) {
        if (selectedInstrument && selectedInstrument.trustedShippingAddress) {
            return;
        }

        return getHostedStoredCardValidationFieldset(selectedInstrument);
    }

    return <HostedWidgetPaymentMethod
        { ...rest }
        containerId={ containerId }
        initializePayment={ initializeMonerisPayment }
        method={ method }
        storedCardValidationSchema={ hostedStoredCardValidationSchema }
        validateInstrument={ validateInstrument }
    />;
};

export default MonerisPaymentMethod;
