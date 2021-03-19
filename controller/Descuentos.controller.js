/*global XLSX*/
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	'sap/m/ColumnListItem',
	'sap/m/Label',
	'sap/m/Token' //	"sap/m/MessageToast"
], function(Controller, JSONMOdel, ColumnListItem, Label, Token) {
	"use strict";

	return Controller.extend("MEDIOS_EKT.controller.Descuentos", {

		onInit: function() {
			//var sUrl = "/sap/opu/odata/sap/ZMEDIOS_SRV/";
			//var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);

			/*			this.localModel = new sap.ui.model.json.JSONModel();
						this.getView().setModel(this.localModel, "localModel");*/

			this.getView().setModel(this.oModel, "oModel");
			this.getView().byId("Cod").setVisible(false);
			this.getView().byId("Tiendas").setVisible(false);

			var JSONModel = sap.ui.require("sap/ui/model/json/JSONModel");

			this.oColModel = new JSONModel(jQuery.sap.getResourcePath("MEDIOS_EKT") + "/columnsModel.json");

			//	this.oProductsModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock") + "/products.json");
			var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZMEDIOS_SRV");
			sap.ui.getCore().setModel(oModel, "Medios");
		},

		onNavBack: function(oEvent) {
			// var oRouter = this.getOwnerComponent().getRouter();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Plantillas", {});
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

		onUpload: function(e) {
			this._import(e.getParameter("files") && e.getParameter("files")[0]);
		},

		oDataCall: function(oEvent) {
			// call ovice's function based on which button is clicked.
			this._checkMandatory();
			//this._checkData();
		

			var myModel = sap.ui.getCore().getModel("Medios");
			myModel.setHeaders({
				"X-Requested-With": "X"
			});
			// 
			// CREATE******************
			var zcred = this.getView().byId("zcred");
			var obj = {};
			obj.Zsitpomedio = '1';
			obj.Zsiplantilla = '1';
			obj.Zmercprom = this.getView().byId("zmercprom").getValue();
			obj.Zindat = this.getView().byId("zindat").getValue();
			obj.Zfidat = this.getView().byId("zfidat").getValue();
			obj.Ztsepl = this.getView().byId("ztsepl").getSelectedItem().getKey();
			obj.Pltyp = this.getView().byId("co_alcance").getSelectedItem().getKey();
			obj.Zdcred = this.getView().byId("zdcred").getValue();
			obj.Ztdesc = this.getView().byId("ztdesc").getSelectedItem().getKey();
			obj.Zplazo = this.getView().byId("co_plazos2").getSelectedItem().getKey();

			if (zcred.getSelected() === true) {
				obj.Zcred = 'X';
			}

			obj.Matnr = this.getView().byId("Cod").getValue();
			myModel.create("/CreacionSet", obj, {
				success: function(oData, oResponse) {

					alert("Folio creado..."); // eslint-disable-line no-alert
				},
				error: function(oData, oResponse) {

					alert("Folio creado..."); // eslint-disable-line no-alert
				}
			});

		},
		_import: function(file) {
			//var that = this;
			var excelData = {};
			if (file && window.FileReader) {
				var reader = new FileReader();
				reader.onload = function(e) {
					var data = e.target.result;
					var workbook = XLSX.read(data, {
						type: 'binary'
					});
					workbook.SheetNames.forEach(function(sheetName) {
						// Here is your object for every sheet in workbook
						excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

					});
					// Setting the data to the  model 
					this.oModel.setData({
						items: excelData
					});
					this.oModel.refresh(true);
				};
				reader.onerror = function(ex) {
					console.log(ex);
				};
				reader.readAsBinaryString(file);
			}
		},

		_checkMandatory: function() {

			var requiredInputs = this.returnIdListOfRequiredFields();
			var passedValidation = this.validateEventFeedbackForm(requiredInputs);
			if (passedValidation === false) {
				//show an error message, rest of code will not execute.
				return false;
			}

		},

		returnIdListOfRequiredFields: function() {
			var requiredInputs;
			return requiredInputs = ['zmercprom', 'zindat', 'zfidat', 'ztsepl', 'co_alcance', 'zdcred', 'ztdesc', 'co_plazos2'];
		},

		validateEventFeedbackForm: function(requiredInputs) {
			var _self = this;
			var valid = true;
			requiredInputs.forEach(function(input) {
				var sInput = _self.getView().byId(input);
				if (sInput.getValue() == "" || sInput.getValue() == undefined) {
					valid = false;
					sInput.setValueState("Error");
					sInput.setValueStateText("Campo obligatorio");
				} else {
					sInput.setValueState("None");
				}
			});
			return valid;
		},

		_checkData: function() {
			/*			var oMerca = this.byId("zmercprom");
						if (oMerca.getValue() !== "") {
							oMerca.setValueState(sap.ui.core.ValueState.None);
						} else {
							oMerca.setValueState(sap.ui.core.ValueState.Error);
							oMerca.setValueStateText("Introduza una descripción");
						}*/
			var oFinicio = this.byId("zindat");
			var oFfin = this.byId("zfidat");
			if (oFinicio.getValue() < oFfin.getValue()) {
				oFinicio.setValueState(sap.ui.core.ValueState.None);
			} else {
				oFinicio.setValueState(sap.ui.core.ValueState.Error);
				oFinicio.setValueStateText("Fecha incorrecta");
			}
		}

	});
});