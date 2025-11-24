from odoo import fields, models

class PosOrderLine(models.Model):
    _inherit = 'pos.order.line'

    pos_categ_ids = fields.Many2many(
        'pos.category',
        related='product_id.product_tmpl_id.pos_categ_ids',
        string='POS Categories',
        readonly=True,
        help="POS categories from the product template."
    )