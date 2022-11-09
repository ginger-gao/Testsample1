//@ui5-bundle fproject1/project1/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"fproject1/project1/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","./model/models","./controller/ErrorHandler"],function(t,e,s,i){"use strict";return t.extend("fproject1.project1.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments);this._oErrorHandler=new i(this);this.setModel(s.createDeviceModel(),"device");this.getRouter().initialize()},destroy:function(){this._oErrorHandler.destroy();t.prototype.destroy.apply(this,arguments)},getContentDensityClass:function(){if(this._sContentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this._sContentDensityClass=""}else if(!e.support.touch){this._sContentDensityClass="sapUiSizeCompact"}else{this._sContentDensityClass="sapUiSizeCozy"}}return this._sContentDensityClass}})});
},
	"fproject1/project1/controller/App.controller.js":function(){sap.ui.define(["./BaseController"],function(t){"use strict";return t.extend("fproject1.project1.controller.App",{onInit:function(){this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}})});
},
	"fproject1/project1/controller/BaseController.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","sap/m/library"],function(e,t,r){"use strict";var o=r.URLHelper;return e.extend("fproject1.project1.controller.BaseController",{getRouter:function(){return t.getRouterFor(this)},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},onShareEmailPress:function(){var e=this.getModel("objectView")||this.getModel("worklistView");o.triggerEmail(null,e.getProperty("/shareSendEmailSubject"),e.getProperty("/shareSendEmailMessage"))}})});
},
	"fproject1/project1/controller/ErrorHandler.js":function(){sap.ui.define(["sap/ui/base/Object","sap/m/MessageBox","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,s,n){"use strict";return e.extend("fproject1.project1.controller.ErrorHandler",{constructor:function(e){var t=sap.ui.getCore().getMessageManager(),r=t.getMessageModel(),o=e.getModel("i18n").getResourceBundle(),i=o.getText("errorText"),a=o.getText("multipleErrorsText");this._oComponent=e;this._bMessageOpen=false;this.oMessageModelBinding=r.bindList("/",undefined,[],new s("technical",n.EQ,true));this.oMessageModelBinding.attachChange(function(e){var s=e.getSource().getContexts(),n=[],r;if(this._bMessageOpen||!s.length){return}s.forEach(function(e){n.push(e.getObject())});t.removeMessages(n);r=n.length===1?i:a;this._showServiceError(r,n[0].message)},this)},_showServiceError:function(e,s){this._bMessageOpen=true;t.error(e,{id:"serviceErrorMessageBox",details:s,styleClass:this._oComponent.getContentDensityClass(),actions:[t.Action.CLOSE],onClose:function(){this._bMessageOpen=false}.bind(this)})}})});
},
	"fproject1/project1/controller/NotFound.controller.js":function(){sap.ui.define(["./BaseController"],function(e){"use strict";return e.extend("fproject1.project1.controller.NotFound",{onLinkPressed:function(){this.getRouter().navTo("worklist")}})});
},
	"fproject1/project1/controller/Object.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/ui/core/routing/History","../model/formatter"],function(e,t,n,o){"use strict";return e.extend("fproject1.project1.controller.Object",{formatter:o,onInit:function(){var e=new t({busy:true,delay:0});this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched,this);this.setModel(e,"objectView")},onNavBack:function(){var e=n.getInstance().getPreviousHash();if(e!==undefined){history.go(-1)}else{this.getRouter().navTo("worklist",{},true)}},_onObjectMatched:function(e){var t=e.getParameter("arguments").objectId;this._bindView("/Products"+t)},_bindView:function(e){var t=this.getModel("objectView");this.getView().bindElement({path:e,events:{change:this._onBindingChange.bind(this),dataRequested:function(){t.setProperty("/busy",true)},dataReceived:function(){t.setProperty("/busy",false)}}})},_onBindingChange:function(){var e=this.getView(),t=this.getModel("objectView"),n=e.getElementBinding();if(!n.getBoundContext()){this.getRouter().getTargets().display("objectNotFound");return}var o=this.getResourceBundle(),i=e.getBindingContext().getObject(),r=i.category_ID,s=i.Products;t.setProperty("/busy",false);t.setProperty("/shareSendEmailSubject",o.getText("shareSendEmailObjectSubject",[r]));t.setProperty("/shareSendEmailMessage",o.getText("shareSendEmailObjectMessage",[s,r,location.href]))}})});
},
	"fproject1/project1/controller/Worklist.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","../model/formatter","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,i,o,r){"use strict";return e.extend("fproject1.project1.controller.Worklist",{formatter:i,onInit:function(){var e;this._aTableSearchState=[];e=new t({worklistTableTitle:this.getResourceBundle().getText("worklistTableTitle"),shareSendEmailSubject:this.getResourceBundle().getText("shareSendEmailWorklistSubject"),shareSendEmailMessage:this.getResourceBundle().getText("shareSendEmailWorklistMessage",[location.href]),tableNoDataText:this.getResourceBundle().getText("tableNoDataText")});this.setModel(e,"worklistView")},onUpdateFinished:function(e){var t,i=e.getSource(),o=e.getParameter("total");if(o&&i.getBinding("items").isLengthFinal()){t=this.getResourceBundle().getText("worklistTableTitleCount",[o])}else{t=this.getResourceBundle().getText("worklistTableTitle")}this.getModel("worklistView").setProperty("/worklistTableTitle",t)},onPress:function(e){this._showObject(e.getSource())},onNavBack:function(){history.go(-1)},onSearch:function(e){if(e.getParameters().refreshButtonPressed){this.onRefresh()}else{var t=[];var i=e.getParameter("query");if(i&&i.length>0){t=[new o("category_ID",r.Contains,i)]}this._applySearch(t)}},onRefresh:function(){var e=this.byId("table");e.getBinding("items").refresh()},_showObject:function(e){this.getRouter().navTo("object",{objectId:e.getBindingContext().getPath().substring("/Products".length)})},_applySearch:function(e){var t=this.byId("table"),i=this.getModel("worklistView");t.getBinding("items").filter(e,"Application");if(e.length!==0){i.setProperty("/tableNoDataText",this.getResourceBundle().getText("worklistNoDataWithSearchText"))}}})});
},
	"fproject1/project1/i18n/i18n.properties":'# This is the resource bundle for fproject1.project1\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=App Title\n\n#YDES: Application description\nappDescription=A Fiori application.\n#~~~ Worklist View ~~~~~~~~~~~~~~~~~~~~~~~~~~\n#XTIT: Worklist view title\nworklistViewTitle=Manage Products\n\n#XTIT: Worklist page title\nworklistTitle=App Title\n\n#XTIT: Table view title\nworklistTableTitle=Products\n\n#XTOL: Tooltip for the search field\nworklistSearchTooltip=Enter an Products name or a part of it.\n\n#XBLI: text for a table with no data with filter or search\nworklistNoDataWithSearchText=No matching Products found\n\n#XTIT: Table view title with placeholder for the number of items\nworklistTableTitleCount=Products ({0})\n\n#XTIT: The title of the column containing the category_ID of Products\ntableNameColumnTitle=category_ID\n\n\n#XTIT: The title of the column containing the price and the unit of measure\ntableUnitNumberColumnTitle=price\n\n\n#XBLI: text for a table with no data\ntableNoDataText=No Products are currently available\n\n#XLNK: text for link in \'not found\' pages\nbackToWorklist=Show App Title\n\n#~~~ Object View ~~~~~~~~~~~~~~~~~~~~~~~~~~\n#XTIT: Object view title\nobjectViewTitle=Products Details\n\n#XTIT: Object page title\nobjectTitle=Products\n\n#XTIT: Label for the category_ID\ncategory_IDLabel=category_ID\n\n\n#XTIT: Label for the price\npriceLabel=price\n\n\n#~~~ Share Menu Options ~~~~~~~~~~~~~~~~~~~~~~~\n\n#XTIT: Send E-Mail subject\nshareSendEmailWorklistSubject=<Email subject PLEASE REPLACE ACCORDING TO YOUR USE CASE>\n\n#YMSG: Send E-Mail message\nshareSendEmailWorklistMessage=<Email body PLEASE REPLACE ACCORDING TO YOUR USE CASE>\\r\\n{0}\n\n#XTIT: Send E-Mail subject\nshareSendEmailObjectSubject=<Email subject including object identifier PLEASE REPLACE ACCORDING TO YOUR USE CASE> {0}\n\n#YMSG: Send E-Mail message\nshareSendEmailObjectMessage=<Email body PLEASE REPLACE ACCORDING TO YOUR USE CASE> {0} (id: {1})\\r\\n{2}\n\n#~~~ Not Found View ~~~~~~~~~~~~~~~~~~~~~~~\n\n#XTIT: Not found view title\nnotFoundTitle=Not Found\n\n#YMSG: The Products not found text is displayed when there is no Products with this id\nnoObjectFoundText=This Products is not available\n\n#YMSG: The Products not available text is displayed when there is no data when starting the app\nnoObjectsAvailableText=No Products are currently available\n\n#YMSG: The not found text is displayed when there was an error loading the resource (404 error)\nnotFoundText=The requested resource was not found\n\n#~~~ Error Handling ~~~~~~~~~~~~~~~~~~~~~~~\n\n#YMSG: Error dialog description\nerrorText=Sorry, a technical error occurred! Please try again later.',
	"fproject1/project1/manifest.json":'{"_version":"1.42.0","sap.app":{"id":"fproject1.project1","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:worklist","version":"1.8.0","toolsId":"ed85ebe6-8a53-4593-a21a-0cd0453d03c0"},"dataSources":{"mainService":{"uri":"test/","type":"OData","settings":{"annotations":[],"localUri":"localService/metadata.xml","odataVersion":"4.0"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.102.1","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"fproject1.project1.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"fproject1.project1.view","controlId":"app","controlAggregation":"pages","bypassed":{"target":["notFound"]},"async":true},"routes":[{"pattern":"","name":"worklist","target":["worklist"]},{"pattern":"Products/{objectId}","name":"object","target":["object"]}],"targets":{"worklist":{"viewName":"Worklist","viewId":"worklist","viewLevel":1,"title":"{i18n>worklistViewTitle}"},"object":{"viewName":"Object","viewId":"object","viewLevel":2,"title":"{i18n>objectViewTitle}"},"objectNotFound":{"viewName":"ObjectNotFound","viewId":"objectNotFound"},"notFound":{"viewName":"NotFound","viewId":"notFound"}}},"rootView":{"viewName":"fproject1.project1.view.App","type":"XML","async":true,"id":"app"}}}',
	"fproject1/project1/model/formatter.js":function(){sap.ui.define([],function(){"use strict";return{numberUnit:function(n){if(!n){return""}return parseFloat(n).toFixed(2)}}});
},
	"fproject1/project1/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"fproject1/project1/utils/locate-reuse-libs.js":'(function(e){var t=function(e,t){var n=["sap.apf","sap.base","sap.chart","sap.collaboration","sap.f","sap.fe","sap.fileviewer","sap.gantt","sap.landvisz","sap.m","sap.ndc","sap.ovp","sap.rules","sap.suite","sap.tnt","sap.ui","sap.uiext","sap.ushell","sap.uxap","sap.viz","sap.webanalytics","sap.zen"];Object.keys(e).forEach(function(e){if(!n.some(function(t){return e===t||e.startsWith(t+".")})){if(t.length>0){t=t+","+e}else{t=e}}});return t};var n=function(e){var n="";if(e){if(e["sap.ui5"]&&e["sap.ui5"].dependencies){if(e["sap.ui5"].dependencies.libs){n=t(e["sap.ui5"].dependencies.libs,n)}if(e["sap.ui5"].dependencies.components){n=t(e["sap.ui5"].dependencies.components,n)}}if(e["sap.ui5"]&&e["sap.ui5"].componentUsages){n=t(e["sap.ui5"].componentUsages,n)}}return n};var r=function(e){var t=e;return new Promise(function(r,a){$.ajax(t).done(function(e){r(n(e))}).fail(function(){a(new Error("Could not fetch manifest at \'"+e))})})};var a=function(e){if(e){Object.keys(e).forEach(function(t){var n=e[t];if(n&&n.dependencies){n.dependencies.forEach(function(e){if(e.url&&e.url.length>0&&e.type==="UI5LIB"){jQuery.sap.log.info("Registering Library "+e.componentId+" from server "+e.url);jQuery.sap.registerModulePath(e.componentId,e.url)}})}})}};e.registerComponentDependencyPaths=function(e){return r(e).then(function(e){if(e&&e.length>0){var t="/sap/bc/ui2/app_index/ui5_app_info?id="+e;var n=jQuery.sap.getUriParameters().get("sap-client");if(n&&n.length===3){t=t+"&sap-client="+n}return $.ajax(t).done(a)}})}})(sap);var scripts=document.getElementsByTagName("script");var currentScript=document.getElementById("locate-reuse-libs");if(!currentScript){currentScript=document.currentScript}var manifestUri=currentScript.getAttribute("data-sap-ui-manifest-uri");var componentName=currentScript.getAttribute("data-sap-ui-componentName");var useMockserver=currentScript.getAttribute("data-sap-ui-use-mockserver");var bundleResources=function(){jQuery.sap.require("jquery.sap.resources");var e=sap.ui.getCore().getConfiguration().getLanguage();var t=jQuery.sap.resources({url:"i18n/i18n.properties",locale:e});document.title=t.getText("appTitle")};sap.registerComponentDependencyPaths(manifestUri).catch(function(e){jQuery.sap.log.error(e)}).finally(function(){sap.ui.getCore().attachInit(bundleResources);if(componentName&&componentName.length>0){if(useMockserver&&useMockserver==="true"){sap.ui.getCore().attachInit(function(){sap.ui.require([componentName.replace(/\\./g,"/")+"/localService/mockserver"],function(e){e.init();sap.ushell.Container.createRenderer().placeAt("content")})})}else{sap.ui.require(["sap/ui/core/ComponentSupport"]);sap.ui.getCore().attachInit(bundleResources)}}else{sap.ui.getCore().attachInit(function(){sap.ushell.Container.createRenderer().placeAt("content")})}});sap.registerComponentDependencyPaths(manifestUri);',
	"fproject1/project1/view/App.view.xml":'<mvc:View\n    controllerName="fproject1.project1.controller.App"\n    displayBlock="true"\n    xmlns="sap.m"\n    xmlns:mvc="sap.ui.core.mvc"><Shell><App\n            id="app"\n            busy="{appView>/busy}"\n            busyIndicatorDelay="{appView>/delay}"/></Shell></mvc:View>',
	"fproject1/project1/view/NotFound.view.xml":'<mvc:View\n    controllerName="fproject1.project1.controller.NotFound"\n    xmlns="sap.m"\n    xmlns:mvc="sap.ui.core.mvc"><MessagePage\n        title="{i18n>notFoundTitle}"\n        text="{i18n>notFoundText}"\n        icon="sap-icon://document"\n        id="page"\n        description=""><customDescription><Link id="link" text="{i18n>backToWorklist}" press=".onLinkPressed"/></customDescription></MessagePage></mvc:View>',
	"fproject1/project1/view/Object.view.xml":'<mvc:View\n    controllerName="fproject1.project1.controller.Object"\n    xmlns="sap.m"\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns:semantic="sap.f.semantic"><semantic:SemanticPage\n        id="page"\n        headerPinnable="false"\n        toggleHeaderOnTitleClick="false"\n        busy="{objectView>/busy}"\n        busyIndicatorDelay="{objectView>/delay}"><semantic:titleHeading><Title\n                text="{category_ID}"\n                level="H2"/></semantic:titleHeading><semantic:headerContent><ObjectNumber\n                number="{\n                    path: \'price\',\n                    formatter: \'.formatter.numberUnit\'\n                }"\n                unit="{currency_code}" /></semantic:headerContent><semantic:sendEmailAction><semantic:SendEmailAction id="shareEmail" press=".onShareEmailPress"/></semantic:sendEmailAction></semantic:SemanticPage></mvc:View>',
	"fproject1/project1/view/ObjectNotFound.view.xml":'<mvc:View\n    controllerName="fproject1.project1.controller.NotFound"\n    xmlns="sap.m"\n    xmlns:mvc="sap.ui.core.mvc"><MessagePage\n        title="{i18n>objectTitle}"\n        text="{i18n>noObjectFoundText}"\n        icon="sap-icon://product"\n        description=""\n        id="page"><customDescription><Link id="link" text="{i18n>backToWorklist}" press=".onLinkPressed" /></customDescription></MessagePage></mvc:View>',
	"fproject1/project1/view/Worklist.view.xml":'<mvc:View\n    controllerName="fproject1.project1.controller.Worklist"\n    xmlns="sap.m"\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns:semantic="sap.f.semantic"><semantic:SemanticPage\n        id="page"\n        headerPinnable="false"\n        toggleHeaderOnTitleClick="false"><semantic:titleHeading><Title\n                text="{i18n>worklistTitle}"\n                level="H2"/></semantic:titleHeading><semantic:content><Table\n                id="table"\n                width="auto"\n                items="{\n                    path: \'/Products\',\n                    sorter: {\n                        path: \'category_ID\',\n                        descending: false\n                    }\n                }"\n                noDataText="{worklistView>/tableNoDataText}"\n                busyIndicatorDelay="{worklistView>/tableBusyDelay}"\n                growing="true"\n                growingScrollToLoad="true"\n                updateFinished=".onUpdateFinished"><headerToolbar><OverflowToolbar><Title\n                            id="tableHeader"\n                            text="{worklistView>/worklistTableTitle}"\n                            level="H3"/><ToolbarSpacer /><SearchField\n                            id="searchField"\n                            tooltip="{i18n>worklistSearchTooltip}"\n                            search=".onSearch"><layoutData><OverflowToolbarLayoutData\n                                    maxWidth="200px"\n                                    priority="NeverOverflow"/></layoutData></SearchField></OverflowToolbar></headerToolbar><columns><Column id="nameColumn"><Text text="{i18n>tableNameColumnTitle}" id="nameColumnTitle"/></Column><Column id="unitNumberColumn" hAlign="End"><Text text="{i18n>tableUnitNumberColumnTitle}" id="unitNumberColumnTitle"/></Column></columns><items><ColumnListItem\n                        type="Navigation"\n                        press=".onPress"><cells><ObjectIdentifier\n                                title="{category_ID}"/><ObjectNumber\n                                number="{\n                                    path: \'price\',\n                                    formatter: \'.formatter.numberUnit\'\n                                }"\n                                unit="{currency_code}" /></cells></ColumnListItem></items></Table></semantic:content><semantic:sendEmailAction><semantic:SendEmailAction id="shareEmail" press=".onShareEmailPress"/></semantic:sendEmailAction></semantic:SemanticPage></mvc:View>'
}});
