# -*- coding: utf-8 -*-
from odoo import api, fields, models, _


class ResConfigSettings(models.TransientModel):
    _inherit = "res.config.settings"

    pos_auto_invoice_check = fields.Boolean('POS auto invoice',
                                            related='pos_config_id.auto_invoice_check', readonly=False)
    pos_show_invoice_number = fields.Boolean('Show invoice number on Receipt',
                                             related='pos_config_id.show_invoice_number', readonly=False)
    pos_show_customer_vat = fields.Boolean('Show customer VAT on Receipt', related='pos_config_id.show_customer_vat',
                                           readonly=False)
    pos_default_partner_id = fields.Many2one('res.partner', related='pos_config_id.default_partner_id', readonly=False)


