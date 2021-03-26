sap.ui.define([
	// 'sap/ui/core/mvc/Controller',
	// 'sap/ui/model/json/JSONModel',
	// 'sap/m/Link',
	// 'sap/ui/core/Icon',
	// 'sap/m/MessageItem',
	// 'sap/m/MessageItem',
	// 'sap/m/MessageView',
	// 'sap/m/Button',
	// 'sap/m/Bar',
	// 'sap/m/Text',
	// 'sap/m/Dialog'
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/IconPool",
	"sap/ui/model/json/JSONModel",
	"sap/m/Link",
//	"sap/m/MessageItem",
//	"sap/m/MessageView",
	"sap/m/Button",
	"sap/m/Dialog",
	"sap/m/Bar",
	"sap/m/Text"
	//], function(Controller, JSONModel, Link, Icon, MessageItem, MessageView, Button, Bar, Text, Dialog) {
], function(Controller, IconPool, JSONModel, Link, MessageItem, MessageView, Button, Dialog, Bar, Text) {
	"use strict";
	return {
		initMessage: function(errDetails) {
			// var oLink = new Link({
			// text: "Show more information",
			// href: "http://sap.com",
			// target: "_blank"
			// });
			var a = this.getText("year");
			var oMessageTemplate = new MessageItem({
				type: '{type}',
				title: '{title}',
				description: '{description}',
				subtitle: '{subtitle}',
				counter: '{counter}',
				markupDescription: '{markupDescription}'
					// link: oLink
			});
			var aMockMessages = [];
			for (var i = 0; i < errDetails.length; i++) {
				var name = errDetails[i].severity;
				var nameCapitalized =
					name.charAt(0).toUpperCase() + name.slice(1);
				var semiDescription =
					errDetails[i].message.slice(0, 10);
				semiDescription =
					semiDescription.concat('...');
				var oMockMessage = {
					type: nameCapitalized,
					title: semiDescription,
					description: errDetails[i].message
				};
				aMockMessages.push(oMockMessage);
			}
			var oModel = new JSONModel();
			oModel.setData(aMockMessages);
			var that = this;
			var oBackButton = new Button({
				icon: sap.ui.core.IconPool.getIconURI("navback"),
				visible: false,
				press: function() {
					that.oMessageView.navigateBack();
					this.setVisible(false);
				}
			});
			this.oMessageView = new MessageView({
				showDetailsPageHeader: false,
				itemSelect: function() {
					oBackButton.setVisible(true);
				},
				items: {
					path: "/",
					template: oMessageTemplate
				}
			});
			this.oMessageView.setModel(oModel);
			this.oDialog = new Dialog({
				resizable: true,
				content: this.oMessageView,
				state: 'Error',
				beginButton: new Button({
					press: function() {
						this.getParent().close();
					},
					text: "Close"
				}),
				customHeader: new Bar({
					contentMiddle: [
						new Text({
							text: "Error"
						})
					],
					contentLeft: [oBackButton]
				}),
				contentHeight: "300px",
				contentWidth: "500px",
				verticalScrolling: false
			});
		},
		manageErrors: function(errDetails) {
			this.initMessage(errDetails);
			this.oMessageView.navigateBack();
			this.oDialog.open();
		}
	};
});