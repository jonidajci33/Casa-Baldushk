from odoo import models

class AccountMove(models.Model):
    _inherit = 'account.move'

    # def print_thermal_invoice(self):
    #     return self.env.ref('thermal_receipt.thermal_invoice_web_print').report_action(self, config=False)


    def print_thermal_invoice(self):
        return {
            'type': 'ir.actions.act_url',
            'url': f'/report/html/thermal_receipt.report_invoice_thermal_html/{self.id}',
            'target': 'new',
        }
