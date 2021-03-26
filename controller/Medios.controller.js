sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function(Controller, formatter, UIComponent) {
	"use strict";

	return Controller.extend("MEDIOS_EKT.controller.Medios", {
		onInit: function() {
			var sUrl = "/sap/opu/odata/sap/ZMEDIOS_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

	
			sap.ui.getCore().setModel(oModel, "Medios");

			this.oModel = sap.ui.getCore().getModel("MyModel");
			this.getView().setModel(this.oModel);
			this.MyModel = new sap.ui.model.json.JSONModel();
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
			var desc_medio;

			var json = {};

			if (medios === "1") {
				desc_medio = "Tren card";
			}

			if (medios === "2") {
				desc_medio = "Banner";
			}

			if (medios === "3") {
				desc_medio = "Promoción especial";
			}

			if (medios === "4") {
				desc_medio = "Mini Trend Card";
			}

			if (medios === "5") {
				desc_medio = "Macro Trend Card";
			}

			if (medios === "6") {
				desc_medio = "TV";
			}
			
			json.id_medio = medios;
			json.desc_medio = desc_medio;
			//console.log(json.numero_ordine);
			//this.MyModel.destroy();
			this.MyModel.setData(json);
			sap.ui.getCore().setModel(this.MyModel, "MyModel");

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Plantillas", {
				"medios": medios
			});

		}

	});
});