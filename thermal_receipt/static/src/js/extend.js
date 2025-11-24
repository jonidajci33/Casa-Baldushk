// custom_module/static/src/js/extend_product_fields.js
/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";

patch(PosStore.prototype, {
    async _loadProducts(loadedData) {
        // Add pos_categ_id to the list of fields to load
        this.product_fields.push('pos_categ_ids');
        await super._loadProducts(loadedData);
    },
});
