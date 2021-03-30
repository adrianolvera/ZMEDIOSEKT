sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("MEDIOS_EKT.controller.PaquetesPorMonto", {
	//
		onInit: function() {
			var sUrl = "/sap/opu/odata/sap/ZMEDIOS_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
			this.getView().setModel(oModel);

			var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZMEDIOS_SRV");
			this.getView().setModel(this.oModel);
			this.oModel = sap.ui.getCore().getModel("Medios");
			this.getView().setModel(this.oModel, "Medios");
			this.Medios = new sap.ui.model.json.JSONModel();
		},

		onNavBack: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Plantillas", {
				"medios": sap.ui.getCore().getModel("Medios").oData.id_plantilla
			});
		}
	});
});