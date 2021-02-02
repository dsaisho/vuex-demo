<template>
    <div class="container-fluid">
        <div class="row mf-headline">
            <div class="col-xl-12">
                <h2>Current to RMA Orders</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <button type="button" class="btn btn-outline-primary btn-lg btn-block" @click="startAReturn">Scan to Receive</button>
            </div>
            <div class="col-sm">
                <button type="button" class="btn btn-outline-primary btn-lg btn-block" @click="declinedOrders">Unresolved Declines</button>
            </div>
            <div class="col-sm">
                <button type="button" class="btn btn-outline-primary btn-lg btn-block" @click="refundOrders">Refund Approvals</button>
            </div>
            <div class="col-sm">
                <button type="button" class="btn btn-primary btn-lg btn-block" @click="pendingOrders">Pending Orders</button>
            </div>
            <div class="col-sm">
                <button type="button" class="btn btn-outline-primary btn-lg btn-block" @click="allOrders">All Orders</button>
            </div>
            <div class="col-sm">
                <button type="button" class="btn btn-outline-primary btn-lg btn-block" @click="loadGridState">Grid State</button>
            </div>
        </div>
		<div class="row">
            <div class="col-xl-12">
                <div id="vueapp">
                    <!--:transport-read="'readData'"-->
                    <kendo-datasource ref="datasource1"
                                      :transport-read-url= "datasourceUrl"
                                      :transport-read-data-type="'json'"
                                      :schema-model-fields="schemaModelFields"
                                      :transport-parameter-map="parameterMap"
                                      :batch='true'
                                      :page-size='20'>
                    </kendo-datasource>
                    <kendo-grid ref="grid"
                                name="grid"
                                id="grid"
                                :data-source-ref="'datasource1'"
                                :pageable='true'
                                :navigatable="true"
                                :editable="false"
                                :filterable="true"
                                :sortable="true"
                                :height="600">
                        <kendo-grid-column :selectable="true" width="40px"></kendo-grid-column>
                        <kendo-grid-column :field="'CustomerId'"
                                           :title="'Customer ID'"></kendo-grid-column>
                        <kendo-grid-column :field="'OrderNumber'"
                                           :title="'Order Number'"></kendo-grid-column>
                        <kendo-grid-column :field="'FirstName'"
                                           :title="'First Name'"></kendo-grid-column>
                        <kendo-grid-column :field="'LastName'"
                                           :title="'Last Name'"></kendo-grid-column>
                        <kendo-grid-column :field="'LastUpdated'"
                                           :title="'Last Update On'"
                                           :template="this.formatDateTimeTemplate()"></kendo-grid-column>
                        <kendo-grid-column :field="'Status'"
                                           :title="'Status'"></kendo-grid-column>
                        <kendo-grid-column :title="'View Details'" :command="[{name: 'Show Detail', click: commandClick}]" width="125px"></kendo-grid-column>
                    </kendo-grid>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import '@progress/kendo-ui'
    import axios from 'axios'
    import jsonp from 'jsonp';
    import JSZip from 'jszip';
    import $ from 'jquery';
    import { BaseURL } from 'js/global.js';

    export default {
        data: function () {
            return {
                schemaModelFields: {
                    Id: { editable: false, nullable: true },
                    CustomerId: { editable: false, nullable: true },
                    OrderNumber: { editable: false, nullable: true },
                    FirstName: { editable: false, nullable: true },
                    LastName: { editable: false, nullable: true },
                    Status: { editable: false, nullable: true },
                    LastUpdated: { editable: false, nullable: true }
                },
                command: [
                    {
                        name: "Details",
                        click: function (e) {
                            e.preventDefault();
                            var tr = $(e.target).closest("tr"); // get the current table row (tr)
                            // get the data bound to the current table row
                            var data = this.dataItem(tr);
                            this.selectDetail(data);
                        }
                    }
                ],
            }
        },
        computed: {
            items() {
                return this.data.map((item) => ({ ...item, selected: item.Id === this.selectedID }));
            },
            selectedItem() {
                console.log('somehting123');
                return this.data.find((item) => item.Id === this.Id);
            },
            datasourceUrl() {
                return `${BaseURL.internalApi}/api/v1/refund/openorders`;
            }
        },
        methods: {
            formatDateTimeTemplate() {
                let template = `#= kendo.toString(new Date(LastUpdated), "MMMM d, yyyy h:mm tt" ) #`;

                let compiledTemplate = kendo.template(template);
                return compiledTemplate.bind(this);
            },
            startAReturn: function () {
                this.$router.push({
                    path: '/rma/orders/processReturn' });
            },
            parameterMap: function (options, operation) {
                if (operation !== 'read' && options.models) {
                    return { models: kendo.stringify(options.models) };
                }
            },
            startAReturn: function () {
                this.$router.push({
                    path: '/rma/orders/processReturn'
                });
            },
            declinedOrders: function () {
                this.$router.push({
                    path: '/rma/decline/list'
                });
            },
            refundOrders: function () {
                this.$router.push({
                    path: '/rma/reviewRefunds'
                });
            },
            pendingOrders: function () {
                this.$router.push({
                    path: '/rma/list'
                });
            },
            allOrders: function () {
                this.$router.push({
                    path: '/rma/allOrders'
                });
            },
            commandClick: function (e) {
                e.preventDefault();
                var gridWidget = this.$refs.grid.kendoWidget();
                var tr = $(e.target).closest('tr');
                var data = gridWidget.dataItem(tr);
                this.saveGridState();
                this.showDetail(data);
            },
            showDetail: function (data) {
                this.$router.push({ path: '/rma/orders/detail?id=' + data.Id });
            },
            saveGridState() {
                //e.preventDefault();

                var grid = this.$refs.grid.kendoWidget();
                localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions());
            },
            loadGridState() {
                //e.preventDefault();

                var options = localStorage["kendo-grid-options"];
                var grid = this.$refs.grid.kendoWidget();

                if (options) {
                    grid.setOptions(JSON.parse(options));
                }
            }
        }
    }
</script>