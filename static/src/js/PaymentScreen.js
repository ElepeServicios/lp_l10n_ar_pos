odoo.define('lp_l10n_ar_pos.PaymentScreen', function (require) {
    "use strict";

    const PaymentScreen = require('point_of_sale.PaymentScreen');
    const Registries = require('point_of_sale.Registries');
    const session = require('web.session');

    const L10nArPosPaymentScreen = PaymentScreen =>
        class extends PaymentScreen {
            setup() {
                super.setup();
                if (this.env.pos.config.auto_invoice_check) {
                    this.currentOrder.set_to_invoice(true);
                }
            }
            async _postPushOrderResolve(order, order_server_ids) {
                try {
                    if (order.to_invoice) {
                        var domain = [['id', 'in', order_server_ids]];
                        var fields = ['account_move'];
                        const result = await this.rpc({
                            model: 'pos.order',
                            method: 'search_read',
                            domain: domain,
                            fields: fields,
                            context: session.user_context,
                        });
                        if (result) {
                            var invoice_number = result[0]['account_move'][1].split(" ")[1];
                            var invoice_letter = result[0]['account_move'][1].split(" ")[0].substring(3, 4);
                            order.set_invoice_number(invoice_number);
                            order.set_invoice_letter(invoice_letter);
                            var account_move = result[0]['account_move'][0];
                            var move_domain = [['id', '=', account_move]];
                            var move_fields = ['l10n_ar_afip_auth_code',
                                             'l10n_ar_afip_auth_code_due',
                                             'l10n_ar_afip_qr_code',
                                             'l10n_latam_document_type_id',];

                            const move_result = await this.rpc({
                                model: 'account.move',
                                method: 'search_read',
                                domain: move_domain,
                                fields: move_fields,
                                context: session.user_context,
                            });
                            if (move_result) {
                                order.set_afip_qr_code(move_result[0]['l10n_ar_afip_qr_code']);
                                order.set_afip_auth_code(move_result[0]['l10n_ar_afip_auth_code']);
                                order.set_afip_auth_code_due(move_result[0]['l10n_ar_afip_auth_code_due']);
                                order.set_l10n_latam_document_type_id(move_result[0]['l10n_latam_document_type_id'][1].split(" ")[0]);
                                order.set_l10n_latam_document_name(move_result[0]['l10n_latam_document_type_id'][1].substr(move_result[0]['l10n_latam_document_type_id'][1].indexOf(" ") + 1));
                            }

                        }
                    }
                } finally {
                    return super._postPushOrderResolve(...arguments);
                }
            }
        };

    Registries.Component.extend(PaymentScreen, L10nArPosPaymentScreen);

    return PaymentScreen;

});
