# -*- coding: utf-8 -*-
from odoo import api, fields, models, _


class PosConfig(models.Model):
    _inherit = "pos.config"

    auto_invoice_check = fields.Boolean(string='POS auto invoice',
                                        help='POS auto check invoice button',
                                        default=True)
    show_invoice_number = fields.Boolean(string='Show invoice number on Receipt', default=True)
    show_customer_vat = fields.Boolean(string='Show customer VAT on Receipt', default=True)
    default_partner_id = fields.Many2one('res.partner', string="Default Client")


