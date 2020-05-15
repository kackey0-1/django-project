$(function(){
  path = location.pathname;
  docType = path.substring(path.indexOf("/", 0) + 1, path.indexOf("/", 1))
  if (docType === "estimates") {
      $("#estimates_tab").addClass("active");
  } else if (docType === "invoices") {
      $("#invoices_tab").addClass("active");
  } else if (docType === "contracts") {
      $("#contracts_tab").addClass("active");
  } else if (docType === "merchandise-orders") {
      $("#merchandise_orders_tab").addClass("active");
  } else if (docType === "outsource-orders") {
      $("#outsource_orders_tab").addClass("active");
  }
})
