import Vue from "vue";

export const SHOW_RECEIPT = "SHOW_RECEIPT";
export const DEPOSIT = "DEPOSIT_ACCOUNT";
export const TRANSFER = "TRANSFER_ACCOUNT";
export const DELETE = "DELETE_ACCOUNT";

const EventBus = new Vue();

export default EventBus;
