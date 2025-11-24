/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";

console.log("📦 POS OrderChangeReceipt Patch Loaded!");

patch(PosStore.prototype, {
    getPrintingChanges(order, diningModeUpdate) {
        console.log("🧾 getPrintingChanges called! Order:", order, "Dining Update:", diningModeUpdate);

        const categoryMap = {}; // ✅ Use this to group products by category

        if (order && order.get_orderlines) {
            const orderlines = order.get_orderlines();
            console.log("🛒 Products in this order:");

            orderlines.forEach((line, index) => {
                const product = line.product_id || line.product;
                const productName = line.full_product_name || line.get_full_product_name();
                const categoryName = product?.pos_categ_ids?.[0]?.name || "Uncategorized";

                console.log("Produkti-> ", product);

                // ✅ Group products by category
                if (!categoryMap[categoryName]) {
                    categoryMap[categoryName] = [];
                }

                categoryMap[categoryName].push({
                    name: productName,
                    qty: line.get_quantity(),
                    price: line.get_display_price(),
                });

                console.log(`Product ${index + 1}:`, {
                    name: productName,
                    qty: line.get_quantity(),
                    price: line.price,
                    total: line.get_display_price(),
                    category: categoryName,
                });
            });
        } else {
            console.log("⚠️ No order lines found for this order.");
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
            categories_with_products: categoryMap // ✅ Grouped data
        };

        console.log("🧾 Receipt render env (printingData):", printingData);
        return printingData;
    },
});