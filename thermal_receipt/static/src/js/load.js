/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";

console.log("📦 POS OrderChangeReceipt Patch Loaded!");

patch(PosStore.prototype, {
    getPrintingChanges(order, diningModeUpdate) {
        console.log("🧾 getPrintingChanges called! Order:", order, "Dining Update:", diningModeUpdate);

        const categoryMap = {}; // { "Food": [Pizza, Salmon], "Drinks": [Cola] }

        if (order && order.get_orderlines) {
            const orderlines = order.get_orderlines();
            console.log("🛒 Products in this order:");

            orderlines.forEach((line, index) => {
                const product = line.product || {};
                const categories = product.pos_categ_ids || [];
                const categoryName = categories.length ? categories[0].name : "Uncategorized";

                if (!categoryMap[categoryName]) {
                    categoryMap[categoryName] = [];
                }
                categoryMap[categoryName].push(line.full_product_name);
            });
        }

        const printingData = {
            table_name: order?.table_id ? order.table_id.table_number : "",
            config_name: order?.config?.name || "",
            tracking_number: order?.tracking_number || "",
            takeaway: order?.config?.takeaway && order?.takeaway || false,
            employee_name: order?.employee_id?.name || order?.user_id?.name || "",
            order_note: order?.general_note || "",
            diningModeUpdate: diningModeUpdate || [],
            order_number: order?.pos_reference || order?.name || "",
            changes: order?.get_change ? order.get_change() : 0,
            categories: categoryMap, // ✅ Send to XML
        };

        console.log("🧾 Receipt render env (printingData):", printingData);

        return printingData;
    },
});
