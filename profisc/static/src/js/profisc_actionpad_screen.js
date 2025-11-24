odoo.define('profisc.ActionpadWidgetScreen', function (require) {
    'use strict';

    const PosComponent = require('point_of_sale.PosComponent');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const {useListener} = require("@web/core/utils/hooks");
    const Registries = require('point_of_sale.Registries');
    const rpc = require('web.rpc');
    const session = require('web.session');
    const {useRef} = owl;


    class ProfiscActionpadWidgetScreen extends PosComponent {
        setup() {
            console.log("Rendered: ProfiscActionpadWidgetScreen")
            super.setup();
            this.elRef = useRef('changeFiscType');

            useListener('change', this.changeFiscType);
            this.setProfiscType();
            this._checkVisibility();

        }

        setProfiscType(type = "0") {
            const order = this.env.pos.get_order();
            if (order) {
                order.profisc_fisc_type = type;
            }
        }

        async _checkVisibility() {
            const result = await rpc.query({
                model: 'res.company',
                method: 'read',
                args: [session.company_id, ['profisc_manual_fisc_select']]
            });
            if (result.length > 0) {
                const companyData = result[0];
                if (companyData.profisc_manual_fisc_select) {
                    $('.profisc-payment-fiscalization').show();
                } else {
                    this.setProfiscType("0")
                    $('.profisc-payment-fiscalization').hide();
                }
            }
        }


        changeFiscType() {
            const dropdown = document.querySelector('.changeFiscType');
            const selectedValue = dropdown.options[dropdown.selectedIndex].value;
            this.env.pos.fiscType = selectedValue
            const order = this.env.pos.get_order();
            if (order) {
                order.profisc_fisc_type = selectedValue;
            }
            // console.log({order}); // This will log the value of the selected option

        }
    }

    ProfiscActionpadWidgetScreen.template = 'ProfiscActionpadWidgetScreen';

    ProductScreen.addControlButton({
        component: ProfiscActionpadWidgetScreen,
        condition: function () {
            return this.env.pos;
        },
    });

    Registries.Component.add(ProfiscActionpadWidgetScreen);
    return ProfiscActionpadWidgetScreen;
});
