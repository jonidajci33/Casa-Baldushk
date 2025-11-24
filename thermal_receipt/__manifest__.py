# -*- coding: utf-8 -*-
{
    'name': "thermal_receipt",

    'summary': "Short (1 phrase/line) summary of the module's purpose",

    'description': """
Long description of module's purpose
    """,

    'author': "My Company",
    'website': "https://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'account', 'point_of_sale'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
        # 'views/account_move_view.xml',
        'report/report.xml',
        'report/paperformat.xml',
        'report/report_invoice_thermal_html.xml',

    ],
    'assets': {
        'point_of_sale._assets_pos': [
            'thermal_receipt/static/src/xml/order_change_receipt_extend.xml',
            'thermal_receipt/static/src/js/order_print_change_patch.js',
        ],

    },
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}
