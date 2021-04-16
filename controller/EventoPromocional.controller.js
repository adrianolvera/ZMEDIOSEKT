sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("MEDIOS_EKT.controller.EventoPromocional", {

		onInit: function() {
			// var sUrl = "/sap/opu/odata/sap/ZMEDIOS_SRV/";
			// var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
			// this.getView().setModel(oModel);
			// 	//
			// this.oModel = sap.ui.getCore().getModel("Medios");
			// this.getView().setModel(this.oModel);
			// this.MyModel = new sap.ui.model.json.JSONModel();

			this.getView().byId("Cod").setVisible(false);
			this.getView().byId("Tiendas").setVisible(false);
			this.oModel = sap.ui.getCore().getModel("Medios");
			this.getView().setModel(this.oModel, "Medios");
			var oModel = new sap.ui.model.json.JSONModel();
		},

		onNavBack: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Plantillas", {
				"medios": sap.ui.getCore().getModel("Medios").oData.id_plantilla
			});
		},

		onSelect: function(oEvent) {
			var radioBtn1 = this.getView().byId("RB1-1");
			var radioBtn2 = this.getView().byId("RB1-2");

			var cod = this.getView().byId("Cod");
			var jer = this.getView().byId("Jer");

			if (radioBtn1.getSelected() === true) {
				jer.setVisible(true);
				cod.setVisible(false);
			}
			if (radioBtn2.getSelected() === true) {
				cod.setVisible(true);
				jer.setVisible(false);
			}
		},

		oDataCall: function(oEvent) {
			// call ovice's function based on which button is clicked.
			//	this._checkData();

			//var requiredInputs = this.returnIdListOfRequiredFields();
			var passedValidation = this.validateEventFeedbackForm();
			if (passedValidation === false) {
				//show an error message, rest of code will not execute.
				return false;
			} else {
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZMEDIOS_SRV");
				sap.ui.getCore().setModel(oModel, "Medios");
				var messages;
				var medios = new sap.ui.model.json.JSONModel();

				var json = [];
				var myModel = sap.ui.getCore().getModel("Medios");
				myModel.setHeaders({
					"X-Requested-With": "X"
				});
				// 
				// CREATE******************
				var zcred = this.getView().byId("zcred");
				var obj = {};
				obj.Zsitpomedio = this.getView().oModels.Medios.oData.id_medio; //"'1';
				obj.Zsiplantilla = this.getView().oModels.Medios.oData.id_plantilla; //'1';
				obj.Zmercprom = this.getView().byId("zmercprom").getValue();
				obj.Zindat = this.getView().byId("zindat").getValue();
				obj.Zfidat = this.getView().byId("zfidat").getValue();
				if (this.getView().byId("ztsepl").getSelectedItem() != null) {
					obj.Ztsepl = this.getView().byId("ztsepl").getSelectedItem().getKey();
				}
				obj.Pltyp = this.getView().byId("co_alcance").getSelectedItem().getKey();

				if (this.getView().byId("co_plazos2").getSelectedItem() != null) {
					obj.Zplazo = this.getView().byId("co_plazos2").getSelectedItem().getKey();
				}
				if (zcred.getSelected() === true) {
					obj.Zcred = 'X';
				}

				obj.Matnr = this.getView().byId("Cod").getValue();
				messages = this._getDialog();
				//medios = this.oModel;
				myModel.create("/CreacionSet", obj, {
						async: false,
						success: function(oData, response) {

							//	alert("Folio creado ex..."); // eslint-disable-line no-alert

							var oHMessages = JSON.parse(response.headers["sap-message"]);
							var log;
							messages.open();

							medios.setData(json);
							log = oHMessages.message;
							json.push({
								message: log
							});
							oHMessages.details.forEach(function(item, index) {
								//json.message = item;
								//json.message = oHMessages.details[index].message;
								log = oHMessages.details[index].message;
								//json.push("hola");
								json.push({
									message: log
								});
								//json.push({ message: oHMessages.details[index].message });
								//list.push({ name: item.Name });
								//json.message = (item.message);
							});

							sap.ui.getCore().setModel(medios, "Medios");
							// var arrayLength = oHMessages.message.length;
							// for (var i = 0; i < arrayLength; i++) {
							// 
							// 	json.message = oHMessages.message[i];
							// 	//Do something
							// }

							//}
						},
						error: function(oError, response) {
							alert("Folio creado error...");

							var oHMessages = JSON.parse(response.headers["sap-message"]);
							//messages = oHMessages;
						}

					}

				);

			}

		},

		validateEventFeedbackForm: function() {

			var valid = true;

			var log;
			var json = [];
			var medios = new sap.ui.model.json.JSONModel();

			if (this.getView().byId("zmercprom").getValue() == null) {
				valid = false;
				log = "Indique un título";
				json.push({
					message: log
				});
			}

			if (this.getView().byId("zindat").getValue() == "") {
				valid = false;
				log = "Introduzca una fecha de inicio válida";
				json.push({
					message: log
				});
			}

			if (this.getView().byId("zfidat").getValue() == "") {
				valid = false;
				log = "Introduzca una fecha de fin válida";
				json.push({
					message: log
				});
			}

			if (this.getView().byId("zcred").getSelected() === false && this.getView().byId("zcont").getSelected() === false) {
				// obj.Zcred = 'X';
				valid = false;
				log = "Selecione crédito o contado";
				json.push({
					message: log
				});
			}

			if (this.getView().byId("zcred").getSelected() === true && this.getView().byId("ztsepl").getSelectedItem() == null) {
				valid = false;
				log = "Selecione Plazos para crédito";
				json.push({
					message: log
				});

			}

			if (this.getView().byId("zfidat").getValue() < this.getView().byId("zindat").getValue()) {
				valid = false;
				log = "La fecha de inicio del evento es mayor a la fecha de término";
				json.push({
					message: log
				});
			}

			if (this.getView().byId("co_alcance").getSelectedItem() == null) {
				valid = false;
				log = "Seleccione un alcancel válido";
				json.push({
					message: log
				});
			}

			if (this.getView().byId("RB1-1").getSelected() === true && this.getView().byId("Jer").getSelectedItem() === null) {
				valid = false;
				log = "Debe seleccionar Jerarquías Válidas";
				json.push({
					message: log
				});
			}

			// if (this.getView().byId("RB1-2").getSelected() === true && this.getView().byId("Cod").getSelectedItem() === null) {
			// 	valid = false;
			// 	log = "No ha seleccionado artículos";
			// 	data.push({
			// 		message: log
			// 	});
			// }

			if (valid === false) {

				//medios = this.oModel;
				medios.setData(json);
				this._getDialog().open();
				sap.ui.getCore().setModel(medios, "Medios");
			}

			return valid;
			// var oFinicio = this.byId("zindat");
			// var oFfin = this.byId("zfidat");
			// if (oFinicio.getValue() < oFfin.getValue()) {
			// 	oFinicio.setValueState(sap.ui.core.ValueState.None);
			// } else {
			// 	oFinicio.setValueState("Error");
			// 	oFinicio.setValueStateText("Fecha incorrecta");
			// 	//show an error message, rest of code will not execute.
			// 	return false;
			// }
		},
		_getDialog: function() {
			// create a fragment with dialog, and pass the selected data
			if (!this.dialog) {
				// This fragment can be instantiated from a controller as follows:
				this.dialog = sap.ui.xmlfragment("MEDIOS_EKT.view.MessageError", this);
				//debugger;
			}

			//debugger;
			return this.dialog;
		},

		closeDialog: function() {
			this._getDialog().close();
		}

	});
});