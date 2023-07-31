# -*- coding: utf-8 -*-
{
    'name': 'AR POS',
    'version': '1.0',
    'author': 'elepe servicios SRL',
    'license': 'OPL-1',
    'category': 'Point Of Sale',
    'website': 'www.elepeservicios.com.ar',
    'depends': [
        'point_of_sale',
        'l10n_ar',
        'l10n_ar_edi',
    ],
    'data': [
        'views/pos_config.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            'lp_l10n_ar_pos/static/src/js/pos_model.js',
            'lp_l10n_ar_pos/static/src/js/PaymentScreen.js',
            'lp_l10n_ar_pos/static/src/css/pos_receipts.css',
            'lp_l10n_ar_pos/static/src/xml/pos_ticket.xml',
        ],
    },
    'installable': True,
}
