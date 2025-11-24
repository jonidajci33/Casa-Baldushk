/** @odoo-module **/
console.log("U HAP ME KAPITALE");

import { patch } from "@web/core/utils/patch";
import { PosOrder } from "@point_of_sale/app/models/pos_order";

patch(PosOrder.prototype, {
    createQrImage(profisc_qr_code) {
        const codeWriter = new window.ZXing.BrowserQRCodeSvgWriter();
        const qr_code_svg = new XMLSerializer().serializeToString(
            codeWriter.write(profisc_qr_code, 150, 150)
        );
        return "data:image/svg+xml;base64," + window.btoa(qr_code_svg);
    },

    export_for_printing() {
        const result = super.export_for_printing(...arguments);

        console.log("order", this);
        console.log("FISC FIC:", this.profisc_fic);
        console.log("FISC QR:", this.profisc_qr_code);
        console.log("FISC UBL", this.profisc_ubl_id);

        // Add fiscalization fields if available
        result.profisc_iic = this.profisc_iic || null;
        result.profisc_fic = this.profisc_fic || null;
        result.profisc_eic = this.profisc_eic || null;
        result.profisc_ubl_id = this.profisc_ubl_id || null;
        result.profisc_fic_error_code = this.profisc_fic_error_code || null;
        result.profisc_fic_error_description =
            this.profisc_fic_error_description || null;
        result.profisc_qr_code = this.profisc_qr_code || null;

        // Add draft info if you need it
        result.is_draft = this.is_draft || null;

        // Default text if FIC missing
        if (!result.profisc_fic) {
            result.profisc_fic =
                "Statusi i Faturës referuar Ligjit do të bëhet e ditur jo më vonë se 48 orë nga koha e lëshimit! Ju lutem, provoni përsëri me vonë.";
        }

        // Generate QR image if available
        if (result.profisc_qr_code) {
            result.qrCode = this.createQrImage(result.profisc_qr_code);
        }

        return result;
    },

    async wait_for_push_order() {
        const pushed = await super.wait_for_push_order(...arguments);

        if (pushed) {
            await this.pos.getOrderData(this);
        }

        return Boolean(pushed);
    },
});
