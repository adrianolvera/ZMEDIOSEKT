sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("MEDIOS_EKT.controller.Plantillas", {

		onInit: function() {
			var sUrl = "/sap/opu/odata/sap/ZMEDIOS_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
			this.getView().setModel(oModel);

			var oRoute = sap.ui.core.UIComponent.getRouterFor(this);
			oRoute.attachRouteMatched(this.routeMatched, this);



		},
		onNavBack: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Principal", {});

		},

		onNavToPaqMonto: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("PaqMonto", {});
		},

		onNavToDescuentos: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var val = oEvent.oSource.sId;
			var plantilla = val.substring(12);
			oRouter.navTo("Descuentos", {
				"plantilla": plantilla
			});

		},

		onNavToPaqCan: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("PaqCantidad", {});
		},

		onNavToRegalos: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Regalos", {});
		},

		onNavToEvento: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("EventoPromocional", {});
		},

		routeMatched: function(oEvent) {

			var oArguments = oEvent.getParameter("arguments");
			var plantilla = oArguments.plantilla;

var model = this.getOwnerComponent().getModel();
//console.log(model.getProperty(“/foo”));

			//var oModel = new JSONModel({titulo: this.titulo});
			// this.getView().setModel(oModel,"Plantilla");
		}
	});
});

//