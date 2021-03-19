sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function(Controller, formatter, UIComponent) {
	"use strict";

	return Controller.extend("MEDIOS_EKT.controller.Medios", {
		onInit: function() {
			var sUrl = "/sap/opu/odata/sap/ZMEDIOS_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

			//	this.getView().setModel(oModel);
			//	this.localModel = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oModel, "Medios");

		},

		onNavBack: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Home", {});
		},
		formatter: formatter,
		onNavToPlantilla: function(oEvent) {
		//	var plantillaId = oEvent.getSource().getBindingContext().getProperty("plantillaId");



			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Plantillas", { });
		}
	});
});