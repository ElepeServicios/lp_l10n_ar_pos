odoo.define('lp_l10n_ar_pos.pos_model', function (require) {
    "use strict";

    var core = require('web.core');
    var { PosGlobalState, Order } = require('point_of_sale.models');
    const Registries = require('point_of_sale.Registries');
    var _t = core._t;

    const L10nArPosGlobalState = (PosGlobalState) => class L10nArPosGlobalState extends PosGlobalState {
        is_argentinian_company() {
            return this.company.country.code === 'AR';
        }
    }
    Registries.Model.extend(PosGlobalState, L10nArPosGlobalState);

    
    const L10nArPosOrder = (Order) => class L10nArPosOrder extends Order {
        constructor(obj, options) {
            super(...arguments);
            if (this.pos.config.default_partner_id) {
            	this.set_client(this.pos.db.get_partner_by_id(this.pos.config.default_partner_id[0]));
            }
        }

        /**
         * Add additional information for our ticket
         *
         * @override
         */
        export_for_printing() {
            var result = super.export_for_printing(...arguments);
            let company = this.pos.company;
            var company_data = {
                email: company.email,
                website: company.website,
                company_registry: company.company_registry,
                contact_address: company.partner_id[1],
                vat: company.vat,
                vat_label: company.country && company.country.vat_label || _t('Tax ID'),
                name: company.name,
                phone: company.phone,
                logo:  this.pos.company_logo_base64,
                l10n_ar_gross_income_number: company.l10n_ar_gross_income_number,
                l10n_ar_afip_start_date: company.l10n_ar_afip_start_date,
                afip_responsibility: company.l10n_ar_afip_responsibility_type_id && company.l10n_ar_afip_responsibility_type_id[1] || _t('NA'),
                street: company.street,
                city: company.city,
                state_name: company.state_id && company.state_id[1] || _t('NA'),
                country_name: company.country_id && company.country_id[1] || _t('NA'),

            };
            result.company = company_data;
            result.invoice_number = this.get_invoice_number();
            result.l10n_latam_document_name = this.get_l10n_latam_document_name();
            result.invoice_letter = this.get_invoice_letter();
            result.l10n_latam_document_type_id = this.get_l10n_latam_document_type_id();
            result.afip_auth_code = this.get_afip_auth_code();
            result.afip_qr_code = this.get_afip_qr_code();
            result.afip_auth_code_due = this.get_afip_auth_code_due();
            return result;
        }

        set_invoice_number(invoice_number) {
            this.invoice_number = invoice_number;
        }
        get_invoice_number() {
            return this.invoice_number;
        }
        set_l10n_latam_document_name(l10n_latam_document_name) {
            this.l10n_latam_document_name = l10n_latam_document_name;
        }
        get_l10n_latam_document_name() {
            return this.l10n_latam_document_name;
        }
        set_invoice_letter(invoice_letter) {
            this.invoice_letter = invoice_letter;
        }
        get_invoice_letter() {
            return this.invoice_letter;
        }
        set_l10n_latam_document_type_id(l10n_latam_document_type_id) {
            this.l10n_latam_document_type_id = l10n_latam_document_type_id;
        }
        get_l10n_latam_document_type_id() {
            return this.l10n_latam_document_type_id;
        }
        set_afip_auth_code(afip_auth_code) {
            this.afip_auth_code = afip_auth_code;
        }
        get_afip_auth_code() {
            return this.afip_auth_code;
        }
        set_afip_qr_code(afip_qr_code) {
            this.afip_qr_code = afip_qr_code;
        }
        get_afip_qr_code() {
            return this.afip_qr_code;
        }
        set_afip_auth_code_due(afip_auth_code_due) {
            this.afip_auth_code_due = afip_auth_code_due;
        }
        get_afip_auth_code_due() {
            return this.afip_auth_code_due;
        }

        wait_for_push_order() {
            var result = super.wait_for_push_order(...arguments);
            result = Boolean(result || this.pos.is_argentinian_company());
            return result;
        }
    
    }
    Registries.Model.extend(Order, L10nArPosOrder);
    

});
