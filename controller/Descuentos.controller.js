/*global XLSX*/
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/IconPool',
	'sap/ui/model/json/JSONModel',
	'sap/m/Link',
	//'sap/m/MessageItem',
	//'sap/m/MessageView',
	'sap/m/Button',
	'sap/m/Dialog',
	'sap/m/Bar',
	'sap/m/Text',
	"sap/m/MessageBox",
	'sap/m/ColumnListItem',
	'sap/m/Label',
	'sap/m/Token' //	"sap/m/MessageToast"//	
	//'com/MultipleMessages/model/formatter'
	//'./Utilities'
], function(Controller, IconPool, JSONMOdel, Link, Button, Dialog, Bar, Text, ColumnListItem, Label, Token, BindingMode, Message,
	MessageBox) {
	"use strict";

	return Controller.extend("MEDIOS_EKT.controller.Descuentos", {

		onInit: function() {

			this.getView().byId("Cod").setVisible(false);
			this.getView().byId("Tiendas").setVisible(false);

			var JSONModel = sap.ui.require("sap/ui/model/json/JSONModel");
			this.oColModel = new JSONModel(jQuery.sap.getResourcePath("MEDIOS_EKT") + "/columnsModel.json");
			//var oModel2 = new sap.ui.model.json.JSONModel();
			// this.oProductsModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock") + "/products.json");

			// this.getView().setModel(this.oModel);

			// this.Medios = new sap.ui.model.json.JSONModel();
			// var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZMEDIOS_SRV");
			// sap.ui.getCore().setModel(oModel, "Medios");

			this.oModel = sap.ui.getCore().getModel("Medios");
			this.getView().setModel(this.oModel, "Medios");
			var oModel = new sap.ui.model.json.JSONModel();
			
		},

		onNavBack: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var val = oEvent.oSource.sId;
			var plantilla = val.substring(12);

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Plantillas", {});
			// oRouter.navTo("Plantillas", {
			// 	"medios": sap.ui.getCore().getModel("Medios").oData.id_plantilla
			// });

			//oRouter.navTo("Plantillas", {"plantilla" : plantilla});	

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

		handleSelectionChange: function(oEvent) {
			var changedItem = oEvent.getParameter("changedItem");
			/*		var isSelected = oEvent.getParameter("selected");
					var state = "Selected";*/
			if (!changedItem) {
				var value = this.getView().byId("co_alcance").getSelectedKey();
				if (value === "04") {
					this.getView().byId("Tiendas").setVisible(true);
				}
				//this.getView().byId("Tiendas").setVisible(true);
			}

			/*			MessageToast.show("Event 'selectionChange': " + state + " '" + changedItem.getText() + "'", {
							width: "auto"
						});*/
		},

		onValueHelpTiendas: function() {

			var aCols = this.oColModel.getData().cols;
			this._oValueHelpDialog = sap.ui.xmlfragment("MEDIOS_EKT.view.ValueHelpDialog", this);
			this.getView().addDependent(this._oValueHelpDialog); /**/

			//	this._oValueHelpDialog.getTableAsync().then(function(oTable)

			//{
			var oTable = this._oValueHelpDialog.getTable();
			oTable.setModel(this.oModel);
			oTable.setModel(this.oColModel, "columns");

			if (oTable.bindRows) {
				oTable.bindAggregation("rows", "/T001WSet");
			}

			if (oTable.bindItems) {
				oTable.bindAggregation("items", "/T001WSet", function() {
					return new ColumnListItem({
						cells: aCols.map(function(column) {
							return new Label({
								text: "{" + column.template + "}"
							});
						})
					});
				});
			}
			this._oValueHelpDialog.update();
			/*			}
						.bind(this));*/

			//	this._oValueHelpDialog.setTokens(this._oMultiInput.getTokens());
			this._oValueHelpDialog.open();
		},

		onValueHelpOkPress: function(evt) {
			/*			var aTokens = oEvent.getParameter("tokens");
					//	this._oEvent.setTokens(aTokens);
						this._oValueHelpDialog.close();*/
			var aSelectedItems = evt.getParameter("tokens"),
				oMultiInput = this.byId("Tiendas");

			//	if (aSelectedItems && aSelectedItems.length > 0) {
			aSelectedItems.forEach(function(oItem) {
				oMultiInput.addToken(new Token({
					text: this.getTitle()
				}));
			});
			//	}
			this._oValueHelpDialog.close();
		},

		onValueHelpCancelPress: function() {
			this._oValueHelpDialog.close();
		},

		onValueHelpAfterClose: function() {
			this._oValueHelpDialog.destroy();
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
				obj.Ztsepl = this.getView().byId("ztsepl").getSelectedItem().getKey();
				obj.Pltyp = this.getView().byId("co_alcance").getSelectedItem().getKey();
				obj.Zdcred = this.getView().byId("zdcred").getValue();
				obj.Ztdesc = this.getView().byId("ztdesc").getSelectedItem().getKey();
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

		returnIdListOfRequiredFields: function() {
			var requiredInputs;
			//return requiredInputs = ['zmercprom', 'zindat', 'zfidat', 'ztsepl', 'co_alcance', 'zdcred', 'ztdesc'];
			return requiredInputs = ['zmercprom', 'zindat', 'zfidat', 'ztsepl', 'co_alcance', 'zdcred', 'ztdesc', 'co_plazos2'];
			//
		},

		validateEventFeedbackForm: function() {

			var valid = true;

			var log;
			var json = [];
			var medios =  new sap.ui.model.json.JSONModel();

			if (this.getView().byId("zmercprom").getValue() == null) {
				valid = false;
				log = "Indique un título";
				json .push({
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

			if (this.getView().byId("ztdesc").getSelectedItem() == null) {
				valid = false;
				log = "Seleccione Tipo de Descuento";
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

			if (((this.getView().byId("ztdesc").getSelectedItem() != null && this.getView().byId("ztdesc").getSelectedItem().getKey() == 'M')) &&
				this.getView().byId("zdcred").getValue() == "") {
				valid = false;
				log = "Capture Descuento a crédito";
				json.push({
					message: log
				});
			}

			if (((this.getView().byId("ztdesc").getSelectedItem() != null && this.getView().byId("ztdesc").getSelectedItem().getKey() == 'P')) &&
				this.getView().byId("zdcred").getValue() == "") {
				valid = false;
				log = "Ingrese % descuento Crédito, entre 1 y 100";
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