odoo.define('profisc.PartnerDetailsEdit', function (require) {
    "use strict";

    const {useState} = owl;
    const PartnerDetailsEdit = require('point_of_sale.PartnerDetailsEdit');
    const Registries = require('point_of_sale.Registries');
    const rpc = require('web.rpc');

    const ExtendedPartnerDetailsEdit = PartnerDetailsEdit =>
        class extends PartnerDetailsEdit {
            setup() {
                super.setup();
                console.log("Entered b:: PartnerDetailsEdit")
                const partner = this.props.partner;

                const id_types = [
                    {value: "ID", label: "ID"},
                    {value: "9923", label: "NUIS"},
                    {value: "VAT", label: "VAT"}]

                this.env.pos.id_types = id_types
                // this.getCurrentPartnerData(partner.id)
                console.log({"partner": partner}, {"this.env.pos": this.env.pos}, {"this.changes": this.changes})
            }

            async getCurrentPartnerData(id_partner) {
                try {
                    const result = await rpc.query({
                        model: 'res.partner',
                        method: 'read',
                        args: [id_partner, ['profisc_customer_vat_type']]
                    });
                    if (result && result.length > 0) {
                        let res = result[0]
                        this.changes.profisc_customer_vat_type = res.profisc_customer_vat_type;
                        this.env.pos.selected_customer_vat_type = res.profisc_customer_vat_type;
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }

            // Additional methods or override existing methods
        };

    Registries.Component.extend(PartnerDetailsEdit, ExtendedPartnerDetailsEdit);

    return PartnerDetailsEdit;
});
