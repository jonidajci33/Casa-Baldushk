# -*- coding: utf-8 -*-
# from odoo import http


# class ThermalReceipt(http.Controller):
#     @http.route('/thermal_receipt/thermal_receipt', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/thermal_receipt/thermal_receipt/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('thermal_receipt.listing', {
#             'root': '/thermal_receipt/thermal_receipt',
#             'objects': http.request.env['thermal_receipt.thermal_receipt'].search([]),
#         })

#     @http.route('/thermal_receipt/thermal_receipt/objects/<model("thermal_receipt.thermal_receipt"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('thermal_receipt.object', {
#             'object': obj
#         })

