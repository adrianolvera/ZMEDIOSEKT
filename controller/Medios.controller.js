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

			var oRoute = sap.ui.core.UIComponent.getRouterFor(this);
			oRoute.attachRouteMatched(this.routeMatched, this);

			var model = this.getOwnerComponent().getModel();

		},

		onNavBack: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Home", {});
		},
		formatter: formatter,
		onNavToPlantilla: function(oEvent) {
			//	var plantillaId = oEvent.getSource().getBindingContext().getProperty("plantillaId");
			var val = oEvent.oSource.sId;
			var medios = val.substring(12);

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Plantillas", {
				"medios": medios
			});
		},

		routeMatched: function(oEvent) {
			var oArguments = oEvent.getParameter("arguments");
			var medios = oArguments.medios;

			var model = new sap.ui.model.json.JSONModel({
				foo: medios
			});
			this.getView().setModel(model);

			//var oModel = new JSONModel({titulo: this.titulo});
			// this.getView().setModel(oModel,"Plantilla");
		}

	});
});