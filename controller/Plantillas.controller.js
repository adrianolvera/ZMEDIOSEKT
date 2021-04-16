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

			this.oModel = sap.ui.getCore().getModel("Medios");
			this.getView().setModel(this.oModel);
			this.Medios = new sap.ui.model.json.JSONModel();

		},
		onNavBack: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Principal", {});

		},

		onNavToPaqMonto: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			

			var val = oEvent.oSource.sId;
			var plantilla = val.substring(12);
			var desc_plantilla;
			var desc_medio;
			var id_medio;

			var json = {};

			id_medio = sap.ui.getCore().getModel("Medios").oData.id_medio;
			json.id_medio = id_medio;
			
			desc_medio = sap.ui.getCore().getModel("Medios").oData.desc_medio;
			json.desc_medio = desc_medio;
			
			json.id_plantilla = '2';

			this.Medios.setData(json);
			sap.ui.getCore().setModel(this.Medios, "Medios");
			
			
			oRouter.navTo("PaqMonto", {});
			
		},

		onNavToDescuentos: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			var val = oEvent.oSource.sId;
			var plantilla = val.substring(12);
			var desc_plantilla;
			var desc_medio;
			var id_medio;

			var json = {};

			id_medio = sap.ui.getCore().getModel("Medios").oData.id_medio;
			json.id_medio = id_medio;
			
			desc_medio = sap.ui.getCore().getModel("Medios").oData.desc_medio;
			json.desc_medio = desc_medio;
			
			json.id_plantilla = '1';

			this.Medios.setData(json);
			sap.ui.getCore().setModel(this.Medios, "Medios");
			
				oRouter.navTo("Descuentos", {});
			
			
			// oRouter.navTo("Descuentos", {
			// 	"plantilla": plantilla
			// });

		},

		onNavToPaqCan: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
			var val = oEvent.oSource.sId;
			var plantilla = val.substring(12);
			var desc_plantilla;
			var desc_medio;
			var id_medio;

			var json = {};

			id_medio = sap.ui.getCore().getModel("Medios").oData.id_medio;
			json.id_medio = id_medio;
			
			desc_medio = sap.ui.getCore().getModel("Medios").oData.desc_medio;
			json.desc_medio = desc_medio;
			
			json.id_plantilla = '4';

			this.Medios.setData(json);
			sap.ui.getCore().setModel(this.Medios, "Medios");
			
			oRouter.navTo("PaqCantidad", {});
		},
	//
		onNavToRegalos: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
			var val = oEvent.oSource.sId;
			var plantilla = val.substring(12);
			var desc_plantilla;
			var desc_medio;
			var id_medio;

			var json = {};

			id_medio = sap.ui.getCore().getModel("Medios").oData.id_medio;
			json.id_medio = id_medio;
			
			desc_medio = sap.ui.getCore().getModel("Medios").oData.desc_medio;
			json.desc_medio = desc_medio;
			
			json.id_plantilla = '5';

			this.Medios.setData(json);
			sap.ui.getCore().setModel(this.Medios, "Medios");
			
			oRouter.navTo("Regalos", {});
		},

		onNavToEvento: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
			var val = oEvent.oSource.sId;
			var plantilla = val.substring(12);
			var desc_plantilla;
			var desc_medio;
			var id_medio;

			var json = {};

			id_medio = sap.ui.getCore().getModel("Medios").oData.id_medio;
			json.id_medio = id_medio;
			
			desc_medio = sap.ui.getCore().getModel("Medios").oData.desc_medio;
			json.desc_medio = desc_medio;
			
			json.id_plantilla = '6';

			this.Medios.setData(json);
			sap.ui.getCore().setModel(this.Medios, "Medios");			
			
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